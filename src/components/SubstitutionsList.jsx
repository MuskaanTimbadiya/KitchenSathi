import React from 'react';
import { ArrowRight, HelpCircle, Lightbulb } from 'lucide-react';

export default function SubstitutionsList({ substitutions }) {
  if (!substitutions || substitutions.length === 0) return null;

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border border-saffron-100 rounded-3xl p-6 shadow-md">
      <h3 className="text-xl font-bold text-saffron-900 font-sans flex items-center gap-2 mb-5">
        <Lightbulb className="w-5 h-5 text-turmeric-500 animate-bounce" />
        Smart Ingredient Substitutions
      </h3>

      <div className="space-y-3.5">
        {substitutions.map((sub, index) => (
          <div
            key={index}
            className="p-4 bg-gradient-to-r from-amber-50/40 to-turmeric-50/10 border border-amber-100 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Substitution Path */}
            <div className="flex items-center gap-3.5 flex-wrap">
              <div className="bg-rose-50 border border-rose-100 text-rose-800 font-bold px-3 py-1.5 rounded-xl text-sm">
                {sub.original}
              </div>
              <div className="text-slate-400">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-xl text-sm shadow-sm">
                {sub.substitute}
              </div>
            </div>

            {/* Explanation / Reason */}
            <div className="flex-1 md:text-right">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200/50 px-3 py-1.5 rounded-xl max-w-full text-left md:text-right">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{sub.reason}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
