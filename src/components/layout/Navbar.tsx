import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white text-2xl p-2 rounded-lg">
            🚕
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Taksi Yönetim Sistemi</h1>
            <p className="text-xs text-gray-500">Durak Paneli</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <User className="h-5 w-5" />
              <div className="text-left">
                <span className="text-sm font-medium block">{user?.fullName || 'Kullanıcı'}</span>
                <span className="text-xs text-gray-500">{user?.role || 'operator'}</span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown kapatma için backdrop */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;