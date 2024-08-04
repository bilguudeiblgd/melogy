// components/LoginForm.tsx

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

interface LoginFormProps {
    onLogin: (username: string, password:string) => void;
    onRegister: () => void;
    onGoogle: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegister, onGoogle }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
        e.preventDefault()
        onLogin(username, password);
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6 flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign In
                    </button>
                    <button
                        type="button"
                        onClick={onGoogle}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign In with Google
                    </button>
                </div>
                <div className="text-center">
                    <p>
                        {'Don\'t have an account?'}
                        <a
                            href="#"
                            onClick={onRegister}
                            className="text-blue-500 hover:underline"
                        >
                            Register here
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
