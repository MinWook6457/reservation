'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { RESERVATION_TYPE_LABELS, RESERVATION_STATUS_LABELS, ReservationType, ReservationStatus } from '@/types';
import { formatDate, formatTime } from '@/lib/utils';

interface Reservation {
  id: number;
  type: string;
  date: string;
  startTime: string;
  endTime: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    try {
      const res = await fetch('/api/reservations');
      const data = await res.json();
      setReservations(data.reservations || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function cancelReservation(id: number) {
    if (!confirm('예약을 취소하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/reservations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReservations((prev) => prev.filter((r) => r.id !== id));
      }
    } catch {
      alert('취소 중 오류가 발생했습니다.');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">내 예약 목록</h1>
          <Link
            href="/reservation"
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            새 예약하기
          </Link>
        </div>

        {reservations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500 mb-4">예약 내역이 없습니다.</p>
            <Link
              href="/reservation"
              className="inline-block bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 transition"
            >
              예약하기
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {reservations.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">
                        {RESERVATION_TYPE_LABELS[r.type as ReservationType]}
                      </span>
                      <span
                        className={clsx(
                          'text-xs px-2 py-0.5 rounded-full font-medium',
                          STATUS_COLORS[r.status],
                        )}
                      >
                        {RESERVATION_STATUS_LABELS[r.status as ReservationStatus]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {formatDate(r.date)} {formatTime(r.startTime)}
                      {r.endTime && ` ~ ${formatTime(r.endTime)}`}
                    </p>
                    {r.notes && <p className="text-sm text-gray-500 mt-1">{r.notes}</p>}
                  </div>
                  {r.status === 'pending' && (
                    <button
                      onClick={() => cancelReservation(r.id)}
                      className="text-sm text-red-500 hover:text-red-600 font-medium ml-4"
                    >
                      취소
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
