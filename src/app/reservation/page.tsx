'use client';

import { useState, useEffect, useCallback } from 'react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import CalendarView from '@/components/calendar/CalendarView';
import ReservationForm from '@/components/reservation/ReservationForm';
import Link from 'next/link';

export default function ReservationPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [reservationCounts, setReservationCounts] = useState<Record<string, number>>({});

  const fetchCounts = useCallback(async () => {
    try {
      const res = await fetch('/api/reservations');
      const data = await res.json();
      const counts: Record<string, number> = {};
      for (const r of data.reservations || []) {
        counts[r.date] = (counts[r.date] || 0) + 1;
      }
      setReservationCounts(counts);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">방문 예약</h1>
            <p className="text-sm text-gray-500 mt-1">날짜와 시간을 선택하여 예약해주세요</p>
          </div>
          <Link
            href="/reservation/my"
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            내 예약 보기
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CalendarView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            reservationCounts={reservationCounts}
          />
          <ReservationForm selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
}
