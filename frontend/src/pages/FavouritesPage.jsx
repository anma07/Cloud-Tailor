import { apiFetch } from '../api/api';
import DesignCard from '../components/DesignCard.jsx';
import Navbar from '../components/Navbar.jsx';
import { useState, useEffect } from 'react';

export default function FavouritesPage() {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    async function fetchDesigns() {
      const response = await apiFetch(`http://localhost:3000/favourites`);
      const data = await response.json();

      setDesigns(data);
    }
    fetchDesigns();
  }, []);

  async function handleRemove(id) {
    const response = await apiFetch(`http://localhost:3000/favourites/${id}`, {
      method: 'DELETE',
    });

    console.log(response);

    if (response.ok) {
      alert('Removed from favourites');
      setDesigns((prev) => prev.filter((design) => design.id !== id));
    } else {
      alert('Failed to remove from favourites!');
      return;
    }
  }

  return (
    <>
      <Navbar />
      <div className="m-8 max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-6">
          Your Favourite Designs:
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-6">
          {designs.map((design) => (
            <div
              key={design.id}
              className="flex flex-col h-full justify-between bg-white rounded-xl"
            >
              <div className="flex-grow">
                <DesignCard
                  id={design.id}
                  name={design.name}
                  category={design.category}
                  imgsrc={design.imgsrc}
                  price={design.price}
                />
              </div>
              <button
                className="w-full mt-3 text-xs font-semibold py-2 px-3 rounded-lg text-rose-600 bg-rose-50 border border-rose-100 hover:bg-rose-600 hover:text-white hover:border-transparent transition duration-200"
                onClick={() => handleRemove(design.id)}
              >
                Remove from Favourites
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
