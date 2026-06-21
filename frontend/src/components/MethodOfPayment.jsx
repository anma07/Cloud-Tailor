import { useState } from 'react';

export default function MethodOfPayment({ mode, setMode }) {
  function changeMode(attr) {
    setMode(attr);
  }
  return (
    <div className="m-6">
      <p>Choose A method of payment:</p>
      <div className="flex items-center gap-6 m-2">
        <button
          className="w-50 border px-4 py-4 rounded hover:bg-gray-100 hover:shadow-lg"
          onClick={() => changeMode('UPI')}
        >
          UPI
        </button>
        <button
          className="w-50 border px-4 py-4 rounded hover:bg-gray-100 hover:shadow-lg"
          onClick={() => changeMode('COD')}
        >
          COD
        </button>
      </div>
      <p>Your Selected Mode Of Payment is {mode}</p>
    </div>
  );
}
