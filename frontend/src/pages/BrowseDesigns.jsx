import DesignCard from '../components/DesignCard.jsx';
import Navbar from '../components/Navbar.jsx';
import SearchDesigns from '../components/SearchDesigns.jsx';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function BrowseDesigns() {
  const [designs, setDesigns] = useState([]);
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  const search = searchParams.get('search');
  const trending = searchParams.get('trending');

  useEffect(() => {
    let url = 'http://localhost:3000/designs';

    if (category) {
      url += `?category=${category}`;
    }

    if (sort) {
      url += `?sort=${sort}`;
    }

    if (search) {
      url += `?search=${search}`;
    }

    if (trending) {
      url += `?trending=true`;
    }

    async function fetchDesigns() {
      const response = await fetch(url);
      const data = await response.json();

      setDesigns(data);
    }
    fetchDesigns();
  }, [category, sort, search, trending]);

  return (
    <>
      <Navbar />
      <div className="m-8 max-w-7xl mx-auto px-4">
        <p className="text-2xl font-bold text-gray-900 tracking-tight mb-4">
          Browse our most trending designs!
        </p>
        <div className="mb-8">
          <SearchDesigns />
        </div>
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
