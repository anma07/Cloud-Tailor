import SelectAddress from './components/SelectAddress.jsx';
import MethodOfPayment from './components/MethodOfPayment.jsx';
import { useState } from "react";

export function CreateOrder(){
    return(
        <div className="border flex flex-col m-20 max-w-lg mx-auto bg-amber-100">
            <DesignSummary name="T-Shirt" category="T-Shirts" price="400" days="5-7" />
            <div className="flex">
                <SelectSize />
                <ClothSize />
            </div>
            <OrderSummary price="400" deliverycharges="100" />
            <SelectAddress />
            <MethodOfPayment />
        </div>
    );
}

export function SelectSize(){
    const [size, setSize] = useState("XS");
    return(
    <div className="flex flex-col mx-8">
        <label className="block text-black text-md font-bold m-2">
            Select Size:
        </label>
        <select 
            className="border rounded-lg px-3 py-2 m-2" 
            value={size}
            onChange={(e) => {
                setSize(e.target.value);
                }}>
            <option value="" disabled>
                Select Size
            </option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
        </select>
        <p>Your selected size is {size}</p>
    </div>
    );
}

export function ClothSize(){
    const [clothSize, setClothSize] = useState(0);
    return(
        <div>
            <label className="block text-black text-md font-bold m-2">
                Fabric Size Available
            </label>
            <input 
            className="block border rounded-md"
            value={clothSize}
            onChange={(e) =>{
                setClothSize(e.target.value)
                }}/>
            <p className="text-gray-500">(in sq metres)</p>
            <p>You have {clothSize} square metres of cloth</p>
        </div>
    );
}

export function DesignSummary({name, category, price, days}){
    return(
        <div className="block m-4">
            <h2 className="font-serif text-2xl">Design Summary</h2>
            <p className="m-2">Design: {name}</p>
            <p className="m-2">Category: {category}</p>
            <p className="m-2">Base Price: ₹{price}</p>
            <p className="m-2">Estimated time: {days} days</p>   
        </div>
    );
}

export function OrderSummary({price, deliverycharges}){
    const total = Number(price) + Number(deliverycharges);
    return(
        <div className="block m-4">
            <h2 className="font-serif text-xl">Order Summary</h2>
            <p className="m-2">Base Price: ₹{price}</p>
            <p className="m-2">Delivery Charges: ₹{deliverycharges}</p>
            <p className="m-2">Total: ₹{total}</p>
        </div>
    );
}
