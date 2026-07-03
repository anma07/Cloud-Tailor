import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {apiFetch} from '../api/api'

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
    <div className="max-w-4xl mx-auto m-4">
      <h1 className="text-4xl">Orders:</h1>
      <div className="grid grid-cols-1">
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
      <div className="border rounded-md m-4">
        <h1 className="text-2xl">Order: {id}</h1>
        <p>Design Name: {design.name}</p>
        <p>Design Category: {design.category}</p>
        <div className="flex gap-8">
          <p>Size: {size}</p>
          <p>Clothsize: {clothSize}</p>
        </div>
        <p>Status: {status}</p>
      </div>
    </Link>
  );
}
