import { useState } from 'react';

interface RegisterFormProps {
  onSubmit: (email: string, password: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ( {onSubmit}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [againPassword, setAgainPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== againPassword) {
      alert('Passwords do not match');
      return;
    }
    onSubmit(username, password);
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="againpassword">Password again:</label>
        <input
          type="againpassword"
          id="againpassword"
          value={againPassword}
          onChange={(e) => setAgainPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default RegisterForm;