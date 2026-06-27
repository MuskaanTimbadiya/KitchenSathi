# KitchenSathi 🍳
> **AI-Powered Indian Meal & Grocery Planner**

KitchenSathi (formerly My Daily Kitchen Planner) is a single-page AI micro application built with React, Tailwind CSS, and Express. It acts as an automated cooking assistant and meal planner customized specifically for Indian households.

## Features

- **Step 1: Daily Context Form**: Input the day/occasion, number of people eating, dietary preferences (Veg, Non-Veg, Vegan, Jain), budget parameters, available ingredients, and items to avoid or allergies.
- **Step 2: AI Generation**: Connects to the Anthropic Claude API (`claude-3-5-sonnet`) to generate a customized daily plan.
- **Step 3: Interactive Dashboard**:
  - **Meal Cards**: Curated breakfast, lunch, snack, and dinner menus with preparation and cooking times.
  - **Grocery Checklist**: An interactive shop list checking off ingredients already at home vs. items needed to buy, detailing costs.
  - **Smart Substitutions**: Dynamic local alternative swaps to save money (e.g. paneer ➔ soya chunks).
  - **Budget Tracker**: Color-coded feasibility summary showing if costs fit your targeted budget range.
  - **Cooking Timeline**: Step-by-step chronological culinary schedule of the day.
- **Quick Controls**: Copy the plan details to clipboard or click to regenerate.
- **Demo Mode**: Test the application immediately with complete mock datasets without setting up keys.

---

## Setup & Installation

### 1. Clone & Configure Key
Create a `.env` file in the root directory (or open the existing one) and add your API Key:
```env
API_KEY=your_actual_api_key
```

### 2. Install Dependencies
Run the package installation:
```bash
npm install
```

### 3. Start Development Server
Boot up the unified client and proxy backend server:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser to view the application.

---

## Project Structure

```text
kitchensathi/
├── server.js            # Express server (Proxies Claude requests & runs Vite in middleware mode)
├── tailwind.config.js   # Tailwind theme configurations (Saffron/Turmeric colors)
├── vite.config.js       # Vite configuration
├── index.html           # HTML root (Outfit & Inter fonts, SEO headers)
├── .env                 # API Key configuration
├── .gitignore           # Ignored node_modules & environmental variables
├── package.json         # Scripts and dependencies
└── src/                 # Client source code
    ├── main.jsx         # React application entry point
    ├── index.css        # Global CSS, animations, and scrollbars
    ├── App.jsx          # Component coordinator and states
    └── components/      # UI Cards, Form, Lists, and Timeline
```
