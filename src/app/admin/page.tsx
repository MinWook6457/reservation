'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalReservations: number;
  pendingCount: number;
  todayCount: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      const [resRes, usersRes] = await Promise.all([
        fetch('/api/admin/reservations'),
        fetch('/api/admin/users'),
      ]);
      const resData = await resRes.json();
      const usersData = await usersRes.json();

      const reservations = resData.reservations || [];
      const today = new Date().toISOString().split('T')[0];

      setStats({
        totalReservations: reservations.length,
        pendingCount: reservations.filter((r: { status: string }) => r.status === 'pending').length,
        todayCount: reservations.filter((r: { date: string }) => r.date === today).length,
        totalUsers: (usersData.users || []).filter((u: { role: string }) => u.role === 'user').length,
      });
    }
    fetchStats();
  }, []);

  const cards = stats
    ? [
        { label: '전체 예약', value: stats.totalReservations, color: 'bg-blue-50 text-blue-700' },
        { label: '승인 대기', value: stats.pendingCount, color: 'bg-amber-50 text-amber-700' },
        { label: '오늘 예약', value: stats.todayCount, color: 'bg-teal-50 text-teal-700' },
        { label: '등록 회원', value: stats.totalUsers, color: 'bg-purple-50 text-purple-700' },
      ]
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h1>

      {!stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div key={card.label} className={`rounded-xl p-5 ${card.color}`}>
              <p className="text-sm font-medium opacity-80">{card.label}</p>
              <p className="text-3xl font-bold mt-1">{card.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
