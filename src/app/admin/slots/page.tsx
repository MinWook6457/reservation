'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';

interface TimeSlot {
  id: number;
  time: string;
  label: string;
  maxCount: number;
  isActive: boolean;
}

export default function AdminSlotsPage() {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ time: '', label: '', maxCount: '5' });

  useEffect(() => {
    fetchSlots();
  }, []);

  async function fetchSlots() {
    try {
      const res = await fetch('/api/admin/slots');
      const data = await res.json();
      setSlots(data.slots || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function createSlot(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time: form.time,
          label: form.label,
          maxCount: parseInt(form.maxCount),
        }),
      });
      if (res.ok) {
        setForm({ time: '', label: '', maxCount: '5' });
        setShowForm(false);
        fetchSlots();
      }
    } catch {
      alert('시간대 추가 중 오류가 발생했습니다.');
    }
  }

  async function toggleActive(id: number, isActive: boolean) {
    try {
      await fetch(`/api/admin/slots/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      });
      setSlots((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isActive: !isActive } : s))
      );
    } catch {
      alert('변경 중 오류가 발생했습니다.');
    }
  }

  async function deleteSlot(id: number) {
    if (!confirm('시간대를 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`/api/admin/slots/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSlots((prev) => prev.filter((s) => s.id !== id));
      }
    } catch {
      alert('삭제 중 오류가 발생했습니다.');
    }
  }

  return (
    <div className="pb-20 lg:pb-0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">시간대 관리</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition"
        >
          {showForm ? '취소' : '+ 시간대 추가'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={createSlot} className="bg-white rounded-xl border border-gray-100 p-4 mb-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">시간</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">라벨</label>
              <input
                type="text"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                required
                placeholder="예: 오전 면회 (11:00)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">최대 인원</label>
              <input
                type="number"
                value={form.maxCount}
                onChange={(e) => setForm({ ...form, maxCount: e.target.value })}
                min="1"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition">
            추가
          </button>
        </form>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {slots.map((slot) => (
            <div key={slot.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={clsx(
                  'w-2 h-2 rounded-full',
                  slot.isActive ? 'bg-green-500' : 'bg-gray-300',
                )} />
                <div>
                  <p className="font-medium text-gray-900">{slot.label}</p>
                  <p className="text-sm text-gray-500">시간: {slot.time} | 최대: {slot.maxCount}명</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleActive(slot.id, slot.isActive)}
                  className={clsx(
                    'px-3 py-1.5 text-sm rounded-lg transition',
                    slot.isActive
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200',
                  )}
                >
                  {slot.isActive ? '비활성화' : '활성화'}
                </button>
                <button
                  onClick={() => deleteSlot(slot.id)}
                  className="px-3 py-1.5 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 transition"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
