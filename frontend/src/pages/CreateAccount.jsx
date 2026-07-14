import { useState } from 'react';

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  async function handleCreateAccount(e) {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      setError('Pls enter a valid phone number');
      return;
    }

    setError('');

    const user = {
      username: name,
      email,
      password,
      phone,
    };

    const response = await fetch(`http://localhost:3000/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      alert('Failed to create an account, pls try again later!');
      return;
    }

    alert('Account created successfully!');
  }

  return (
    <form
      className="flex flex-col m-10 max-w-md mx-auto bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
      noValidate
      onSubmit={handleCreateAccount}
    >
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">
        Create Account:
      </h1>

      <label className="text-sm font-semibold text-gray-700 mb-1">
        Enter Your Name:
      </label>
      <input
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition mb-4"
        type="text"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label className="text-sm font-semibold text-gray-700 mb-1">
        Enter Your Email:
      </label>
      <input
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition mb-4"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className="text-sm font-semibold text-gray-700 mb-1">
        Choose A Password:
      </label>
      <input
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition mb-4"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label className="text-sm font-semibold text-gray-700 mb-1">
        Enter Your Mobile No.:
      </label>
      <input
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition mb-4"
        type="text"
        placeholder="+91 XXXXX XXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      {error && (
        <p className="mt-1 text-sm font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 my-2">
          {error}
        </p>
      )}

      <button
        className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-purple-100 transition hover:bg-purple-700 hover:scale-[1.01] active:scale-[0.99] mt-6"
        type="submit"
      >
        Create Account
      </button>
    </form>
  );
}
