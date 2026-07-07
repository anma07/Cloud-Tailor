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

  return (
    <>
    <Navbar />
    <div className="m-8">
      <h1 className="font-serif text-4xl">Your Favourite Designs:</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 m-6">
        {designs.map((design) => (
          <DesignCard
            key={design.id}
            id={design.id}
            name={design.name}
            category={design.category}
            imgsrc={design.imgsrc}
            price={design.price}
          />
        ))}
      </div>
    </div>
    </>
  );
}
