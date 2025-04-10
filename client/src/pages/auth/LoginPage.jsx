import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedInUsers, setLoggedInUsers] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const count = localStorage.getItem('loggedInUsers') || 0;
    setLoggedInUsers(Number(count));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      setError('Invalid email or password');
      return;
    }
    
    const newCount = Number(localStorage.getItem('loggedInUsers') || 0);
    localStorage.setItem('loggedInUsers', newCount + 1);
    setLoggedInUsers(newCount + 1);
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            Welcome Back
            <div className="mt-2 h-1 bg-blue-500 w-20 mx-auto rounded-full"/>
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            {loggedInUsers} active user(s) in system
          </p>
        </div>

        {error && (
          <div className="mt-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          New here?{' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-700">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}