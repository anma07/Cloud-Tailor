import { AddressArray } from '../Address.js';
import { DesignsArray } from '../Designs.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function OrderPage() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      const response = await fetch(`http://localhost:3000/orders/${id}`);
      const data = await response.json();
      console.log(data);
      setOrder(data);
    }
    fetchOrder();
  }, [id]);

  if (!order) {
    return <p>Error: Order not found</p>;
  }

  return (
    <div className="m-6">
      <h1 className="text-2xl">Your Order has been Placed!</h1>
      <p>Design Name: {DesignsArray[order.designId].name}</p>
      <p>Category: {DesignsArray[order.designId].category}</p>
      <p>Price: {order.total}</p>
      <p>Estimated Time: {DesignsArray[order.designId].days} days</p>
      <p>Size: {order.size}</p>
      <p>Cloth Size: {order.clothSize} square metres</p>
      <p>Address of Delivery: {AddressArray[order.addressId].value}</p>
      <p>Mode of Payment: {order.paymentMode}</p>
    </div>
  );
}
