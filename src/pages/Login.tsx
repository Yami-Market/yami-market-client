import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import Helmet from '../components/Helmet/Helmet';
import SignupLink from '../components/Link/SignupLink';
import AuthForm from '../containers/Form/AuthForm';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [loginError, setLoginError] = useState<string | undefined>();
  const { login, user } = useAuth();
  const location = useLocation();

  if (user.id) {
    return <Navigate to={location.state?.callbackUrl || '/'} replace />;
  }

  const handleSubmit = async (email: string, password: string) => {
    try {
      await login(email, password, location.state?.callbackUrl);
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      }
    }
  };

  return (
    <>
      <Helmet title='Login' />
      <AuthForm
        title='Log In Your Account'
        buttonText='Log In'
        footer={
          <>
            Don&apos;t have an account? <SignupLink text='Sign Up' />
          </>
        }
        serverErrorMessage={loginError}
        handleAuthSubmit={handleSubmit}
      />
    </>
  );
};

export default Login;
