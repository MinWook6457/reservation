'use client';

import { useState, useEffect } from 'react';
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
  user: { id: number; name: string; phone: string; email: string };
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    try {
      const res = await fetch('/api/admin/reservations');
      const data = await res.json();
      setReservations(data.reservations || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, status: string) {
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
      }
    } catch {
      alert('상태 변경 중 오류가 발생했습니다.');
    }
  }

  async function deleteReservation(id: number) {
    if (!confirm('예약을 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReservations((prev) => prev.filter((r) => r.id !== id));
      }
    } catch {
      alert('삭제 중 오류가 발생했습니다.');
    }
  }

  const filtered = filter === 'all' ? reservations : reservations.filter((r) => r.status === filter);

  return (
    <div className="pb-20 lg:pb-0">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">예약 관리</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        {['all', 'pending', 'approved', 'rejected'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition',
              filter === s ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            )}
          >
            {s === 'all' ? '전체' : RESERVATION_STATUS_LABELS[s as ReservationStatus]}
            {s === 'pending' && ` (${reservations.filter(r => r.status === 'pending').length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-500">
          예약이 없습니다.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">
                      {RESERVATION_TYPE_LABELS[r.type as ReservationType]}
                    </span>
                    <span className={clsx('text-xs px-2 py-0.5 rounded-full font-medium', STATUS_COLORS[r.status])}>
                      {RESERVATION_STATUS_LABELS[r.status as ReservationStatus]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatDate(r.date)} {formatTime(r.startTime)}
                    {r.endTime && ` ~ ${formatTime(r.endTime)}`}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {r.user.name} ({r.user.phone})
                  </p>
                  {r.notes && <p className="text-sm text-gray-400 mt-1">메모: {r.notes}</p>}
                </div>
                <div className="flex gap-2">
                  {r.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(r.id, 'approved')}
                        className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                      >
                        승인
                      </button>
                      <button
                        onClick={() => updateStatus(r.id, 'rejected')}
                        className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
                      >
                        거절
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => deleteReservation(r.id)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
