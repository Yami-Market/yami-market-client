import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import AuthNavbar from './containers/Navbar/AuthNavbar';
import CheckoutNavbar from './containers/Navbar/CheckoutNavBar';
import MainNavbar from './containers/Navbar/MainNavbar';
import useAuth from './hooks/useAuth';
import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';
import About from './pages/About';
import Account from './pages/Account';
import Address from './pages/Address';
import Card from './pages/Card';
import Category from './pages/Category';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Order from './pages/Order';
import OrderDetail from './pages/OrderDetail';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import Signup from './pages/Signup';

type ProtectedRouteProps = {
  children: React.ReactNode;
  state?: {
    callbackUrl?: string;
  };
};

const ProtectedRoute = ({ children, state }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (user.id) {
    return <>{children}</>;
  }

  return <Navigate to='/login' replace state={state} />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout Navbar={<MainNavbar />} />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'product/:productId',
        element: <Product />
      },
      {
        path: 'category/:categoryId',
        element: <ProductList />
      },
      {
        path: '/order/:orderId',
        element: (
          <ProtectedRoute>
            <OrderDetail />
          </ProtectedRoute>
        )
      },
      {
        path: 'confirmation',
        element: (
          <ProtectedRoute>
            <Confirmation />
          </ProtectedRoute>
        )
      },
      {
        path: 'category',
        element: <Category />
      },
      {
        path: 'cart',
        element: <ShoppingCart />
      },
      {
        element: (
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '/account',
            element: <Account />
          },
          {
            path: '/order',
            element: <Order />
          },

          {
            path: '/address',
            element: <Address />
          },
          {
            path: '/card',
            element: <Card />
          }
        ]
      }
    ]
  },
  {
    path: '/',
    element: <BasicLayout Navbar={<CheckoutNavbar />} />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'checkout',
        element: (
          <ProtectedRoute
            state={{
              callbackUrl: '/checkout'
            }}
          >
            <Checkout />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/',
    element: <BasicLayout Navbar={<AuthNavbar />} />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;
