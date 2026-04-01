'use client';

import clsx from 'clsx';
import { ReservationType, RESERVATION_TYPE_LABELS } from '@/types';

interface TypeSelectorProps {
  selected: ReservationType;
  onChange: (type: ReservationType) => void;
}

const TYPES: ReservationType[] = ['visit', 'overnight', 'outing'];

const TYPE_DESCRIPTIONS: Record<ReservationType, string> = {
  visit: '정해진 시간에 면회',
  overnight: '외박 일정 등록',
  outing: '외출 일정 등록',
};

export default function TypeSelector({ selected, onChange }: TypeSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={clsx(
            'flex flex-col items-center p-3 rounded-xl border-2 transition',
            selected === type
              ? 'border-teal-600 bg-teal-50 text-teal-700'
              : 'border-gray-200 hover:border-gray-300 text-gray-600',
          )}
        >
          <span className="font-semibold text-sm">{RESERVATION_TYPE_LABELS[type]}</span>
          <span className="text-xs mt-1 opacity-70">{TYPE_DESCRIPTIONS[type]}</span>
        </button>
      ))}
    </div>
  );
}
