'use client';

import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ReservationType } from '@/types';
import TypeSelector from './TypeSelector';
import TimeSlotPicker from '../calendar/TimeSlotPicker';

interface SlotInfo {
  time: string;
  label: string;
  maxCount: number;
  currentCount: number;
}

interface ReservationFormProps {
  selectedDate: Date | null;
}

export default function ReservationForm({ selectedDate }: ReservationFormProps) {
  const [type, setType] = useState<ReservationType>('visit');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [freeTime, setFreeTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchSlots = useCallback(async (date: string) => {
    setSlotsLoading(true);
    try {
      const res = await fetch(`/api/slots?date=${date}`);
      const data = await res.json();
      setSlots(data.slots || []);
    } catch {
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDate && type === 'visit') {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      fetchSlots(dateStr);
    }
    setSelectedTime(null);
  }, [selectedDate, type, fetchSlots]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate) {
      setMessage({ type: 'error', text: '날짜를 선택해주세요.' });
      return;
    }

    const startTime = type === 'visit' ? selectedTime : freeTime;
    if (!startTime) {
      setMessage({ type: 'error', text: '시간을 선택해주세요.' });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          date: format(selectedDate, 'yyyy-MM-dd'),
          startTime,
          endTime: type !== 'visit' && endTime ? endTime : undefined,
          notes: notes || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error });
        return;
      }

      setMessage({ type: 'success', text: '예약이 완료되었습니다! 관리자 승인을 기다려주세요.' });
      setSelectedTime(null);
      setFreeTime('');
      setEndTime('');
      setNotes('');

      if (type === 'visit') {
        fetchSlots(format(selectedDate, 'yyyy-MM-dd'));
      }
    } catch {
      setMessage({ type: 'error', text: '예약 중 오류가 발생했습니다.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">예약 신청</h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">예약 유형</label>
          <TypeSelector selected={type} onChange={setType} />
        </div>

        {selectedDate && (
          <div className="bg-teal-50 rounded-lg px-4 py-3">
            <p className="text-sm text-teal-800">
              <span className="font-medium">선택한 날짜:</span>{' '}
              {format(selectedDate, 'yyyy년 M월 d일 (EEE)', { locale: ko })}
            </p>
          </div>
        )}

        {!selectedDate && (
          <div className="bg-gray-50 rounded-lg px-4 py-3">
            <p className="text-sm text-gray-500">캘린더에서 날짜를 선택해주세요.</p>
          </div>
        )}

        {selectedDate && type === 'visit' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">면회 시간</label>
            <TimeSlotPicker
              slots={slots}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              loading={slotsLoading}
            />
          </div>
        )}

        {selectedDate && type !== 'visit' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">시작 시간</label>
              <input
                type="time"
                value={freeTime}
                onChange={(e) => setFreeTime(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                종료 시간 <span className="text-gray-400">(선택)</span>
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        )}

        {selectedDate && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              메모 <span className="text-gray-400">(선택)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
              placeholder="추가 사항이 있으면 입력해주세요"
            />
          </div>
        )}

        {message && (
          <div
            className={`px-4 py-3 rounded-lg text-sm ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={!selectedDate || submitting}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {submitting ? '예약 중...' : '예약 신청'}
        </button>
      </form>
    </div>
  );
}
