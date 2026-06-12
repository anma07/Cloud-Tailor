import FilterDropdown from './FilterDropdown.jsx';

export default function SearchDesigns(){
    return(
        <div className="flex items-center justify-center mt-20">
            <input className="block w-full max-w-lg border rounded-l-lg px-4 py-2" type="text" placeholder="Search Designs..." />
            <button className="block border px-4 py-2 rounded-r-lg hover:bg-gray-200">
                Search
            </button>
            <FilterDropdown />
        </div>
    );
}