import { apiFetch } from '../api/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewDesign() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [days, setDays] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    if (name === '') {
      setError('Pls add a name');
      return;
    }

    if (category === '') {
      setError('Pls add a category');
      return;
    }

    if (!image) {
      setError('Pls add an image');
      return;
    }

    if (Number(price) === 0) {
      setError('Pls set a price');
      return;
    }

    if (days === '') {
      setError('Pls add days');
      return;
    }

    setError('');

    const confirmed = window.confirm('Confirm the design');

    if (!confirmed) {
      return;
    }

    const formData = new FormData();
    const token = localStorage.getItem('token');
    formData.append('name', name);
    formData.append('category', category);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('days', days);

    const response = await apiFetch(`http://localhost:3000/designs`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('New Design Created');
      navigate('/designs');
    } else {
      alert('Failed to create new design');
    }
  }

  return (
    <div className="flex flex-col m-6 max-w-md mx-auto bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">
        Add New Design
      </h1>

      <label className="text-sm font-semibold text-gray-700 mb-1">
        Enter Design Name:
      </label>
      <input
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition mb-4"
        type="text"
        placeholder="e.g. Traditional Warli Motif Kurta"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label className="text-sm font-semibold text-gray-700 mb-1">
        Select Category:{' '}
      </label>
      <select
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="" disabled>
          Select Category
        </option>
        <option value="T-Shirts">T-Shirts</option>
        <option value="Jackets">Jackets</option>
        <option value="Dresses">Dresses</option>
        <option value="Tops">Tops</option>
        <option value="Kurta">Kurta</option>
        <option value="Skirts">Skirts</option>
      </select>

      <label className="text-sm font-semibold text-gray-700 mb-1">
        Upload an image:
      </label>
      <input
        type="file"
        accept="image/*"
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition cursor-pointer mb-4"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <label className="text-sm font-semibold text-gray-700 mb-1">
        Set Base Price:{' '}
      </label>
      <input
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition mb-4"
        type="number"
        placeholder="₹"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <label className="text-sm font-semibold text-gray-700 mb-1">
        Days Required:{' '}
      </label>
      <input
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition mb-4"
        type="text"
        placeholder="e.g. 7"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        required
      />

      {error && (
        <p className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 my-2">
          {error}
        </p>
      )}

      <button
        className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-purple-100 transition hover:bg-purple-700 hover:scale-[1.01] active:scale-[0.99] mt-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
