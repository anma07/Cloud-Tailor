import DesignCard from '../components/DesignCard.jsx';
import SearchDesigns from '../components/SearchDesigns.jsx';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function BrowseDesigns() {
  const [designs, setDesigns] = useState([]);
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  const search = searchParams.get("search");

  useEffect(() => {
    let url = 'http://localhost:3000/designs';

    if (category) {
      url += `?category=${category}`;
    }

    if (sort) {
      url += `?sort=${sort}`;
    }

    if(search){
      url += `?search=${search}`
    }

    async function fetchDesigns() {
      const response = await fetch(url);
      const data = await response.json();

      setDesigns(data);
    }
    fetchDesigns();
  }, [category, sort, search]);

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
