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
      className="flex flex-col m-10"
      noValidate
      onSubmit={handleCreateAccount}
    >
      <h1 className="text-4xl">Create Account:</h1>
      <label>Enter Your Name:</label>
      <input
        className="border w-100 rounded-md"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Enter Your Email:</label>
      <input
        className="border w-100 rounded-md"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Choose A Password:</label>
      <input
        className="border w-100 rounded-md"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label>Enter Your Mobile No.:</label>
      <input
        className="border w-100 rounded-md"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      <button
        className="border px-4 py-4 rounded-md w-100 mt-6 hover:shadow-lg"
        type="submit"
      >
        Create Account
      </button>
    </form>
  );
}
