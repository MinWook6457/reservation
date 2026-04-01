'use client';

import clsx from 'clsx';
import { formatTime } from '@/lib/utils';

interface SlotInfo {
  time: string;
  label: string;
  maxCount: number;
  currentCount: number;
}

interface TimeSlotPickerProps {
  slots: SlotInfo[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  loading?: boolean;
}

export default function TimeSlotPicker({ slots, selectedTime, onSelectTime, loading }: TimeSlotPickerProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center py-4">이용 가능한 시간대가 없습니다.</p>
    );
  }

  return (
    <div className="space-y-2">
      {slots.map((slot) => {
        const isFull = slot.currentCount >= slot.maxCount;
        const isSelected = selectedTime === slot.time;
        const remaining = slot.maxCount - slot.currentCount;

        return (
          <button
            key={slot.time}
            onClick={() => !isFull && onSelectTime(slot.time)}
            disabled={isFull}
            className={clsx(
              'w-full flex items-center justify-between p-4 rounded-lg border-2 transition',
              isSelected && 'border-teal-600 bg-teal-50',
              !isSelected && !isFull && 'border-gray-200 hover:border-teal-300 hover:bg-teal-50/50',
              isFull && 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed',
            )}
          >
            <div className="text-left">
              <p className={clsx('font-medium', isSelected ? 'text-teal-700' : 'text-gray-900')}>
                {formatTime(slot.time)}
              </p>
              <p className="text-xs text-gray-500">{slot.label}</p>
            </div>
            <div className="text-right">
              {isFull ? (
                <span className="text-xs text-red-500 font-medium px-2 py-1 bg-red-50 rounded-full">마감</span>
              ) : (
                <span className={clsx(
                  'text-xs font-medium px-2 py-1 rounded-full',
                  remaining <= 2 ? 'text-amber-600 bg-amber-50' : 'text-teal-600 bg-teal-50',
                )}>
                  {remaining}자리 남음
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
