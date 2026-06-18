import { AddressArray } from '../Address.js';
import { useState } from 'react';

export default function SelectAddress() {
  const [addressId, setAddressId] = useState(0);
  return (
    <div className="flex flex-col ml-6 mb-4">
      <p>Choose Your Address</p>
      {AddressArray.map((adr) => {
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
      <p className="hover:text-blue-800 hover:underline">Or Add new Address</p>
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
