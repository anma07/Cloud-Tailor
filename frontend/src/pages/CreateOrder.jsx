import MethodOfPayment from '../components/MethodOfPayment.jsx';
import SelectAddress from '../components/SelectAddress.jsx';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreateOrder() {
  const navigate = useNavigate();
  const [size, setSize] = useState('XS');
  const [clothSize, setClothSize] = useState(0);
  const [addressId, setAddressId] = useState(0);
  const [mode, setMode] = useState('');
  const [total, setTotal] = useState(0);
  const [design, setDesign] = useState(null);
  const { id } = useParams();

  async function handlePlaceOrder() {
    const order = {
      designId: Number(id),
      size,
      clothSize,
      addressId,
      paymentMode: mode,
      total,
      status: 'REQUESTED',
    };

    const response = await fetch('http://localhost:3000/orders', {
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

  useEffect(() => {
    async function fetchDesign() {
      const response = await fetch(`http://localhost:3000/designs/${id}`);
      const data = await response.json();

      setDesign(data);
    }
    fetchDesign();
  }, [id]);

  if (!design) {
    return <p>Loding Design....</p>;
  }

  return (
    <div className="border flex flex-col m-10 max-w-xl mx-auto">
      <DesignSummary
        name={design.name}
        category={design.category}
        price={design.price}
        days={design.days}
      />
      <div className="flex">
        <SelectSize size={size} setSize={setSize} />
        <ClothSize clothSize={clothSize} setClothSize={setClothSize} />
      </div>
      <OrderSummary
        price={design.price}
        deliverycharges="100"
        total={total}
        setTotal={setTotal}
      />
      <SelectAddress addressId={addressId} setAddressId={setAddressId} />
      <MethodOfPayment mode={mode} setMode={setMode} />
      <div className="flex justify-end m-4">
        <button
          className="border px-4 py-4 hover:bg-gray-100 hover:shadow-xl"
          onClick={handlePlaceOrder}
        >
          Proceed →
        </button>
      </div>
    </div>
  );
}

export function SelectSize({ size, setSize }) {
  return (
    <div className="flex flex-col mx-8">
      <label className="block text-black text-md font-bold m-2">
        Select Size:
      </label>
      <select
        className="border rounded-lg px-3 py-2 m-2"
        value={size}
        onChange={(e) => {
          setSize(e.target.value);
        }}
      >
        <option value="" disabled>
          Select Size
        </option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select>
      <p>Your selected size is {size}</p>
    </div>
  );
}

export function ClothSize({ clothSize, setClothSize }) {
  return (
    <div>
      <label className="block text-black text-md font-bold m-2">
        Fabric Size Available
      </label>
      <input
        className="block border rounded-md"
        value={clothSize}
        onChange={(e) => {
          setClothSize(e.target.value);
        }}
      />
      <p className="text-gray-500">(in sq metres)</p>
      <p>You have {clothSize} square metres of cloth</p>
    </div>
  );
}

export function DesignSummary({ name, category, price, days }) {
  return (
    <div className="block m-4">
      <h2 className="font-serif text-2xl">Design Summary</h2>
      <p className="m-2">Design: {name}</p>
      <p className="m-2">Category: {category}</p>
      <p className="m-2">Base Price: ₹{price}</p>
      <p className="m-2">Estimated time: {days} days</p>
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
