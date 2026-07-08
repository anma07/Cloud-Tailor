import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchDesigns() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function handleSearch() {
    navigate(`/designs?search=${search}`);
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <input
        className="block w-full max-w-lg border rounded-l-lg px-4 py-2"
        type="text"
        placeholder="Search Designs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="block border px-4 py-2 rounded-r-lg hover:bg-gray-200"
        onClick={handleSearch}
      >
        Search
      </button>
      <FilterDropdown />
    </div>
  );
}

export function FilterDropdown() {
  const navigate = useNavigate();

  function handleChange(e) {
    const value = e.target.value;
    switch (value) {
      case 'T-Shirts':
      case 'Jackets':
      case 'Dresses':
      case 'Tops':
      case 'Kurta':
      case 'Skirts':
        navigate(`/designs?category=${value}`);
        break;

      case 'price_asc':
      case 'price_desc':
      case 'range_500':
      case 'range_500-1000':
      case 'range_1000':
        navigate(`/designs?sort=${value}`);
        break;

      case 'trending':
        navigate(`/designs?trending=true`);
        break;

      case 'none':
        navigate(``);
        break;
    }
  }

  return (
    <select
      className="border rounded-lg px-3 py-2 m-2"
      defaultValue=""
      onChange={handleChange}
    >
      <option value="" disabled>
        Filter
      </option>
      <option value="none">None</option>
      <option value="trending">Trending</option>
      <optgroup label="Category">
        <option value="T-Shirts">T-Shirts</option>
        <option value="Jackets">Jackets</option>
        <option value="Dresses">Dresses</option>
        <option value="Tops">Tops</option>
        <option value="Kurta">Kurta</option>
        <option value="Skirts">Skirts</option>
      </optgroup>
      <optgroup label="Price">
        <option value="price_asc">Low to High</option>
        <option value="price_desc">High to Low</option>
        <option value="range_500">Below 500</option>
        <option value="range_500-1000">Between 500-1000</option>
        <option value="range_1000">Over 1000</option>
      </optgroup>
    </select>
  );
}
