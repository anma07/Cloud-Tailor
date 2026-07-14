import { useState } from 'react';

export default function MethodOfPayment({ mode, setMode }) {
  function changeMode(attr) {
    setMode(attr);
  }
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <label className="text-sm font-semibold text-gray-700 block">
          Payment Method
        </label>
        <p className="text-xs text-gray-400 mt-0.5">
          Choose how you would prefer to pay your tailor
        </p>
      </div>

      {/* Payment Selection Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* UPI Option */}
        <button
          type="button"
          onClick={() => setMode('UPI')}
          className={`flex flex-col items-center justify-center p-5 rounded-xl border font-medium text-sm transition-all duration-200 ${
            mode === 'UPI'
              ? 'border-purple-600 bg-purple-50 text-purple-700 font-bold shadow-sm shadow-purple-100'
              : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          <span className="tracking-wider text-base">UPI</span>
          <span className="text-[10px] font-normal text-gray-400 mt-1">
            Instant Digital Pay
          </span>
        </button>

        {/* COD Option */}
        <button
          type="button"
          onClick={() => setMode('COD')}
          className={`flex flex-col items-center justify-center p-5 rounded-xl border font-medium text-sm transition-all duration-200 ${
            mode === 'COD'
              ? 'border-purple-600 bg-purple-50 text-purple-700 font-bold shadow-sm shadow-purple-100'
              : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          <span className="tracking-wider text-base">COD</span>
          <span className="text-[10px] font-normal text-gray-400 mt-1">
            Cash on Delivery
          </span>
        </button>
      </div>

      {/* Confirmation State Footer */}
      {mode && (
        <p className="text-xs font-medium text-gray-500 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100 inline-self-start">
          Selected Strategy:{' '}
          <span className="text-purple-700 font-semibold">{mode}</span>
        </p>
      )}
    </div>
  );
}
