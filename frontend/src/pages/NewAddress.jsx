import { apiFetch } from '../api/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewAddress() {
  const navigate = useNavigate();
  const [adrLabel, setAdrLabel] = useState('');
  const [adrValue, setAdrValue] = useState('');
  const [error, setError] = useState('');
  const [adrPincode, setAdrPincode] = useState('');

  async function handleAddAddress() {
    if (adrLabel === '') {
      setError('Pls add a label');
      return;
    }

    if (adrValue === '') {
      setError('Pls add a Value');
      return;
    }

    if (adrPincode === '') {
      setError('Pls add a pincode');
      return;
    }
    setError('');

    const confirmed = window.confirm('Confirm your address');

    if (!confirmed) {
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return <p>Please log in first.</p>;
    }
    const userId = user.id;
    const address = {
      userId,
      label: adrLabel,
      value: adrValue,
      pincode: Number(adrPincode),
    };

    const response = await apiFetch('http://localhost:3000/address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(address),
    });

    if (response.ok) {
      navigate(-1);
    }
  }
  return (
    <div className="m-6 max-w-md mx-auto bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">
        Pls Add your Address Details
      </h1>

      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Label:
      </label>
      <input
        className="block w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition mb-4"
        placeholder="e.g. Home, Office"
        value={adrLabel}
        onChange={(e) => setAdrLabel(e.target.value)}
      />

      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Pls Enter Your Address:{' '}
      </label>
      <input
        className="block w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition mb-4"
        placeholder="Flat/House No, Building, Street"
        value={adrValue}
        onChange={(e) => setAdrValue(e.target.value)}
      />

      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Pincode:{' '}
      </label>
      <input
        className="block w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition mb-4"
        placeholder="pincode"
        value={adrPincode}
        onChange={(e) => setAdrPincode(e.target.value)}
      />

      {error && (
        <p className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 my-3">
          {error}
        </p>
      )}

      <button
        className="block w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-purple-100 transition hover:bg-purple-700 hover:scale-[1.01] active:scale-[0.99] mt-6"
        onClick={handleAddAddress}
      >
        Add Address
      </button>
    </div>
  );
}
