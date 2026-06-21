import { DesignsArray } from '../Designs.js';

export function OrderPage({ id, address, size, clothSize, mode }) {
  return (
    <div>
      <h1>Your Order has been Placed!</h1>
      <p>Design Name: {DesignsArray[id].name}</p>
      <p>Category: {DesignsArray[id].category}</p>
      <p>Price: {DesignsArray[id].price}</p>
      <p>Estimated Days: {DesignsArray[id].days}</p>
      <p>Size: {size}</p>
      <p>Cloth Size: {clothSize}</p>
      <p>Address of Delivery: {address}</p>
      <p>Mode of Payment: {mode}</p>
    </div>
  );
}
