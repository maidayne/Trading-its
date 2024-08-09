import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Dashboard from './components/dashboard/Dashboard';
import MarketOverview from './components/marketOverview/MarketOverview';
import Portfolio from './components/portfolio/Portfolio';
import WatchList from './components/watchList/WatchList';
import Profile from './components/menu-dropdown/profile/Profile';
import Settings from './components/menu-dropdown/setting/Settings';
import LoginForm from './components/menu-dropdown/login/LoginForm';
import SignupForm from './components/menu-dropdown/signup/SignupForm';

import { AuthProvider, AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? element : <Navigate to="/login" />;
};

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/dashboard',
      element: <ProtectedRoute element={<Dashboard />} />,
    },

    {
      path: '/portfolio',
      element: <ProtectedRoute element={<Portfolio />} />,
    },
    {
      path: '/watchlist',
      element: <ProtectedRoute element={<WatchList />} />,
    },
    {
      path: '/market-overview',
      element: <MarketOverview />,
    },
    {
      path: '/view-profile',
      element: <ProtectedRoute element={<Profile />} />,
    },
    {
      path: '/settings',
      element: <ProtectedRoute element={<Settings />} />,
    },
    {
      path: '/login',
      element: <LoginForm />,
    },
    {
      path: '/signup',
      element: <SignupForm />,
    },
  ]);

  return (
    <AuthProvider>
      <div>
        <Header />
        <RouterProvider router={router} />
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
