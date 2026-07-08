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
      <div className="m-6">
        <h1 className="text-2xl">Your Order has been Placed!</h1>
        <p>Design Name: {design.name}</p>
        <p>Category: {design.category}</p>
        <p>Price: {order.total}</p>
        <p>Estimated Time: {design.days} days</p>
        <p>Size: {order.size}</p>
        <p>Cloth Size: {order.cloth_size} square metres</p>
        <p>
          Address of Delivery: {address ? address.value : 'Loading Address...'}
        </p>
        <p>Mode of Payment: {order.payment_mode}</p>
      </div>
    </>
  );
}
