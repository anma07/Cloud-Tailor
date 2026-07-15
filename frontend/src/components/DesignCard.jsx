import { Link } from 'react-router-dom';

export default function DesignCard({ id, name, category, price, imgsrc }) {
  return (
    <Link to={`/designs/${id}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/60">
        <div className="relative aspect-square w-full overflow-hidden border-b border-gray-100">
          <img
            src={`http://localhost:3000${imgsrc}`}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 rounded-md bg-white/90 backdrop-blur-sm border border-purple-100 px-2.5 py-1 text-sm font-semibold tracking-wider text-purple-600 uppercase shadow-sm">
            {category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold tracking-tight text-gray-800 transition duration-200 group-hover:text-purple-600">
            {name}
          </h3>
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Price
            </span>
            <span className="text-xl font-black text-purple-600">₹{price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
