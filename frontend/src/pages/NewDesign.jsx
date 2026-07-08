import { apiFetch } from '../api/api';
import { useState } from 'react';

export default function NewDesign() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [days, setDays] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    if (name === ''){
      setError("Pls add a name");
      return;
    }

    if(category===''){
      setError("Pls add a category");
      return;
    }

    if(!image){
      setError("Pls add an image");
      return;
    }

    if(Number(price) === 0){
      setError("Pls set a price");
      return;
    }

    if(days === ''){
      setError("Pls add days");
      return;
    }

    setError('')

    const confirmed = window.confirm(
      'Confirm the design',
    );

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
    } else {
      alert('Failed to create new design');
    }
  }

  return (
    <div className="flex flex-col m-6">
      <label>Enter Design Name:</label>
      <input
        className="border w-100 rounded-md"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Select Category: </label>
      <select
        className="border w-100 rounded-md"
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
      <label>Upload an image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <label>Set Base Price: </label>
      <input
        className="border w-100 rounded-md"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <label>Days Required: </label>
      <input
        className="border w-100 rounded-md"
        type="text"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        required
      />
      {error && <p className="text-md text-red-500">{error}</p>}
      <button
        className="border px-4 py-4 rounded w-100 hover:shadow-lg mt-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
