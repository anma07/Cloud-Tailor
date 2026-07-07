import { apiFetch } from '../api/api';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function DesignPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { id } = useParams();
  const [design, setDesign] = useState(null);
  const navigate = useNavigate();

  async function handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this design?',
    );

    if (!confirmed) {
      return;
    }

    const response = await apiFetch(`http://localhost:3000/designs/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      alert('Design deleted successfully.');
      navigate('/designs');
    } else {
      alert('Failed to delete design.');
    }
  }

  async function handleAddFav() {
    const design = {
      designId: id,
    };

    const response = await apiFetch(`http://localhost:3000/favourites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(design),
    });

    if (response.ok) {
      alert('Added to favourites!');
    } else {
      alert('Failed to add to favourites.');
    }
  }

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
        {user?.role === 'customer' && (
          <button
            className="w-50 border px-4 py-4 mt-4 hover:bg-gray-200"
            onClick={handleAddFav}
          >
            Add to Favourites
          </button>
        )}
        {user?.role === 'tailor' && (
          <button
            className="w-50 border px-4 py-4 mt-4 hover:bg-gray-200"
            onClick={handleDelete}
          >
            Delete Design
          </button>
        )}
      </div>
    </div>
  );
}
