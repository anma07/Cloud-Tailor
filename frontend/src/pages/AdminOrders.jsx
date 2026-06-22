import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch(`http://localhost:3000/orders`);
      const data = await response.json();

      setOrders(data);
    }
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <p>Loading Orders...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto m-4">
      <h1 className="text-4xl">Orders:</h1>
      <div className="grid grid-cols-1">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            id={order.id}
            designId={order.designId}
            size={order.size}
            clothSize={order.clothSize}
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
  );
}

export function OrderPageCard() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [design, setDesign] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      const response = await fetch(`http://localhost:3000/orders/${id}`);
      const data = await response.json();

      setOrder(data);
    }
    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (!order) return;

    async function fetchDesign() {
      const response = await fetch(
        `http://localhost:3000/designs/${order.designId}`,
      );
      const data = await response.json();

      setDesign(data);
    }
    fetchDesign();
  }, [order]);

  if (!order) {
    return <p>Loading Order...</p>;
  }

  if (!design) {
    return <p>Loading Design...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl">Order: {order.id}</h1>
      <p>Design Name: {design.name}</p>
      <p>Design Category: {design.category}</p>
      <div className="flex gap-8">
        <p>Size: {order.size}</p>
        <p>Clothsize: {order.clothSize}</p>
      </div>
      <p>Status: {order.status}</p>
      <div>
        <p>Change Status:</p>
        <div className="flex">
          <button className="border px-4 py-4 bg-green-200">Accept</button>
          <button className="border px-4 py-4 bg-red-200">Reject</button>
          <button className="border px-4 py-4 bg-blue-200">Done</button>
        </div>
      </div>
    </div>
  );
}
