// pages/login.tsx

import { NextPage } from 'next';
import RegisterForm from '../../components/RegisterForm';
import { useRouter } from 'next/router';
import {signIn} from "next-auth/react";


const Register: NextPage = () => {
    const router = useRouter();

    const handleRegister = async (username: string, password:string) => {
        console.log('Username:', username);
        // You can add your login logic here
        console.log(JSON.stringify({username: username, password:password}))

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password})
            })
            if (response.ok) {
                const user = await response.json()
                console.log('User created:', user)
                // router.push(`/${username}`);

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

                // You can add additional logic here, such as redirecting the user or displaying a success message

            } else {
                const error = await response.json()
                console.error('Error creating user:', error.error)
                // You can handle the error here, such as displaying an error message to the user
            }
        } catch (error) {
            console.log("Error: ", error)
        }


  };

  return (
    <div>
      <h1>Login</h1>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default Register;