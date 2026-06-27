import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header.jsx';
import ContextForm from './components/ContextForm.jsx';
import MealCards from './components/MealCards.jsx';
import GroceryList from './components/GroceryList.jsx';
import SubstitutionsList from './components/SubstitutionsList.jsx';
import BudgetSummary from './components/BudgetSummary.jsx';
import Timeline from './components/Timeline.jsx';
import { Copy, RefreshCw, ChevronLeft, AlertCircle, Sparkles, ChefHat } from 'lucide-react';

const KITCHEN_QUOTES = [
  "AI is chopping the onions, please wait without tears...",
  "Simmering your custom menu ideas in the virtual pot...",
  "Tasting and balancing spices for your budget range...",
  "Designing a meal checklist that saves you time and trips to the mandi...",
  "Adjusting nutrition and prep times for a stress-free kitchen day..."
];

const MOCK_PLAN_DATA = {
  breakfast: {
    dish: "Poha with Roasted Peanuts & Lemon",
    prep_time: "10 mins",
    cook_time: "15 mins",
    description: "Light and fluffy flattened rice seasoned with mustard seeds, curry leaves, turmeric, and topped with fresh coriander and crunchy peanuts."
  },
  lunch: {
    dish: "Homestyle Dal Tadka, Aloo Gobhi Sabzi & Phulkas",
    prep_time: "15 mins",
    cook_time: "25 mins",
    description: "Yellow arhar dal tempered with garlic and cumin, paired with dry spiced potato and cauliflower, served with warm puffed rotis."
  },
  snack: {
    dish: "Masala Chai & Crispy Onion Pakoras",
    prep_time: "10 mins",
    cook_time: "15 mins",
    description: "Spiced Indian ginger tea served with fresh, hot onion fritters fried to perfection."
  },
  dinner: {
    dish: "Vegetable Khichdi with Ghee & Roasted Papad",
    prep_time: "10 mins",
    cook_time: "20 mins",
    description: "Comforting one-pot meal of rice and moong dal cooked with chopped carrots and peas, drizzled with homemade cow ghee."
  },
  grocery_list: [
    { item: "Flattened Rice (Poha)", qty: "500g", approx_cost_inr: 30, available_at_home: true },
    { item: "Potatoes & Onions", qty: "1 kg each", approx_cost_inr: 50, available_at_home: true },
    { item: "Cauliflower (Gobhi)", qty: "1 medium", approx_cost_inr: 40, available_at_home: false },
    { item: "Arhar Dal (Toor Dal)", qty: "250g", approx_cost_inr: 35, available_at_home: true },
    { item: "Moong Dal", qty: "250g", approx_cost_inr: 30, available_at_home: false },
    { item: "Fresh Coriander & Curry Leaves", qty: "1 bunch", approx_cost_inr: 10, available_at_home: false },
    { item: "Lemons", qty: "2 pcs", approx_cost_inr: 10, available_at_home: false }
  ],
  substitutions: [
    { original: "Cauliflower", substitute: "Cabbage or French Beans", reason: "Saves ₹20 if cauliflower is out-of-season or priced higher in local mandi." },
    { original: "Arhar Dal", substitute: "Masoor Dal (Red Lentils)", reason: "Masoor dal cooks 10 minutes faster, saving LPG gas cylinders." }
  ],
  budget_summary: {
    estimated_total_inr: 90,
    feasibility: "within budget",
    saving_tips: "Buying coriander and chilies from the local street vendor instead of online delivery apps saves you ₹15 and gets you fresher herbs!"
  },
  cooking_todo_list: [
    { time: "07:00 AM", task: "Soak poha in water and chop onions/chilies.", meal: "breakfast" },
    { time: "07:15 AM", task: "Cook poha and make masala chai.", meal: "breakfast" },
    { time: "11:30 AM", task: "Chop potatoes and cauliflower; boil dal in pressure cooker.", meal: "lunch" },
    { time: "12:00 PM", task: "Prepare Dal Tadka tempering and fry the Aloo Gobbi sabzi.", meal: "lunch" },
    { time: "04:30 PM", task: "Prepare pakora batter and boil tea leaves with ginger/cardamom.", meal: "snack" },
    { time: "07:30 PM", task: "Sauté vegetables and pressure cook Khichdi.", meal: "dinner" }
  ]
};

