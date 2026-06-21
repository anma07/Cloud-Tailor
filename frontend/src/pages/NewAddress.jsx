import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewAddress() {
  const navigate = useNavigate();
  const [adrLabel, setAdrLabel] = useState('');
  const [adrValue, setAdrValue] = useState('');
  const [adrPincode, setAdrPincode] = useState('');

  async function handleAddAddress() {
    const address = {
      label: adrLabel,
      value: adrValue,
      pincode: Number(adrPincode),
    };

    const response = await fetch('http://localhost:3000/address', {
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
    <div className="m-6">
      <h1 className="text-2xl">Pls Add your Address Details</h1>
      <label>Label:</label>
      <input
        className="block border rounded-md"
        value={adrLabel}
        onChange={(e) => setAdrLabel(e.target.value)}
      />
      <label>Pls Enter Your Address: </label>
      <input
        className="block border rounded-md"
        value={adrValue}
        onChange={(e) => setAdrValue(e.target.value)}
      />
      <label>Pincode: </label>
      <input
        className="block border rounded-md"
        value={adrPincode}
        onChange={(e) => setAdrPincode(e.target.value)}
      />
      <button
        className="block border px-4 py-4 rounded-lg mt-4 hover:bg-gray-100 hover:shadow-lg"
        onClick={handleAddAddress}
      >
        Add Address
      </button>
    </div>
  );
}
