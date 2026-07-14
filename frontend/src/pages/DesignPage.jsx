import { apiFetch } from '../api/api';
import Navbar from '../components/Navbar.jsx';
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
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 px-4 md:px-8 py-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-2 shadow-sm">
            <img
              src={`http://localhost:3000${design.imgsrc}`}
              alt={design.name}
              className="w-full aspect-square object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col h-full justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-2">
              {design.category}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {design.name}
            </h1>

            <div className="h-[1px] w-full bg-gray-200 my-6" />
            <div className="flex flex-col gap-1 mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Price
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900">
                ₹{design.price}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <Link
                to={`/designs/${id}/create-order`}
                className="w-full sm:flex-1"
              >
                <button className="w-full rounded-xl bg-purple-600 py-4 font-semibold text-white shadow-md shadow-purple-200 transition-all duration-200 hover:bg-purple-700 hover:scale-[1.01] active:scale-[0.99]">
                  Buy Now
                </button>
              </Link>

              {user?.role === 'customer' && (
                <button
                  className="w-full sm:flex-1 rounded-xl border border-purple-200 bg-purple-50 py-4 font-semibold text-purple-700 transition-all duration-200 hover:bg-purple-100"
                  onClick={handleAddFav}
                >
                  Add to Favourites
                </button>
              )}

              {user?.role === 'tailor' && (
                <button
                  className="w-full sm:flex-1 rounded-xl border border-red-200 bg-red-50 py-4 font-semibold text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white"
                  onClick={handleDelete}
                >
                  Delete Design
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
