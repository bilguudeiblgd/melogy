// pages/login.tsx

import { NextPage } from 'next';
import RegisterForm from '../../components/RegisterForm';
import { useRouter } from 'next/router';


const Register: NextPage = () => {
    const router = useRouter();

    const handleRegister = async (username: string) => {
    console.log('Username:', username);
    // You can add your login logic here
    console.log(JSON.stringify({username: username}))

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username})
        })
        if (response.ok) {
            const user = await response.json()
            console.log('User created:', user)
            router.push(`/${username}`);

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