import { useState } from 'react';

export default function NewDesign() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [days, setDays] = useState('');

  async function handleSubmit() {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('days', days);

    const response = await fetch(`http://localhost:3000/designs`, {
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
        <option value="T-Shirts">T-Shirts</option>
        <option value="Jacket">Jacket</option>
        <option value="Dress">Dress</option>
        <option value="Tops">Tops</option>
        <option value="Kurta">Kurta</option>
        <option value="Skirt">Skirt</option>
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
      <button
        className="border px-4 py-4 rounded w-100 hover:shadow-lg mt-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
