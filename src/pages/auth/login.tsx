// pages/login.tsx

import { NextPage } from 'next';
import LoginForm from '../../components/LoginForm';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';

const Login: NextPage = () => {
  const handleLogin = (username: string, password: string) => {
    console.log('Username:', username);
    console.log('Password:', password);
    // You can add your login logic here
  };


  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} />
      <div>
        <a href="/auth/register">Register</a>
      </div>
      <div className="btn btn-ghost">
       <a onClick={() => signIn('google', {callbackUrl: '/'})} >Login with Google</a>

      </div>
    </div>
  );
};

export default Login;