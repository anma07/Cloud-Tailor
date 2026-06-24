import { useState } from 'react';

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  async function handleCreateAccount() {
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
    <div className="flex flex-col m-10">
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
      <button
        className="border px-4 py-4 rounded-md w-100 mt-6 hover:shadow-lg"
        onClick={handleCreateAccount}
      >
        Create Account
      </button>
    </div>
  );
}
