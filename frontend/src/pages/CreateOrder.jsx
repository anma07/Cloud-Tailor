import { apiFetch } from '../api/api';
import MethodOfPayment from '../components/MethodOfPayment.jsx';
import SelectAddress from '../components/SelectAddress.jsx';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreateOrder() {
  const navigate = useNavigate();
  const [size, setSize] = useState('');
  const [clothSize, setClothSize] = useState(0);
  const [addressId, setAddressId] = useState(0);
  const [mode, setMode] = useState('');
  const [total, setTotal] = useState(0);
  const [design, setDesign] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();

  async function handlePlaceOrder() {
    const clothSizeRegex = /^\d+(\.\d{1,2})?$/;

    if (!size) {
      setError('Please select a size.');
      return;
    }

    if (!clothSizeRegex.test(clothSize) || Number(clothSize) <= 0) {
      setError('Pls enter valid cloth size (upto 2 decimals)');
      return;
    }

    if (addressId === 0) {
      setError('Pls select an address');
      return;
    }

    if (mode === '') {
      setError('Pls select a mode of payment');
      return;
    }

    setError('');

    const confirmed = window.confirm('Confirm your order');

    if (!confirmed) {
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return <p>Please log in first.</p>;
    }
    const userId = user.id;
    const order = {
      userId,
      designId: Number(id),
      size,
      clothSize,
      addressId,
      paymentMode: mode,
      total,
      status: 'REQUESTED',
    };

    if (mode === 'UPI') {
      await handleRazorpayOrder(order);
    } else {
      await createOrder(order);
    }
  }

  async function createOrder(order) {
    const response = await apiFetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      const createdOrder = await response.json();
      navigate(`/order-placed/${createdOrder.id}`);
    } else {
      alert('Failed to place order');
    }
  }

  async function handleRazorpayOrder(order) {
    const response = await apiFetch('http://localhost:3000/pay/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        total: order.total,
      }),
    });

    const razorpayOrder = await response.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      order_id: razorpayOrder.id,
      name: 'Cloud Tailor',

      handler: async function (payment) {
        const verify = await apiFetch('http://localhost:3000/pay/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payment),
        });
        if (!verify.ok) {
          alert('Payment verification failed.');
          return;
        }

        await createOrder(order);
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  useEffect(() => {
    async function fetchDesign() {
      const response = await apiFetch(`http://localhost:3000/designs/${id}`);
      const data = await response.json();

      setDesign(data);
    }
    fetchDesign();
  }, [id]);

  if (!design) {
    return <p>Loding Design....</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 md:px-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
            <DesignSummary
              name={design.name}
              category={design.category}
              price={design.price}
              days={design.days}
            />
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">
              Sizing & Fabric
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SelectSize size={size} setSize={setSize} />
              <ClothSize clothSize={clothSize} setClothSize={setClothSize} />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
            <SelectAddress addressId={addressId} setAddressId={setAddressId} />
            <div className="h-[1px] bg-gray-100 w-full" />
            <MethodOfPayment mode={mode} setMode={setMode} />
          </div>
        </div>
        <div className="lg:col-span-1 bg-white border border-purple-100 rounded-2xl p-6 shadow-sm shadow-purple-100/50 lg:sticky lg:top-24">
          <h3 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">
            Payment Summary
          </h3>
          <OrderSummary
            price={design.price}
            deliverycharges="100"
            total={total}
            setTotal={setTotal}
          />
          {error && (
            <p className="mt-4 text-sm font-medium text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
              {error}
            </p>
          )}
          <button
            className="w-full mt-6 rounded-xl bg-purple-600 py-4 font-semibold text-white shadow-md shadow-purple-200 transition-all duration-200 hover:bg-purple-700 hover:scale-[1.01] active:scale-[0.99]"
            onClick={handlePlaceOrder}
          >
            Place Order →
          </button>
        </div>
      </div>
    </div>
  );
}

export function SelectSize({ size, setSize }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700 mb-2">
        Select Size
      </label>
      <select
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      >
        <option value="" disabled>
          Choose your standard size
        </option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select>
      {size && (
        <p className="mt-2 text-xs font-medium text-purple-600">
          Selected Profile: Size {size}
        </p>
      )}
    </div>
  );
}

export function ClothSize({ clothSize, setClothSize }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700 mb-2">
        Fabric Size Available{' '}
        <span className="text-xs font-normal text-gray-400">(sq. metres)</span>
      </label>
      <div className="relative">
        <input
          type="number"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          placeholder="e.g. 2.5"
          value={clothSize}
          onChange={(e) => setClothSize(e.target.value)}
        />
      </div>
      {clothSize && (
        <p className="mt-2 text-xs font-medium text-gray-500">
          You are providing {clothSize} m² of material.
        </p>
      )}
    </div>
  );
}

export function DesignSummary({ name, category, price, days }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          {category}
        </span>
        <h2 className="text-xl font-bold text-gray-900 mt-0.5">{name}</h2>
        <p className="text-sm text-gray-500 mt-1">
          Fulfillment timeline:{' '}
          <span className="font-medium text-gray-700">{days} days</span>
        </p>
      </div>
      <div className="text-left sm:text-right">
        <span className="text-xs text-gray-400 block uppercase font-medium">
          Base Cost
        </span>
        <span className="text-2xl font-black text-gray-900">₹{price}</span>
      </div>
    </div>
  );
}

export function OrderSummary({ price, deliverycharges, total, setTotal }) {
  const orderTotal = Number(price) + Number(deliverycharges);
  setTotal(orderTotal);
  return (
    <div className="block m-4">
      <h2 className="font-serif text-xl">Order Summary</h2>
      <p className="m-2">Base Price: ₹{price}</p>
      <p className="m-2">Delivery Charges: ₹{deliverycharges}</p>
      <p className="m-2">Total: ₹{orderTotal}</p>
    </div>
  );
}
