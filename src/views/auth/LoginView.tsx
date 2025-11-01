import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authService } from '../../api/services/auth.service';
import { useAuthStore } from '../../stores/authStore';
import type { LoginDTO } from '../../models/User';

const LoginView: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>();

  const onSubmit = async (data: LoginDTO) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await authService.login(data);
      setAuth(response.user, response.token);
      
      navigate('/stations');
    } catch (err: any) {
      setError(err.message || 'Giriş başarısız');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-blue-600 text-white text-4xl p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
            🚕
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Taksi Yönetim</h1>
          <p className="text-gray-600 mt-2">Durak Paneline Giriş</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email gereklidir',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Geçerli bir email giriniz'
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ornek@email.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { 
                required: 'Şifre gereklidir',
                minLength: {
                  value: 6,
                  message: 'Şifre en az 6 karakter olmalı'
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Hesabınız yok mu?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;