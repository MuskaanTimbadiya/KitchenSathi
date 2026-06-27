import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

export default function Timeline({ list }) {
  if (!list || list.length === 0) return null;

  // Chronological sorting helper
  const parseTimeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return 0;
    let [_, hours, minutes, ampm] = match;
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
    if (ampm.toUpperCase() === 'PM' && hours !== 12) hours += 12;
    if (ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const sortedList = [...list].sort((a, b) => {
    return parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time);
  });

  const getMealColors = (meal) => {
    const m = (meal || '').toLowerCase();
    if (m.includes('breakfast')) return 'border-amber-400 bg-amber-500 text-white ring-amber-100';
    if (m.includes('lunch')) return 'border-saffron-400 bg-saffron-500 text-white ring-saffron-100';
    if (m.includes('snack')) return 'border-yellow-400 bg-yellow-500 text-white ring-yellow-100';
    if (m.includes('dinner')) return 'border-rose-400 bg-rose-500 text-white ring-rose-100';
    return 'border-slate-400 bg-slate-500 text-white ring-slate-100';
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border border-saffron-100 rounded-3xl p-6 shadow-md">
      <h3 className="text-xl font-bold text-saffron-900 font-sans flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-saffron-600" />
        Cooking To-Do Timeline
      </h3>

      {/* Timeline Tree */}
      <div className="relative pl-6 border-l-2 border-slate-100 space-y-6">
        {sortedList.map((item, index) => {
          const mealColorClass = getMealColors(item.meal);
          
          return (
            <div key={index} className="relative group">
              {/* Timeline Bullet */}
              <div
                className={`absolute -left-[35px] top-1.5 w-[18px] h-[18px] rounded-full border-2 ring-4 transition-all duration-300 ${mealColorClass}`}
              />

              {/* Timeline Card */}
              <div className="p-4 bg-slate-50/50 hover:bg-saffron-50/10 border border-slate-200/50 rounded-2xl transition-all duration-200">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                  {/* Time Badge */}
                  <span className="text-sm font-extrabold text-slate-700 bg-white border border-slate-200/60 px-3 py-1 rounded-xl shadow-xs">
                    {item.time}
                  </span>
                  
                  {/* Meal Tag */}
                  {item.meal && (
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      item.meal.toLowerCase() === 'breakfast' ? 'bg-amber-100 text-amber-800' :
                      item.meal.toLowerCase() === 'lunch' ? 'bg-saffron-100 text-saffron-800' :
                      item.meal.toLowerCase() === 'snack' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {item.meal}
                    </span>
                  )}
                </div>

                {/* Task */}
                <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                  {item.task}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
