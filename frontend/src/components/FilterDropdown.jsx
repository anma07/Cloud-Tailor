export default function FilterDropdown() {
  return (
    <select className="border rounded-lg px-3 py-2 m-2">
      <option value="" disabled>Filter</option>
      <option value="Trending">Trending</option>
      <optgroup label="Category">
        <option value="Kurta">Kurta</option>
        <option value="Dress">Dress</option>
        <option value="Tops">Tops</option>
        <option value="T-Shirts">T-Shirts</option>
        <option value="Blouse">Blouse</option>
      </optgroup>
      <option value="Price">Price</option>
    </select>
  );
}