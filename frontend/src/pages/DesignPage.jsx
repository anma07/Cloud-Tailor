import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function DesignPage() {
  const { id } = useParams();
  const [design, setDesign] = useState(null);

  useEffect(() => {
    async function fetchDesign() {
      const response = await fetch(`http://localhost:3000/designs/${id}`);
      const data = await response.json();

      setDesign(data);
    }
    fetchDesign();
  }, [id]);

  if (!design) {
    return <p>Loading Design...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col mt-10">
      <h1 className="text-4xl">Design Name: {design.name}</h1>
      <h2 className="text-2xl">Category: {design.category}</h2>
      <img
        src={`http://localhost:3000${design.imgsrc}`}
        alt={design.name}
        className="h-150 w-150 mx-auto"
      />
      <h1 className="text-4xl">Price: ₹{design.price}</h1>
      <div className="flex items-center gap-6 mx-auto">
        <Link to={`/designs/${id}/create-order`}>
          <button className="w-50 border px-4 py-4 mt-4 hover:bg-gray-200">
            Buy Now
          </button>
        </Link>
        <button className="w-50 border px-4 py-4 mt-4 hover:bg-gray-200">
          Add to favourites
        </button>
      </div>
    </div>
  );
}
