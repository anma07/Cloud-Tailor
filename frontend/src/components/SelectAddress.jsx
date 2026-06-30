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
      const response = await fetch(`http://localhost:3000/users/${user.id}/address`);

      const data = await response.json();
      setAddresses(data);
    }

    fetchAddresses();
  }, []);
  return (
    <div className="flex flex-col ml-6 mb-4">
      <p>Choose Your Address</p>
      {addresses.map((adr) => {
        return (
          <ShowAddress
            key={adr.id}
            id={adr.id}
            label={adr.label}
            value={adr.value}
            addressId={addressId}
            setAddressId={setAddressId}
          />
        );
      })}
      <Link to={`/new-address`}>
        <p className="hover:text-blue-800 hover:underline">
          Or Add new Address
        </p>
      </Link>
    </div>
  );
}

export function ShowAddress({ id, value, label, addressId, setAddressId }) {
  return (
    <div>
      <input
        type="radio"
        name="addressId"
        value={id}
        checked={id === addressId}
        onChange={() => setAddressId(id)}
        className="rounded text-blue-500"
      />
      <label className="ml-4">{label}</label>
      <p>{value}</p>
    </div>
  );
}
