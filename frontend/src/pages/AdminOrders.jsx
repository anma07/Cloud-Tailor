import { apiFetch } from '../api/api';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const response = await apiFetch(`http://localhost:3000/orders`);
      const data = await response.json();

      setOrders(data);
    }
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <p>Loading Orders...</p>;
  }

  console.log(orders);

  return (
    <div className="max-w-4xl mx-auto m-4 px-4">
      <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-6">
        Orders:
      </h1>
      <div className="grid grid-cols-1 gap-2">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            id={order.id}
            designId={order.design_id}
            size={order.size}
            clothSize={order.cloth_size}
            status={order.status}
          />
        ))}
      </div>
    </div>
  );
}

function OrderCard({ id, designId, size, clothSize, status }) {
  const [design, setDesign] = useState(null);

  useEffect(() => {
    async function fetchDesign() {
      const response = await fetch(`http://localhost:3000/designs/${designId}`);
      const data = await response.json();

      setDesign(data);
    }
    fetchDesign();
  }, [designId]);

  if (!design) {
    return <p>Loading Design...</p>;
  }

  return (
    <Link to={`/orders/${id}`}>
      <div className="border border-gray-100 rounded-2xl m-4 p-5 bg-white shadow-sm transition hover:shadow-md">
        <h1 className="text-xl font-bold text-gray-900 mb-3">Order: #{id}</h1>
        <p className="text-sm text-gray-600 mb-1.5">
          <span className="font-semibold text-gray-800">Design Name:</span>{' '}
          {design.name}
        </p>
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-semibold text-gray-800">Design Category:</span>{' '}
          {design.category}
        </p>
        <div className="flex gap-8 border-y border-gray-50 py-2 mb-3">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Size:</span> {size}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Clothsize:</span>{' '}
            {clothSize}
          </p>
        </div>
        <p className="text-sm font-semibold text-gray-800">
          Status:{' '}
          <span className="ml-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-purple-50 text-purple-700 border border-purple-100">
            {status}
          </span>
        </p>
      </div>
    </Link>
  );
}
