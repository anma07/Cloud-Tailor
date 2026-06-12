export default function SelectAddress(){
    return(
        <div className="flex flex-col ml-6 mb-4">
            <p>Choose Your Address</p>
            <ShowAddress address="Address 1" />
            <ShowAddress address="Address 2" />
            <ShowAddress address="Address 3" />
            <p className="hover:text-blue-800 hover:underline">Or Add new Address</p>
        </div>
    );
}

export function ShowAddress({address}){
    return(
        <div>
            <input type="checkbox" className="rounded text-blue-500" />
            <label className="ml-4">{address}</label>
        </div>
    );
}