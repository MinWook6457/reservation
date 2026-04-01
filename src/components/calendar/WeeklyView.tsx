'use client';

import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  format,
  isSameDay,
  isToday,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import clsx from 'clsx';

interface WeeklyViewProps {
  currentDate: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onChangeWeek: (date: Date) => void;
  reservationCounts: Record<string, number>;
}

export default function WeeklyView({
  currentDate,
  selectedDate,
  onSelectDate,
  onChangeWeek,
  reservationCounts,
}: WeeklyViewProps) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const weekLabel = `${format(weekStart, 'M월 d일', { locale: ko })} - ${format(weekEnd, 'M월 d일', { locale: ko })}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onChangeWeek(subWeeks(currentDate, 1))}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-lg font-semibold text-gray-900">{weekLabel}</h3>
        <button
          onClick={() => onChangeWeek(addWeeks(currentDate, 1))}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const selected = selectedDate ? isSameDay(day, selectedDate) : false;
          const today = isToday(day);
          const count = reservationCounts[dateKey] || 0;
          const dayOfWeek = day.getDay();

          return (
            <button
              key={dateKey}
              onClick={() => onSelectDate(day)}
              className={clsx(
                'flex flex-col items-center p-3 rounded-xl transition',
                selected && 'bg-teal-600 text-white shadow-sm',
                !selected && today && 'bg-teal-50 text-teal-700',
                !selected && !today && 'hover:bg-gray-50',
              )}
            >
              <span className={clsx(
                'text-xs mb-1',
                selected ? 'text-teal-100' : dayOfWeek === 0 ? 'text-red-400' : dayOfWeek === 6 ? 'text-blue-400' : 'text-gray-500',
              )}>
                {format(day, 'EEE', { locale: ko })}
              </span>
              <span className={clsx(
                'text-lg font-semibold',
                !selected && !today && 'text-gray-900',
              )}>
                {format(day, 'd')}
              </span>
              {count > 0 && (
                <span className={clsx(
                  'text-xs mt-1 px-2 py-0.5 rounded-full',
                  selected ? 'bg-white/20 text-white' : 'bg-teal-100 text-teal-700',
                )}>
                  {count}건
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
