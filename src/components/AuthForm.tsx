import React, { useState } from 'react';

interface AuthFormProps {
  onAuthSuccess: (user: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!login.trim()) {
      setError('Login is required.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://a7315583daf4fb6e.mokky.dev/users?login=${encodeURIComponent(login.trim())}&password=${encodeURIComponent(password)}`
      );
      const users = await res.json();
      if (users.length > 0) {
        onAuthSuccess(users[0]);
      } else {
        setError('Invalid login or password.');
      }
    } catch (err) {
      setError('Login failed. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign in</h2>
      <input
        type="text"
        placeholder="Login"
        value={login}
        onChange={e => setLogin(e.target.value)}
        className="auth-form__input"
        autoComplete="username"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="auth-form__input"
        autoComplete="current-password"
      />
      {error && <div className="auth-form__error">{error}</div>}
      <button className="auth-form__btn" type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
};

export default AuthForm; 