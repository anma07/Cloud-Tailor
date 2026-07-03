import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {apiFetch} from '../api/api'

export default function OrderPageCard() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [design, setDesign] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function fetchOrder() {
      const response = await apiFetch(`http://localhost:3000/orders/${id}`);
      const data = await response.json();

      setOrder(data);
      setStatus(data.status);
    }
    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (!order) return;

    async function fetchDesign() {
      const response = await apiFetch(
        `http://localhost:3000/designs/${order.design_id}`,
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

  async function handleAccept() {
    await updateStatus('IN PROGRESS');
    setStatus('IN PROGRESS');
  }

  async function handleReject() {
    await updateStatus('REJECTED');
    setStatus('REJECTED');
  }

  async function handleComplete() {
    await updateStatus('COMPLETED');
    setStatus('COMPLETED');
  }

  async function updateStatus(status) {
    const response = await apiFetch(`http://localhost:3000/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
      }),
    });
  }

  return (
    <div className="m-6">
      <h1 className="text-2xl">Order: {order.id}</h1>
      <p>Design Name: {design.name}</p>
      <p>Design Category: {design.category}</p>
      <div className="flex gap-8">
        <p>Size: {order.size}</p>
        <p>Clothsize: {order.cloth_size}</p>
      </div>
      <p>Status: {status}</p>
      <div>
        <p>Change Status:</p>
        <div className="flex gap-4">
          {status === 'REQUESTED' && (
            <>
              <button
                className="border px-4 py-4 rounded-md bg-green-200 hover:shadow-lg"
                onClick={handleAccept}
              >
                Accept
              </button>
              <button
                className="border px-4 py-4 rounded-md bg-red-200 hover:shadow-lg"
                onClick={handleReject}
              >
                Reject
              </button>
            </>
          )}

          {status === 'IN PROGRESS' && (
            <button
              className="border px-4 py-4 rounded-md bg-blue-200 hover:shadow-lg"
              onClick={handleComplete}
            >
              Mark Complete
            </button>
          )}

          {status === 'REJECTED' && <p>Order declined</p>}

          {status === 'COMPLETED' && <p>Order Completed</p>}
        </div>
      </div>
    </div>
  );
}
