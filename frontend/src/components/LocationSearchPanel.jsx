import React from "react";

const LocationSearchPanel = (props) => {
  // const locations = [
  //   "56A East Park New Collectorate Gwalior",
  //   "12, Shree Nagar,Pune",
  //   "5, Lajpat Road,Delhi",
  //   "44, Rama Colony, Jabalpur",
  // ];
  const handleSuggestionClick = (suggestion)=>{
     if(props.activeField === "pickup"){
        props.setPickup(suggestion)
     }
     else if(props.activeField === "destination"){
        props.setDestination(suggestion)
     }

  }
  return (
    <div>
      {props.suggestions.map((el, idx) => (
        
          <div onClick={()=>handleSuggestionClick(el)} key={idx} className="flex border-2 p-3 border-gray-50 active:border-black rounded-lg items-center justify-start gap-4 my-2">
            <h2 className="bg-[#eee] w-12 h-7 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{el}</h4>
          </div>
        ))
      }
    </div>
  );
};

export default LocationSearchPanel;
