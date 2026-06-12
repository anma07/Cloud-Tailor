export default function DesignCard({name, category, price, imgsrc}){
    return(
        <div className="border content-center rounded-md">
            <h3 className="m-1 text-xl bg-purple-100 px-2 py-2 rounded">{name}</h3>
            <img src={imgsrc} alt={name} className="h-48 w-48" />
            <p className="m-2">Category: {category}</p>
            <h3 className="font-serif m-2 text-xl border px-2 py-2">Price: ₹{price}</h3>
        </div>
    );
}