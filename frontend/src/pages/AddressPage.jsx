import { apiFetch } from '../api/api';
import Navbar from '../components/Navbar.jsx';
import { useState, useEffect } from 'react';

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <p>Please log in first.</p>;
  }

  useEffect(() => {
    async function fetchAddresses() {
      const response = await apiFetch(
        `http://localhost:3000/users/${user.id}/address`,
      );

      const data = await response.json();
      setAddresses(data);
    }
    fetchAddresses();
  }, []);
  return (
    <>
      <Navbar />
      <div className="m-6 max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-6">
          Your Addresses:
        </h1>
        <div className="space-y-4">
          {addresses.map((adr) => {
            return (
              <AddressCard
                key={adr.id}
                id={adr.id}
                label={adr.label}
                value={adr.value}
                pincode={adr.pincode}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function AddressCard({ id, label, value, pincode }) {
  return (
    <div className="w-full max-w-xl rounded-xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-lg">
      <h2 className="mb-2 text-xl font-semibold text-purple-700">{label}</h2>
      <p className="text-gray-700">{value}</p>
      <p className="mt-2 text-sm text-gray-500">Pincode: {pincode}</p>
    </div>
  );
}
