'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      setUsers(data.users || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function toggleRole(id: number, currentRole: string) {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!confirm(`이 사용자를 ${newRole === 'admin' ? '관리자' : '일반 사용자'}로 변경하시겠습니까?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
        );
      }
    } catch {
      alert('변경 중 오류가 발생했습니다.');
    }
  }

  async function deleteUser(id: number) {
    if (!confirm('이 사용자를 삭제하시겠습니까? 관련 예약도 모두 삭제됩니다.')) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      }
    } catch {
      alert('삭제 중 오류가 발생했습니다.');
    }
  }

  return (
    <div className="pb-20 lg:pb-0">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">회원 관리</h1>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-500">
          등록된 회원이 없습니다.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">이름</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">이메일</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">연락처</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">역할</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">관리</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{user.phone}</td>
                    <td className="px-4 py-3">
                      <span className={clsx(
                        'text-xs px-2 py-0.5 rounded-full font-medium',
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600',
                      )}>
                        {user.role === 'admin' ? '관리자' : '사용자'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => toggleRole(user.id, user.role)}
                          className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                        >
                          역할 변경
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-xs text-red-500 hover:text-red-600 font-medium"
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-gray-100">
            {users.map((user) => (
              <div key={user.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{user.name}</span>
                  <span className={clsx(
                    'text-xs px-2 py-0.5 rounded-full font-medium',
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600',
                  )}>
                    {user.role === 'admin' ? '관리자' : '사용자'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.phone}</p>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => toggleRole(user.id, user.role)}
                    className="text-xs text-teal-600 font-medium"
                  >
                    역할 변경
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-xs text-red-500 font-medium"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
