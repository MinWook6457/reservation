'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => {});
  }, []);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/');
    router.refresh();
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-teal-700">
            행복요양원
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition">
              소개
            </Link>
            <Link href="/reservation" className="text-sm text-gray-600 hover:text-gray-900 transition">
              예약
            </Link>
            {user?.role === 'admin' && (
              <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900 transition">
                관리자
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{user.name}님</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-gray-700 transition"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-teal-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-teal-700 transition"
              >
                로그인
              </Link>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button className="sm:hidden p-1" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden border-t border-gray-100 py-3 space-y-2">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
              소개
            </Link>
            <Link href="/reservation" onClick={() => setMenuOpen(false)} className="block px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
              예약
            </Link>
            {user?.role === 'admin' && (
              <Link href="/admin" onClick={() => setMenuOpen(false)} className="block px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                관리자
              </Link>
            )}
            {user ? (
              <div className="flex items-center justify-between px-2 py-2">
                <span className="text-sm text-gray-500">{user.name}님</span>
                <button onClick={handleLogout} className="text-sm text-red-500">
                  로그아웃
                </button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)} className="block px-2 py-2 text-sm text-teal-600 font-medium">
                로그인
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
