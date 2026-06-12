import tshirtImg from './assets/image.png';

export function BrowseDesigns(){
    return (
        <div className="m-8">
            <h1 className="font-serif text-7xl">
                Cloud Tailor
            </h1>
            <p className="font-serif text-xl">
                Browse our most trending designs!
            </p>
            <SearchDesigns />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 m-6">
                <DesignCard name="Green T-Shirt" category="T-Shirts" imgsrc={tshirtImg} price="400"/>
                <DesignCard name="Green T-Shirt" category="T-Shirts" imgsrc={tshirtImg} price="400"/>
                <DesignCard name="Green T-Shirt" category="T-Shirts" imgsrc={tshirtImg} price="400"/>
                <DesignCard name="Green T-Shirt" category="T-Shirts" imgsrc={tshirtImg} price="400"/>
                <DesignCard name="Green T-Shirt" category="T-Shirts" imgsrc={tshirtImg} price="400"/>
                <DesignCard name="Green T-Shirt" category="T-Shirts" imgsrc={tshirtImg} price="400"/>
                <DesignCard name="Green T-Shirt" category="T-Shirts" imgsrc={tshirtImg} price="400"/>
                <DesignCard name="Green T-Shirt" category="T-Shirts" imgsrc={tshirtImg} price="400"/>
                <DesignCard name="Green T-Shirt" category="T-Shirts" imgsrc={tshirtImg} price="400"/>
                <DesignCard name="Green T-Shirt" category="T-Shirts" imgsrc={tshirtImg} price="400"/>
            </div>
        </div>
    );
}

export function SearchDesigns(){
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

export function FilterDropdown() {
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

export function DesignCard({name, category, price, imgsrc}){
    return(
        <div className="border content-center rounded-md">
            <h3 className="m-1 text-xl bg-purple-100 px-2 py-2 rounded">{name}</h3>
            <img src={imgsrc} alt={name} className="h-48 w-48" />
            <p className="m-2">Category: {category}</p>
            <h3 className="font-serif m-2 text-xl border px-2 py-2">Price: ₹{price}</h3>
        </div>
    );
}