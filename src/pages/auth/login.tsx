// pages/login.tsx

import { NextPage } from 'next';
import LoginForm from '../../components/LoginForm';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import {useRouter} from "next/router";

const Login: NextPage = () => {
    const router = useRouter()
    const handleLogin = async (username: string, password: string) => {
        const result = await signIn('credentials', {
            callbackUrl: '/',
            username,
            password,
        });
        if(!result) return
        if (!result.error) {
            // Handle successful login, redirect, etc.
            console.log('Logged in successfully!');
        } else {
            // Handle login errors
            console.error('Login error:', result.error);
        }
    };

    const handleGoogleSignIn = async () => {
        await signIn('google', {callbackUrl: '/'}); // Using the 'google' provider from NextAuth.js
    };
    const handleRegister = async () => {
        await router.push('/auth/register')
    }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onLogin={handleLogin} onRegister={handleRegister} onGoogle={handleGoogleSignIn} />
      <div>
        <Link href="/auth/register">Register</Link>
      </div>
      <div className="btn btn-ghost">
       <button onClick={() => signIn('google', {callbackUrl: '/'})} >Login with Google</button>

      </div>
    </div>
  );
};

export default Login;