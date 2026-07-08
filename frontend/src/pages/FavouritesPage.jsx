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
      <div className="m-8">
        <h1 className="font-serif text-4xl">Your Favourite Designs:</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 m-6">
          {designs.map((design) => (
            <div key={design.id}>
              <DesignCard
                id={design.id}
                name={design.name}
                category={design.category}
                imgsrc={design.imgsrc}
                price={design.price}
              />
              <button
                className="border px-2 py-2 mt-2 rounded hover:bg-purple-100"
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
