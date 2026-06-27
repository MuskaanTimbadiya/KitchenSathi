import React from 'react';
import { Sunrise, Sun, Sunset, Moon, Clock, Flame } from 'lucide-react';

export default function MealCards({ meals }) {
  if (!meals) return null;

  const mealSlots = [
    {
      key: 'breakfast',
      title: 'Breakfast',
      icon: Sunrise,
      bgGradient: 'from-amber-500/10 to-saffron-500/10 border-amber-200/50',
      iconBg: 'bg-amber-100 text-amber-700',
      tagColor: 'bg-amber-100 text-amber-800 border-amber-200',
      data: meals.breakfast
    },
    {
      key: 'lunch',
      title: 'Lunch',
      icon: Sun,
      bgGradient: 'from-saffron-500/10 to-orange-500/10 border-saffron-200/50',
      iconBg: 'bg-saffron-100 text-saffron-700',
      tagColor: 'bg-saffron-100 text-saffron-800 border-saffron-200',
      data: meals.lunch
    },
    {
      key: 'snack',
      title: 'Snack',
      icon: Sunset,
      bgGradient: 'from-yellow-500/10 to-amber-500/10 border-yellow-200/50',
      iconBg: 'bg-yellow-100 text-yellow-700',
      tagColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      data: meals.snack
    },
    {
      key: 'dinner',
      title: 'Dinner',
      icon: Moon,
      bgGradient: 'from-rose-500/10 to-red-500/10 border-rose-200/50',
      iconBg: 'bg-rose-100 text-rose-700',
      tagColor: 'bg-rose-100 text-rose-800 border-rose-200',
      data: meals.dinner
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-saffron-900 font-sans flex items-center gap-2">
        🍽️ Today's Menu
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {mealSlots.map((slot) => {
          const Icon = slot.icon;
          const dishData = slot.data || {};
          
          return (
            <div
              key={slot.key}
              className={`glass-card glass-card-hover rounded-3xl p-5 border flex flex-col justify-between`}
            >
              <div>
                {/* Header info */}
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${slot.tagColor}`}>
                    {slot.title}
                  </span>
                  <div className={`p-2 rounded-xl ${slot.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Dish Name */}
                <h4 className="text-lg font-bold text-slate-800 tracking-tight leading-snug">
                  {dishData.dish || 'Plan pending...'}
                </h4>

                {/* Description */}
                {dishData.description && (
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {dishData.description}
                  </p>
                )}
              </div>

              {/* Cook details */}
              <div className="flex gap-4 border-t border-slate-100 pt-3.5 mt-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Prep: <strong className="text-slate-700">{dishData.prep_time || 'N/A'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-slate-400" />
                  <span>Cook: <strong className="text-slate-700">{dishData.cook_time || 'N/A'}</strong></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
