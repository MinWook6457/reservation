'use client';

import { useState } from 'react';
import clsx from 'clsx';
import MonthlyView from './MonthlyView';
import WeeklyView from './WeeklyView';

type ViewMode = 'weekly' | 'monthly';

interface CalendarViewProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  reservationCounts: Record<string, number>;
}

export default function CalendarView({ selectedDate, onSelectDate, reservationCounts }: CalendarViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('monthly');
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex justify-center mb-4">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('weekly')}
            className={clsx(
              'px-4 py-1.5 text-sm font-medium rounded-md transition',
              viewMode === 'weekly' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-600 hover:text-gray-900',
            )}
          >
            주간
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={clsx(
              'px-4 py-1.5 text-sm font-medium rounded-md transition',
              viewMode === 'monthly' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-600 hover:text-gray-900',
            )}
          >
            월간
          </button>
        </div>
      </div>

      {viewMode === 'monthly' ? (
        <MonthlyView
          currentDate={currentDate}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          onChangeMonth={setCurrentDate}
          reservationCounts={reservationCounts}
        />
      ) : (
        <WeeklyView
          currentDate={currentDate}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          onChangeWeek={setCurrentDate}
          reservationCounts={reservationCounts}
        />
      )}
    </div>
  );
}
