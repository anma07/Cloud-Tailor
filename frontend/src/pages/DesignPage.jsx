import { DesignsArray } from '../Designs.js';
import { useParams } from 'react-router-dom';

export default function DesignPage() {
  const { id } = useParams();
  console.log(id);
  console.log(DesignsArray);
  return (
    <div className="max-w-7xl mx-auto flex flex-col mt-10">
      <h1 className="text-4xl">Design Name: {DesignsArray[id].name}</h1>
      <h2 className="text-2xl">Category: {DesignsArray[id].category}</h2>
      <img
        src={DesignsArray[id].imgsrc}
        alt={DesignsArray[id].name}
        className="h-150 w-150 mx-auto"
      />
      <h1 className="text-4xl">Price: ₹{DesignsArray[id].price}</h1>
      <div className="flex items-center gap-6 mx-auto">
        <button className="w-50 border px-4 py-4 mt-4 hover:bg-gray-200">
          Buy Now
        </button>
        <button className="w-50 border px-4 py-4 mt-4 hover:bg-gray-200">
          Add to favourites
        </button>
      </div>
    </div>
  );
}
