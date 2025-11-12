import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import LoginView from '../views/auth/LoginView';
import RegisterView from '../views/auth/RegisterView';
import StationListView from '../views/stations/StationListView';
import DriverListView from '@/views/drivers/DriverListView';
import CreateTripView from '@/views/trips/CreateTripView';
import PendingTripsView from '@/views/trips/PendingTripsView';
import ActiveTripsView from '@/views/trips/ActiveTripsView';
import CompletedTripsView from '@/views/trips/ComplatedTripsView';
import CancelledTripsView from '@/views/trips/CancelledTripsView';

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
        path: 'trips/create',
        element: <CreateTripView />,
      },
       {
        path: 'trips/pending',
        element: <PendingTripsView />,
      },
      {
        path: 'trips/active',
        element: <ActiveTripsView/>,
      },
      {
        path: 'trips/completed',
        element: <CompletedTripsView />,
      },
      {
        path: 'trips/cancelled',
        element: <CancelledTripsView />,
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