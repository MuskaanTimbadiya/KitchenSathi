import React, { useState, useEffect } from 'react';
import { ShoppingBasket, CheckSquare, Square, Check, RefreshCw } from 'lucide-react';

export default function GroceryList({ list }) {
  const [items, setItems] = useState([]);

  // Sync state with incoming props
  useEffect(() => {
    if (list) {
      // Sort: items that need to be bought first
      const sortedList = [...list].map((item, index) => ({
        ...item,
        id: index,
        checked: item.available_at_home // Pre-check items already available
      }));
      setItems(sortedList);
    }
  }, [list]);

  const toggleCheck = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  if (!items || items.length === 0) return null;

  const neededItems = items.filter(item => !item.checked);
  const completedItems = items.filter(item => item.checked);
  const totalCostRemaining = neededItems.reduce((acc, item) => acc + (item.approx_cost_inr || 0), 0);

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border border-saffron-100 rounded-3xl p-6 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold text-saffron-900 font-sans flex items-center gap-2">
          <ShoppingBasket className="w-5 h-5 text-saffron-600" />
          Grocery Checklist
        </h3>
        <span className="text-xs bg-saffron-100 text-saffron-800 font-bold px-3 py-1 rounded-full">
          {completedItems.length}/{items.length} Checked
        </span>
      </div>

      {/* Checklist Grid */}
      <div className="space-y-4">
        {/* To Buy Section */}
        {neededItems.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Items to Buy ({neededItems.length})
            </h4>
            <div className="space-y-2">
              {neededItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="w-full flex items-center justify-between p-3 bg-slate-50 border border-slate-200/60 rounded-2xl hover:bg-saffron-50/20 hover:border-saffron-200 transition-all duration-200 group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-slate-400 group-hover:text-saffron-500 transition-colors">
                      <Square className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-800">{item.item}</span>
                      <span className="text-xs text-slate-400 block mt-0.5">{item.qty}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-600 bg-white border border-slate-100 px-2.5 py-1 rounded-xl">
                    ₹{item.approx_cost_inr}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Available / Completed Section */}
        {completedItems.length > 0 && (
          <div className="pt-2">
            <h4 className="text-xs font-bold text-emerald-600/80 uppercase tracking-wider mb-2.5">
              Available at Home / Checked ({completedItems.length})
            </h4>
            <div className="space-y-2 opacity-65">
              {completedItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="w-full flex items-center justify-between p-3 bg-emerald-50/30 border border-emerald-100 rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-all duration-200 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-emerald-500">
                      <CheckSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-500 line-through">{item.item}</span>
                      <span className="text-xs text-slate-400 block mt-0.5 line-through">{item.qty}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.available_at_home && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        At Home
                      </span>
                    )}
                    <span className="text-sm font-bold text-slate-400 bg-white border border-slate-100 px-2.5 py-1 rounded-xl line-through">
                      ₹{item.approx_cost_inr}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Cost Summary */}
        <div className="border-t border-slate-150 pt-4 mt-5 flex justify-between items-center text-sm">
          <span className="font-semibold text-slate-500">Remaining to Spend:</span>
          <span className="text-base font-extrabold text-saffron-800 bg-saffron-50 px-3 py-1.5 border border-saffron-100 rounded-xl">
            ₹{totalCostRemaining}
          </span>
        </div>
      </div>
    </div>
  );
}
