'use client';

import { format, isToday, isSameDay } from 'date-fns';
import clsx from 'clsx';

interface DayCellProps {
  date: Date;
  isCurrentMonth?: boolean;
  isSelected: boolean;
  reservationCount?: number;
  onClick: (date: Date) => void;
}

export default function DayCell({ date, isCurrentMonth = true, isSelected, reservationCount = 0, onClick }: DayCellProps) {
  const today = isToday(date);

  return (
    <button
      onClick={() => onClick(date)}
      className={clsx(
        'relative w-full aspect-square flex flex-col items-center justify-center rounded-lg transition text-sm',
        !isCurrentMonth && 'text-gray-300',
        isCurrentMonth && !isSelected && !today && 'text-gray-700 hover:bg-teal-50',
        today && !isSelected && 'bg-teal-50 text-teal-700 font-semibold',
        isSelected && 'bg-teal-600 text-white font-semibold shadow-sm',
      )}
    >
      <span>{format(date, 'd')}</span>
      {reservationCount > 0 && (
        <div className="flex gap-0.5 mt-0.5">
          {Array.from({ length: Math.min(reservationCount, 3) }).map((_, i) => (
            <span
              key={i}
              className={clsx(
                'w-1.5 h-1.5 rounded-full',
                isSelected ? 'bg-white/70' : 'bg-teal-400',
              )}
            />
          ))}
        </div>
      )}
    </button>
  );
}
