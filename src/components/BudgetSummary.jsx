import React from 'react';
import { IndianRupee, AlertTriangle, CheckCircle2, TrendingDown } from 'lucide-react';

export default function BudgetSummary({ summary, targetBudget }) {
  if (!summary) return null;

  const { estimated_total_inr, feasibility, saving_tips } = summary;

  // Determine color theme based on feasibility
  const getTheme = () => {
    const f = (feasibility || '').toLowerCase();
    if (f.includes('within') || f.includes('green')) {
      return {
        bg: 'bg-emerald-50 border-emerald-200/60',
        text: 'text-emerald-800',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
        icon: CheckCircle2,
        label: 'Within Budget'
      };
    } else if (f.includes('slightly') || f.includes('yellow')) {
      return {
        bg: 'bg-amber-50 border-amber-200/60',
        text: 'text-amber-800',
        badge: 'bg-amber-100 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
        icon: AlertTriangle,
        label: 'Slightly Over Budget'
      };
    } else {
      return {
        bg: 'bg-rose-50 border-rose-200/60',
        text: 'text-rose-800',
        badge: 'bg-rose-100 text-rose-800 border-rose-200',
        dot: 'bg-rose-500',
        icon: AlertTriangle,
        label: 'Over Budget'
      };
    }
  };

  const theme = getTheme();
  const Icon = theme.icon;

  return (
    <div className={`w-full border rounded-3xl p-6 shadow-md transition-all duration-300 ${theme.bg}`}>
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        
        {/* Estimated Cost Section */}
        <div className="flex items-center gap-4">
          <div className={`p-3.5 rounded-2xl bg-white border shadow-sm ${theme.text}`}>
            <IndianRupee className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Estimated Day Cost
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-800 font-sans">
                ₹{estimated_total_inr}
              </span>
              {targetBudget && (
                <span className="text-xs font-semibold text-slate-400">
                  vs target {targetBudget}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Feasibility Indicator */}
        <div className="flex flex-col items-start md:items-end gap-1.5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Budget Feasibility
          </span>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold shadow-sm ${theme.badge}`}>
            <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${theme.dot}`}></span>
            <Icon className="w-4 h-4 shrink-0" />
            <span>{theme.label}</span>
          </div>
        </div>
      </div>

      {/* Saving Tips Section */}
      {saving_tips && (
        <div className="mt-5 pt-4 border-t border-slate-200/50 flex gap-3">
          <TrendingDown className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-saffron-800 uppercase tracking-wider">
              Smart Saving Tip
            </h4>
            <p className="text-xs font-semibold text-slate-600 mt-1 leading-relaxed">
              {saving_tips}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
