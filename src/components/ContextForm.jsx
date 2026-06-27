import React from 'react';
import { Users, Calendar, Ban, Leaf, Sparkles, ShoppingBag } from 'lucide-react';

export default function ContextForm({ formData, setFormData, onSubmit, isLoading }) {
  
  const dietaryOptions = [
    { value: 'veg', label: 'Vegetarian', icon: '🟢', desc: 'Pure veg dishes' },
    { value: 'non-veg', label: 'Non-Vegetarian', icon: '🔴', desc: 'Includes meat/fish/egg' },
    { value: 'vegan', label: 'Vegan', icon: '🌱', desc: 'Plant-based options' },
    { value: 'Jain', label: 'Jain', icon: '🙏', desc: 'No root vegetables' }
  ];

  const budgetOptions = [
    { value: '₹100–200', label: '₹100 – ₹200', desc: 'Budget friendly' },
    { value: '₹200–500', label: '₹200 – ₹500', desc: 'Standard home cooking' },
    { value: '₹500–1000', label: '₹500 – ₹1000', desc: 'Rich / guest meals' },
    { value: '₹1000+', label: '₹1000+', desc: 'Feasts & celebrations' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border border-saffron-100 rounded-3xl p-6 md:p-8 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-saffron-100 text-saffron-700 p-2.5 rounded-2xl">
          <Sparkles className="w-6 h-6 text-saffron-600" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-saffron-900">Step 1 — Daily Cooking Context</h2>
          <p className="text-sm text-slate-500">Provide details to generate a custom Indian meal plan & timeline</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        
        {/* Row 1: Occasion & People Count */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Occasion */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2.5 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-turmeric-600" />
              What day / occasion is it?
            </label>
            <select
              value={formData.occasion}
              onChange={(e) => handleChange('occasion', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20 focus:border-saffron-500 transition-all font-medium"
            >
              <option value="Regular Weekday">Regular Weekday</option>
              <option value="Weekend Special">Weekend Special</option>
              <option value="Festival / Celebration">Festival / Celebration</option>
              <option value="Guests Coming">Guests Coming</option>
              <option value="Fast (Vrat) / Light Meal">Fast (Vrat) / Light Meal</option>
              <option value="Lazy Sunday">Lazy Sunday</option>
            </select>
          </div>

          {/* People Count */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2.5 flex items-center gap-2">
              <Users className="w-4 h-4 text-turmeric-600" />
              How many people are eating?
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleChange('peopleCount', Math.max(1, parseInt(formData.peopleCount || 1) - 1))}
                className="w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center font-bold text-lg transition-all"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.peopleCount}
                onChange={(e) => handleChange('peopleCount', Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 text-center py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold focus:outline-none focus:ring-2 focus:ring-saffron-500/20 focus:border-saffron-500 transition-all"
              />
              <button
                type="button"
                onClick={() => handleChange('peopleCount', parseInt(formData.peopleCount || 1) + 1)}
                className="w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center font-bold text-lg transition-all"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Dietary Preferences */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            Dietary Preference
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dietaryOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleChange('dietary', opt.value)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  formData.dietary === opt.value
                    ? 'border-saffron-500 bg-saffron-50/50 shadow-md shadow-saffron-500/5 text-saffron-900 ring-2 ring-saffron-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="text-xl mb-1">{opt.icon}</span>
                <span className="text-sm font-bold block">{opt.label}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Budget Range */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-turmeric-600" />
            Budget Range for the Day (Total cost of extra groceries)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {budgetOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleChange('budgetRange', opt.value)}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  formData.budgetRange === opt.value
                    ? 'border-saffron-500 bg-saffron-50/50 shadow-md shadow-saffron-500/5 text-saffron-900 ring-2 ring-saffron-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="text-sm font-extrabold block text-saffron-800">{opt.label}</span>
                <span className="text-[10px] text-slate-400 font-medium block mt-1">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Row 4: Available Ingredients & Allergies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ingredients Available */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              🥦 Ingredients already available at home
            </label>
            <textarea
              value={formData.availableIngredients}
              onChange={(e) => handleChange('availableIngredients', e.target.value)}
              placeholder="e.g., Potato, onion, tomato, basmati rice, paneer, wheat flour, basic spices"
              rows="3"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20 focus:border-saffron-500 transition-all placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* Allergies / Avoid list */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Ban className="w-4 h-4 text-red-500" />
              Any allergies or items to avoid
            </label>
            <textarea
              value={formData.allergies}
              onChange={(e) => handleChange('allergies', e.target.value)}
              placeholder="e.g., Peanuts, lactose intolerance, no garlic-onion, avoid mustard oil"
              rows="3"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20 focus:border-saffron-500 transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            id="btn-generate-planner"
            className="w-full py-4 px-6 bg-gradient-to-r from-saffron-500 to-turmeric-500 hover:from-saffron-600 hover:to-turmeric-600 text-white font-extrabold rounded-2xl shadow-lg shadow-saffron-500/20 text-base md:text-lg transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
                Generating Meal Plan...
              </span>
            ) : (
              <span>Generate My Kitchen Plan ✨</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
