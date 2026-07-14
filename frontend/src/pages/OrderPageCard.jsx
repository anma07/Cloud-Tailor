import { apiFetch } from '../api/api';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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
    <div className="m-6 max-w-xl mx-auto bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Order: #{order.id}
      </h1>
      <p className="text-sm text-gray-600 mb-2">
        <span className="font-semibold text-gray-800">Design Name:</span>{' '}
        {design.name}
      </p>
      <p className="text-sm text-gray-600 mb-3">
        <span className="font-semibold text-gray-800">Design Category:</span>{' '}
        {design.category}
      </p>
      <div className="flex gap-8 mb-4 border-y border-gray-50 py-2.5">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Size:</span>{' '}
          {order.size}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Clothsize:</span>{' '}
          {order.cloth_size} sq. m
        </p>
      </div>
      <p className="text-sm font-semibold text-gray-800 mb-4">
        Status:{' '}
        <span className="ml-1 inline-block px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-purple-50 text-purple-700 border border-purple-100">
          {status}
        </span>
      </p>
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          Change Status:
        </p>
        <div className="flex gap-4">
          {status === 'REQUESTED' && (
            <>
              <button
                className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 transition hover:bg-emerald-600 hover:text-white hover:border-transparent hover:shadow-md"
                onClick={handleAccept}
              >
                Accept
              </button>
              <button
                className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-rose-50 border border-rose-200 text-rose-600 transition hover:bg-rose-600 hover:text-white hover:border-transparent hover:shadow-md"
                onClick={handleReject}
              >
                Reject
              </button>
            </>
          )}

          {status === 'IN PROGRESS' && (
            <button
              className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-purple-600 text-white transition hover:bg-purple-700 hover:shadow-md"
              onClick={handleComplete}
            >
              Mark Complete
            </button>
          )}

          {status === 'REJECTED' && (
            <p className="text-sm font-medium text-rose-600 bg-rose-50/50 border border-rose-100 px-3 py-1.5 rounded-lg">
              Order declined
            </p>
          )}

          {status === 'COMPLETED' && (
            <p className="text-sm font-medium text-emerald-600 bg-emerald-50/50 border border-emerald-100 px-3 py-1.5 rounded-lg">
              Order Completed
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
