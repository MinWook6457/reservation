export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-white font-semibold mb-2">행복요양원</h3>
            <p className="text-sm">어르신의 행복한 노후를 함께합니다.</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2 text-sm">연락처</h4>
            <p className="text-sm">전화: 02-1234-5678</p>
            <p className="text-sm">주소: 서울특별시 강남구 행복로 123</p>
            <p className="text-sm">이메일: info@nursing-home.kr</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-xs">
          <p>&copy; 2026 행복요양원. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