export default function App() {
  const [formData, setFormData] = useState({
    occasion: 'Regular Weekday',
    peopleCount: 4,
    dietary: 'veg',
    budgetRange: '₹200–500',
    availableIngredients: '',
    allergies: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingQuote, setLoadingQuote] = useState(KITCHEN_QUOTES[0]);
  const [error, setError] = useState('');
  const [planData, setPlanData] = useState(null);
  const [view, setView] = useState('form'); // 'form' or 'results'
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef(null);

  // Cycle kitchen loading quotes
  useEffect(() => {
    let quoteInterval;
    if (isLoading) {
      let index = 0;
      quoteInterval = setInterval(() => {
        index = (index + 1) % KITCHEN_QUOTES.length;
        setLoadingQuote(KITCHEN_QUOTES[index]);
      }, 3500);
    }
    return () => clearInterval(quoteInterval);
  }, [isLoading]);

  const handleLoadDemoData = () => {
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setPlanData(MOCK_PLAN_DATA);
      setView('results');
      setIsLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 800);
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate meal plan. Please check settings.');
      }

      setPlanData(data);
      setView('results');
      
      // Smooth scroll to top/results after loading
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleCopyPlan = () => {
    if (!planData) return;

    const formattedText = `
🍽️ MY DAILY KITCHEN PLAN 🍽️
Occasion: ${formData.occasion}
Diners: ${formData.peopleCount} people
Preference: ${formData.dietary.toUpperCase()}
Budget Target: ${formData.budgetRange}

===========================================
📅 TODAY'S MENU
===========================================
🍳 Breakfast:
   * Dish: ${planData.breakfast?.dish}
   * Prep Time: ${planData.breakfast?.prep_time} | Cook Time: ${planData.breakfast?.cook_time}
   * Details: ${planData.breakfast?.description || ''}

🍛 Lunch:
   * Dish: ${planData.lunch?.dish}
   * Prep Time: ${planData.lunch?.prep_time} | Cook Time: ${planData.lunch?.cook_time}
   * Details: ${planData.lunch?.description || ''}

☕ Snack:
   * Dish: ${planData.snack?.dish}
   * Prep Time: ${planData.snack?.prep_time} | Cook Time: ${planData.snack?.cook_time}
   * Details: ${planData.snack?.description || ''}

🍲 Dinner:
   * Dish: ${planData.dinner?.dish}
   * Prep Time: ${planData.dinner?.prep_time} | Cook Time: ${planData.dinner?.cook_time}
   * Details: ${planData.dinner?.description || ''}

===========================================
🛒 GROCERY SHOPPING LIST
===========================================
${planData.grocery_list?.map(item => `[${item.available_at_home ? 'x' : ' '}] ${item.item} (${item.qty}) - approx ₹${item.approx_cost_inr}`).join('\n')}

===========================================
💡 SMART SUBSTITUTIONS
===========================================
${planData.substitutions?.map(sub => `* ${sub.original} ➔ ${sub.substitute} (${sub.reason})`).join('\n')}

===========================================
🪙 BUDGET FEASIBILITY: ${planData.budget_summary?.feasibility?.toUpperCase()}
===========================================
* Estimated Cost: ₹${planData.budget_summary?.estimated_total_inr}
* Tip: ${planData.budget_summary?.saving_tips || ''}

===========================================
⏳ COOKING TIMELINE & TO-DO
===========================================
${planData.cooking_todo_list?.map(todo => `* [${todo.time}] (${todo.meal}) ${todo.task}`).join('\n')}

Generated by My Daily Kitchen Planner.
`;

    navigator.clipboard.writeText(formattedText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pb-16 font-sans">
      {/* Top Branding */}
      <Header />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 mt-6">
        
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-start gap-3 shadow-sm simmer-animation">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">Action Needed</h4>
              <p className="text-xs font-semibold mt-1 leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Loading Spinner View */}
        {isLoading && (
          <div className="min-h-[50vh] flex flex-col items-center justify-center py-12 px-4">
            <div className="relative mb-6">
              {/* Steaming Cooking Pot Animation */}
              <div className="relative bg-white border border-saffron-100 p-6 rounded-full shadow-lg simmer-animation">
                <ChefHat className="w-16 h-16 text-saffron-500" />
                
                {/* Steam particles */}
                <div className="absolute top-2 left-10 w-1.5 h-6 bg-slate-300/40 rounded-full blur-[1px] steam-1"></div>
                <div className="absolute top-0 left-14 w-1.5 h-8 bg-slate-300/40 rounded-full blur-[1px] steam-2"></div>
                <div className="absolute top-3 left-18 w-1.5 h-5 bg-slate-300/40 rounded-full blur-[1px] steam-3"></div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-saffron-900 animate-pulse text-center">
              Preparing Your Culinary Plan...
            </h3>
            <p className="text-xs text-slate-500 font-semibold max-w-xs text-center mt-2 leading-relaxed">
              {loadingQuote}
            </p>
          </div>
        )}

        {/* Form View (Step 1) */}
        {!isLoading && view === 'form' && (
          <div className="space-y-4">
            <ContextForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
            <div className="text-center pt-2 pb-6">
              <span className="text-xs text-slate-500 font-semibold bg-white/50 border border-saffron-100/55 px-4 py-2 rounded-full shadow-xs">
                💡 Want to test the layout immediately without an API key?{' '}
                <button
                  type="button"
                  onClick={handleLoadDemoData}
                  id="btn-demo-mode"
                  className="text-saffron-600 hover:text-saffron-700 font-extrabold underline decoration-2 transition-colors focus:outline-none"
                >
                  Try Demo Mode with Mock Data ➔
                </button>
              </span>
            </div>
          </div>
        )}

        {/* Results View (Step 2 & 3) */}
        {!isLoading && view === 'results' && planData && (
          <div ref={resultsRef} className="space-y-6">
            
            {/* Context Summary Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/70 backdrop-blur-md border border-saffron-100/50 p-4 px-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-saffron-600 animate-pulse" />
                <div>
                  <h3 className="text-sm font-extrabold text-saffron-900">
                    Active Kitchen Plan: {formData.occasion}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">
                    For {formData.peopleCount} people • {formData.dietary.toUpperCase()} • Budget {formData.budgetRange}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => setView('form')}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Modify Plan Context</span>
                </button>
                
                <button
                  onClick={handleGenerate}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-amber-500/10"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>

                <button
                  onClick={handleCopyPlan}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    copied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-saffron-500 hover:bg-saffron-600 text-white shadow-sm shadow-saffron-500/10'
                  }`}
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy Plan'}</span>
                </button>
              </div>
            </div>

            {/* Results Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Meal Menu cards (Col span 2) */}
              <div className="lg:col-span-2 space-y-6">
                <MealCards meals={planData} />
                <Timeline list={planData.cooking_todo_list} />
              </div>

              {/* Right Column: Groceries, budget, substitutions */}
              <div className="space-y-6">
                <BudgetSummary summary={planData.budget_summary} targetBudget={formData.budgetRange} />
                <GroceryList list={planData.grocery_list} />
                <SubstitutionsList substitutions={planData.substitutions} />
              </div>

            </div>

            {/* Bottom Footer Actions */}
            <div className="flex justify-center gap-4 pt-4 border-t border-saffron-100/30">
              <button
                onClick={handleGenerate}
                id="btn-regenerate-bottom"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-turmeric-500 hover:from-amber-600 hover:to-turmeric-600 text-white font-extrabold rounded-2xl shadow-md transition-all duration-300 transform active:scale-95"
              >
                <RefreshCw className="w-4 h-4 animate-spin-slow" />
                <span>Regenerate Fresh Menu</span>
              </button>

              <button
                onClick={handleCopyPlan}
                id="btn-copy-bottom"
                className={`flex items-center gap-2 px-6 py-3 font-extrabold rounded-2xl shadow-md transition-all duration-300 transform active:scale-95 ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gradient-to-r from-saffron-500 to-orange-500 hover:from-saffron-600 hover:to-orange-600 text-white'
                }`}
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Kitchen Plan'}</span>
              </button>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
