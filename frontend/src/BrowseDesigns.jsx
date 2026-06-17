import DesignCard from './components/DesignCard.jsx'
import SearchDesigns from './components/SearchDesigns.jsx'
import {DesignsArray} from './Designs.js'

export default function BrowseDesigns(){
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
                {DesignsArray.map((design)=>(
                    <DesignCard name={design.name} category={design.category} imgsrc={design.imgsrc} price={design.price} />
                ))}
            </div>
        </div>
    );
}