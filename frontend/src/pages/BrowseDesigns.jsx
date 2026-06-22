import DesignCard from '../components/DesignCard.jsx';
import SearchDesigns from '../components/SearchDesigns.jsx';
import { useState, useEffect } from 'react';

export default function BrowseDesigns() {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    async function fetchDesigns() {
      const response = await fetch(`http://localhost:3000/designs`);
      const data = await response.json();

      setDesigns(data);
    }
    fetchDesigns();
  }, []);

  return (
    <div className="m-8">
      <h1 className="font-serif text-7xl">Cloud Tailor</h1>
      <p className="font-serif text-xl">Browse our most trending designs!</p>
      <SearchDesigns />
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
  );
}
