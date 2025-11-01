import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import LoginView from '../views/auth/LoginView';
import RegisterView from '../views/auth/RegisterView';
import StationListView from '../views/stations/StationListView';
import DriverListView from '@/views/drivers/DriverListView';

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/login',
    element: <LoginView />,
  },
  {
    path: '/register',
    element: <RegisterView />,
  },
  
  // Protected routes
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/stations" replace />,
      },
      {
        path: 'stations',
        element: <StationListView />,
      },
      {
        path: 'dashboard',
        element: <div className="p-6">Dashboard - Yakında...</div>,
      },
      {
        path: 'drivers',
        element: <DriverListView />,
      },
      {
        path: 'trips/pending',
        element: <div className="p-6">Bekleyen İşler - Yakında...</div>,
      },
      {
        path: 'trips/active',
        element: <div className="p-6">Aktif İşler - Yakında...</div>,
      },
      {
        path: 'trips/completed',
        element: <div className="p-6">Tamamlanan İşler - Yakında...</div>,
      },
      {
        path: 'trips/cancelled',
        element: <div className="p-6">İptal Edilen İşler - Yakında...</div>,
      },
      {
        path: 'reports',
        element: <div className="p-6">Raporlar - Yakında...</div>,
      },
      {
        path: 'settings',
        element: <div className="p-6">Ayarlar - Yakında...</div>,
      },
    ],
  },
  
  // 404
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);