import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">로그인</h1>
            <p className="text-gray-500 mt-2">요양원 방문 예약 시스템</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
