import { apiFetch } from '../api/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SelectAddress({ addressId, setAddressId }) {
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
  console.log(addresses);
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <label className="text-sm font-semibold text-gray-700 block">
          Delivery Address
        </label>
        <p className="text-xs text-gray-400 mt-0.5">
          Select where you want your custom design delivered
        </p>
      </div>

      {/* Address List Container */}
      <div className="grid grid-cols-1 gap-3">
        {addresses.map((adr) => (
          <ShowAddress
            key={adr.id}
            id={adr.id}
            label={adr.label}
            value={adr.value}
            addressId={addressId}
            setAddressId={setAddressId}
          />
        ))}
      </div>

      {/* Add New Address Trigger */}
      <Link to="/new-address" className="inline-flex self-start">
        <span className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline inline-flex items-center gap-1 mt-1 transition">
          + Add a new delivery address
        </span>
      </Link>
    </div>
  );
}

export function ShowAddress({ id, value, label, addressId, setAddressId }) {
  return (
    <div className="flex items-start border rounded-xl p-4 m-2 bg-white border-gray-200 hover:border-purple-300 transition-all">
      <input
        type="radio"
        name="addressId"
        value={id}
        checked={id === addressId}
        onChange={() => setAddressId(id)}
        className="mt-1 h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500/20"
      />
      <div className="ml-4 flex flex-col">
        <label className="text-sm font-semibold text-gray-800">{label}</label>
        <p className="text-xs text-gray-500 mt-1">{value}</p>
      </div>
    </div>
  );
}
