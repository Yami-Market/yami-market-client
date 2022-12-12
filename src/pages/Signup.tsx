import axios from 'axios';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { authApi } from '../api/authApi';
import Helmet from '../components/Helmet/Helmet';
import LoginLink from '../components/Link/LoginLink';
import AuthForm from '../containers/Form/AuthForm';
import useAuth from '../hooks/useAuth';

const Signup = () => {
  const [signupError, setSignupError] = useState<string | undefined>();
  const { login, user } = useAuth();
  const location = useLocation();

  if (user.id) {
    return <Navigate to={location.state?.callbackUrl || '/'} replace />;
  }

  const handleSubmit = async (email: string, password: string) => {
    try {
      await authApi.signup(email, password);
      await login(email, password, location.state?.callbackUrl);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setSignupError(error.response.data.message);
      } else if (error instanceof Error) {
        setSignupError(error.message);
      }
    }
  };

  return (
    <>
      <Helmet title='Signup' />
      <AuthForm
        title='Sign Up Your Account'
        buttonText='Sign Up'
        footer={
          <>
            Already have an account? <LoginLink text='Log In' />
          </>
        }
        serverErrorMessage={signupError}
        handleAuthSubmit={handleSubmit}
      />
    </>
  );
};

export default Signup;
