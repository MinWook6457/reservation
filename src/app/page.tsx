import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white overflow-hidden relative">
          <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 flex items-center">
            <div className="max-w-2xl relative z-10">
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                행복요양원에<br />오신 것을 환영합니다
              </h1>
              <p className="mt-4 text-teal-100 text-lg sm:text-xl leading-relaxed">
                따뜻한 보살핌과 전문적인 케어로 어르신의 편안한 생활을 지원합니다.
                온라인으로 간편하게 방문 예약을 하실 수 있습니다.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/reservation"
                  className="inline-flex items-center justify-center bg-white text-teal-700 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition shadow-lg"
                >
                  방문 예약하기
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center border-2 border-white/30 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  로그인
                </Link>
              </div>
            </div>
            {/* 요양원 일러스트 */}
            <div className="hidden lg:block flex-shrink-0 ml-auto pl-8">
              <svg width="380" height="320" viewBox="0 0 380 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 배경 원 */}
                <circle cx="190" cy="160" r="140" fill="white" fillOpacity="0.08" />
                <circle cx="190" cy="160" r="105" fill="white" fillOpacity="0.06" />

                {/* 건물 본체 */}
                <rect x="100" y="120" width="180" height="120" rx="6" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.5" strokeWidth="2" />

                {/* 지붕 */}
                <path d="M80 125 L190 65 L300 125" stroke="white" strokeOpacity="0.6" strokeWidth="2.5" fill="white" fillOpacity="0.15" strokeLinejoin="round" />

                {/* 십자가 (요양/의료 상징) */}
                <rect x="180" y="78" width="20" height="6" rx="1" fill="white" fillOpacity="0.8" />
                <rect x="187" y="71" width="6" height="20" rx="1" fill="white" fillOpacity="0.8" />

                {/* 창문 줄 1 */}
                <rect x="120" y="140" width="28" height="28" rx="4" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
                <line x1="134" y1="140" x2="134" y2="168" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
                <line x1="120" y1="154" x2="148" y2="154" stroke="white" strokeOpacity="0.3" strokeWidth="1" />

                <rect x="176" y="140" width="28" height="28" rx="4" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
                <line x1="190" y1="140" x2="190" y2="168" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
                <line x1="176" y1="154" x2="204" y2="154" stroke="white" strokeOpacity="0.3" strokeWidth="1" />

                <rect x="232" y="140" width="28" height="28" rx="4" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
                <line x1="246" y1="140" x2="246" y2="168" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
                <line x1="232" y1="154" x2="260" y2="154" stroke="white" strokeOpacity="0.3" strokeWidth="1" />

                {/* 문 */}
                <rect x="170" y="200" width="40" height="40" rx="4" fill="white" fillOpacity="0.25" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
                <circle cx="202" cy="222" r="2.5" fill="white" fillOpacity="0.6" />

                {/* 나무 왼쪽 */}
                <rect x="55" y="200" width="6" height="40" rx="2" fill="white" fillOpacity="0.2" />
                <circle cx="58" cy="190" r="18" fill="white" fillOpacity="0.12" />
                <circle cx="48" cy="196" r="13" fill="white" fillOpacity="0.1" />
                <circle cx="68" cy="196" r="13" fill="white" fillOpacity="0.1" />

                {/* 나무 오른쪽 */}
                <rect x="317" y="195" width="6" height="45" rx="2" fill="white" fillOpacity="0.2" />
                <circle cx="320" cy="182" r="20" fill="white" fillOpacity="0.12" />
                <circle cx="308" cy="190" r="14" fill="white" fillOpacity="0.1" />
                <circle cx="332" cy="190" r="14" fill="white" fillOpacity="0.1" />

                {/* 바닥/잔디 */}
                <path d="M30 240 Q190 255 350 240" stroke="white" strokeOpacity="0.2" strokeWidth="2" fill="none" />

                {/* 벤치 */}
                <rect x="295" y="228" width="30" height="3" rx="1" fill="white" fillOpacity="0.25" />
                <rect x="298" y="231" width="3" height="9" rx="1" fill="white" fillOpacity="0.2" />
                <rect x="319" y="231" width="3" height="9" rx="1" fill="white" fillOpacity="0.2" />

                {/* 사람 1 - 휠체어 어르신 */}
                <circle cx="85" cy="248" r="7" fill="white" fillOpacity="0.3" />
                <circle cx="85" cy="268" r="11" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
                <circle cx="78" cy="280" r="5" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
                <circle cx="92" cy="280" r="5" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.25" strokeWidth="1" />

                {/* 사람 2 - 보호자/간호사 */}
                <circle cx="110" cy="245" r="6" fill="white" fillOpacity="0.35" />
                <rect x="104" y="253" width="12" height="20" rx="4" fill="white" fillOpacity="0.2" />
                <line x1="104" y1="260" x2="92" y2="256" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />

                {/* 하트 (돌봄 상징) */}
                <path d="M96 240 C96 237, 100 235, 102 238 C104 235, 108 237, 108 240 C108 244, 102 248, 102 248 C102 248, 96 244, 96 240Z" fill="white" fillOpacity="0.3" />

                {/* 꽃 장식 */}
                <circle cx="340" cy="235" r="3" fill="white" fillOpacity="0.2" />
                <circle cx="346" cy="232" r="3" fill="white" fillOpacity="0.2" />
                <circle cx="343" cy="228" r="3" fill="white" fillOpacity="0.2" />
                <circle cx="343" cy="232" r="2" fill="white" fillOpacity="0.35" />
                <line x1="343" y1="235" x2="343" y2="242" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
              시설 소개
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">쾌적한 환경</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  밝고 깨끗한 시설에서 쾌적하고 안락한 생활환경을 제공합니다. 자연 채광이 풍부한 넓은 공간에서 편안한 일상을 보내실 수 있습니다.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">전문 케어</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  간호사, 요양보호사 등 전문 인력이 24시간 상주하며 체계적인 건강관리와 맞춤형 케어 서비스를 제공합니다.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">가족같은 분위기</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  어르신 한 분 한 분을 가족처럼 모시며, 다양한 여가 프로그램과 사회활동을 통해 활기찬 일상을 지원합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Visit Info Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
              방문 안내
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-teal-600 font-bold text-sm mb-2">면회</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">정기 면회</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>매일 3회 면회 가능</p>
                  <div className="space-y-1">
                    <p className="font-medium text-gray-700">면회 시간</p>
                    <p>오전 11:00</p>
                    <p>오후 3:00</p>
                    <p>오후 4:10</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-blue-600 font-bold text-sm mb-2">외박</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">외박 신청</h3>
                <p className="text-sm text-gray-600">
                  보호자와 함께하는 외박을 사전에 신청하실 수 있습니다. 날짜와 시간을 자유롭게 선택해주세요.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-purple-600 font-bold text-sm mb-2">외출</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">외출 신청</h3>
                <p className="text-sm text-gray-600">
                  병원 방문, 개인 용무 등 외출이 필요한 경우 사전에 신청해주세요. 날짜와 시간을 자유롭게 선택하실 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">방문 예약하기</h2>
            <p className="text-gray-600 mb-8">
              간편한 온라인 예약으로 소중한 가족을 만나보세요.
            </p>
            <Link
              href="/reservation"
              className="inline-flex items-center bg-teal-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-teal-700 transition shadow-sm"
            >
              예약 페이지로 이동
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
