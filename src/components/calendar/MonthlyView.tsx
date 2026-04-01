'use client';

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  format,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import DayCell from './DayCell';

interface MonthlyViewProps {
  currentDate: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onChangeMonth: (date: Date) => void;
  reservationCounts: Record<string, number>;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function MonthlyView({
  currentDate,
  selectedDate,
  onSelectDate,
  onChangeMonth,
  reservationCounts,
}: MonthlyViewProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onChangeMonth(subMonths(currentDate, 1))}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          {format(currentDate, 'yyyy년 M월', { locale: ko })}
        </h3>
        <button
          onClick={() => onChangeMonth(addMonths(currentDate, 1))}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            className={`text-center text-xs font-medium py-2 ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-500'}`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          return (
            <DayCell
              key={dateKey}
              date={day}
              isCurrentMonth={isSameMonth(day, currentDate)}
              isSelected={selectedDate ? isSameDay(day, selectedDate) : false}
              reservationCount={reservationCounts[dateKey] || 0}
              onClick={onSelectDate}
            />
          );
        })}
      </div>
    </div>
  );
}
