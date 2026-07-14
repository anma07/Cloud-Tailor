import { apiFetch } from '../api/api';
import Navbar from '../components/Navbar.jsx';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function OrderPage() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState(null);
  const [design, setDesign] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      const response = await apiFetch(`http://localhost:3000/orders/${id}`);
      const data = await response.json();
      console.log(data);
      setOrder(data);
    }
    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (!order) return;
    async function fetchAddress() {
      const response = await apiFetch(
        `http://localhost:3000/address/${order.address_id}`,
      );
      const data = await response.json();
      setAddress(data);
    }
    fetchAddress();
  }, [order]);

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

  return (
    <>
      <Navbar />
      <div className="m-6 max-w-xl mx-auto bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
        {/* Success Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Your Order has been Placed!
          </h1>
        </div>

        {/* Order Specifications */}
        <div className="space-y-3 border-t border-gray-100 pt-4 text-sm">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Design Name:</span>{' '}
            {design.name}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Category:</span>{' '}
            {design.category}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Price:</span>{' '}
            <span className="font-bold text-purple-700">₹{order.total}</span>
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Estimated Time:</span>{' '}
            {design.days} days
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Size:</span>{' '}
            {order.size}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Cloth Size:</span>{' '}
            {order.cloth_size} square metres
          </p>
          <p className="text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-800">
              Address of Delivery:
            </span>{' '}
            {address ? address.value : 'Loading Address...'}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">
              Mode of Payment:
            </span>{' '}
            <span className="inline-block bg-gray-100 px-2 py-0.5 rounded text-xs font-medium text-gray-700">
              {order.payment_mode}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
