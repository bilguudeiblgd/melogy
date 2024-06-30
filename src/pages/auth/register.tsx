// pages/login.tsx

import { NextPage } from 'next';
import RegisterForm from '../../components/RegisterForm';

const Register: NextPage = () => {
  const handleRegister = (username: string, password: string) => {
    console.log('Username:', username);
    console.log('Password:', password);
    // You can add your login logic here
  };

  return (
    <div>
      <h1>Login</h1>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default Register;