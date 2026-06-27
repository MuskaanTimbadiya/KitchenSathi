import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Generate endpoint
  app.post('/api/generate', async (req, res) => {
    const { occasion, peopleCount, dietary, budgetRange, availableIngredients, allergies } = req.body;
    
    // Get key from request headers or environment variables
    const apiKey = req.headers['x-api-key'] || process.env.API_KEY;

    if (!apiKey) {
      return res.status(400).json({
        error: 'API Key is missing. Please set your API key in the settings panel (top right).'
      });
    }

    try {
      const systemPrompt = `You are a culinary expert and kitchen planner specializing in Indian home cooking. 
Your task is to generate a comprehensive, realistic daily meal plan, grocery checklist, substitutions, budget analysis, and cooking timeline.

All suggestions must be authentic, everyday Indian dishes (e.g., dal, sabzi, roti, rice, idli, poha, paratha, khichdi, upma, curd rice).
Grocery costs must reflect real local Indian market prices (mandis/local shops, not high-end online grocery rates).
Substitutions should provide sensible, money-saving, or availability-based options suitable for Indian kitchens (e.g., paneer to tofu/soya chunks, broccoli to local beans/gourd, capsicum to local veggies).

You MUST respond ONLY with a single JSON object. Do not include any explanations, introduction, markdown blocks (like \`\`\`json), or trailing notes. The response must be pure JSON that can be parsed directly.

JSON Schema:
{
  "breakfast": { "dish": "Name of dish", "prep_time": "e.g., 10 mins", "cook_time": "e.g., 15 mins", "description": "Brief context" },
  "lunch": { "dish": "Name of dish", "prep_time": "e.g., 15 mins", "cook_time": "e.g., 25 mins", "description": "Brief context" },
  "dinner": { "dish": "Name of dish", "prep_time": "e.g., 15 mins", "cook_time": "e.g., 20 mins", "description": "Brief context" },
  "snack": { "dish": "Name of dish", "prep_time": "e.g., 5 mins", "cook_time": "e.g., 10 mins", "description": "Brief context" },
  "grocery_list": [
    { "item": "Name of ingredient", "qty": "Quantity (e.g., 500g, 1 packet)", "approx_cost_inr": 45, "available_at_home": false }
  ],
  "substitutions": [
    { "original": "Ingredient name", "substitute": "Cheaper/local substitute", "reason": "Explanation of saving or ease" }
  ],
  "budget_summary": {
    "estimated_total_inr": 180,
    "feasibility": "within budget / slightly over / over budget",
    "saving_tips": "A tip to reduce costs further"
  },
  "cooking_todo_list": [
    { "time": "07:30 AM", "task": "Chop vegetables for breakfast and lunch.", "meal": "breakfast" }
  ]
}

Ensure the "feasibility" field is exactly one of: "within budget", "slightly over", or "over budget" based on the user's budget range.
Assess the "available_at_home" boolean for each grocery item: if the user specifies an ingredient is available at home in their list of available ingredients, mark it as true, otherwise false.`;

      const userPrompt = `Generate a daily Indian meal planner for the following context:
- Day / Occasion: ${occasion}
- Number of people eating: ${peopleCount}
- Dietary Preference: ${dietary}
- Target Budget range for the day: ${budgetRange}
- Ingredients already available at home: ${availableIngredients || 'None specified'}
- Allergies / Avoid list: ${allergies || 'None specified'}

Remember, respond with ONLY the raw JSON object conforming strictly to the requested schema.`;

      const apiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: {
              temperature: 0.3,
              responseMimeType: 'application/json'
            }
          })
        }
      );

      if (!apiResponse.ok) {
        const errText = await apiResponse.text();
        let errMsg = 'Failed to call Gemini API';
        try {
          const errJson = JSON.parse(errText);
          errMsg = errJson.error?.message || errText;
        } catch (_) {}
        throw new Error(errMsg);
      }

      const resData = await apiResponse.json();
      let contentText = resData.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // Clean up markdown block if model accidentally included it
      if (contentText.startsWith('```json')) {
        contentText = contentText.substring(7);
      } else if (contentText.startsWith('```')) {
        contentText = contentText.substring(3);
      }
      if (contentText.endsWith('```')) {
        contentText = contentText.substring(0, contentText.length - 3);
      }
      contentText = contentText.trim();

      try {
        const parsedData = JSON.parse(contentText);
        res.json(parsedData);
      } catch (err) {
        console.error('Failed to parse Gemini JSON response. Raw text:', contentText);
        res.status(500).json({
          error: 'The AI model generated an invalid response format. Please try again.',
          rawText: contentText
        });
      }
    } catch (apiError) {
      console.error('Gemini API Error:', apiError);
      res.status(500).json({
        error: apiError.message || 'An error occurred while calling the Gemini API.'
      });
    }
  });

  // Serve static assets or use Vite in dev mode
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
    console.log('Vite loaded in middleware mode.');
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const port = process.env.PORT || 5173;
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
