import { useState } from 'react';

interface RegisterFormProps {
  onSubmit: (email: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ( {onSubmit}) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
   
    onSubmit(username);
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Handle:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  )
}

export default RegisterForm;