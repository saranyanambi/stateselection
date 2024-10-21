
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [statedisable,setStatedisable]=useState(true);
  const [citydisable,setCitydisable]=useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch("https://crio-location-selector.onrender.com/countries");
      const data = await res.json();
      setCountries(data);
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setStatedisable(false)
    try{
    const res = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
    if (!res.ok)
      {
        throw new Error ("fail to fetch states")
      }
    const data = await res.json();
    setStates(data);
    setSelectedState("");
    setCities([]);
    }
    catch(e){
      console.error("Network error",e)
    }
  };

  const handleStateChange = async (e) => {
    const stateValue = e.target.value;
    setSelectedState(stateValue);
    setCitydisable(false)
    
    try{
    const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${stateValue}/cities`);
    if (!res.ok)
    {
      throw new Error ("fail to fetch states")
    }
    const data = await res.json();
    setCities(data);
  
    setSelectedCity("");
    }
    catch(e){
      console.error("Network error",e)
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="App">
      <h1>Select Location</h1>
     
        <select onChange={handleCountryChange} value={selectedCountry}>
          <option value="">Select a Country</option>
          {countries.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
      

     
        <select disabled={statedisable} onChange={handleStateChange} value={selectedState}>
          <option value="">Select State</option>
          {states.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
      
        
      

     
        <select disabled={citydisable} onChange={handleCityChange} value={selectedCity}>
          <option value="">Select City</option>
          {cities.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
      

      {selectedCountry && selectedState && selectedCity && (
        <h4>You Selected {selectedCity} ,<span style={{"color":"grey"}}>{selectedState} ,{selectedCountry} </span></h4>
      )}
    </div>
  );



}

export default App;
// const App = () => {
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://crio-location-selector.onrender.com/countries")
//       .then((response) => {
//         setCountries(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching countries:", error);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedCountry) {
//       axios
//         .get(
//           `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
//         )
//         .then((response) => {
//           setStates(response.data);
//           setSelectedState("");
//           setCities([]);
//           setSelectedCity("");
//         })
//         .catch((error) => {
//           console.error("Error fetching states:", error);
//         });
//     }
//   }, [selectedCountry]);

//   useEffect(() => {
//     if (selectedCountry && selectedState) {
//       axios
//         .get(
//           `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
//         )
//         .then((response) => {
//           setCities(response.data);
//           setSelectedCity("");
//         })
//         .catch((error) => {
//           console.error("Error fetching cities:", error);
//         });
//     }
//   }, [selectedCountry, selectedState]);

//   return (
//     <div className='App'>
//       <h1>Select Location</h1>
//       <select
//         className="dropdown"
//         value={selectedCountry}
//         onChange={(e) => setSelectedCountry(e.target.value)}
//       >
//         <option value="" disabled>
//           Select Country
//         </option>
//         {countries.map((country, index) => (
//           <option key={index} value={country}>
//             {country}
//           </option>
//         ))}
//       </select>
//       <select
//         className="dropdown"
//         disabled={!selectedCountry}
//         value={selectedState}
//         onChange={(e) => setSelectedState(e.target.value)}
//       >
//         <option value="" disabled>
//           Select State
//         </option>
//         {states.map((state, index) => (
//           <option key={index} value={state}>
//             {state}
//           </option>
//         ))}
//       </select>
//       <select
//         className="dropdown"
//         disabled={!selectedState}
//         value={selectedCity}
//         onChange={(e) => setSelectedCity(e.target.value)}
//       >
//         <option value="" disabled>
//           Select City
//         </option>
//         {cities.map((city, index) => (
//           <option key={index} value={city}>
//             {city}
//           </option>
//         ))}
//       </select>
//       {selectedCity && (
//         <h2 className="result">
//           You selected <span className="highlight">{selectedCity}</span>,{" "}
//           <span className="fade">
//             {" "}
//             {selectedState}, {selectedCountry}
//           </span>
//         </h2>
//       )}
//     </div>
//   );
// };





// export default App;



// import React, { useState, useEffect } from "react";
// import "./App.css"

// function App() {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");

//   // fetch countries on component load
//   useEffect(() => {
//     fetch("https://crio-location-selector.onrender.com/countries")
//       .then((response) => response.json())
//       .then((data) => {
//         setCountries(data); 
//       })
//       .catch((error) => console.error("Error fetching countries:", error));
//   }, []);

//   // fetch states when a country is selected
//   useEffect(() => {
//     if (selectedCountry) {
//       fetch(
//         `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           setStates(data); 
//           // clear cities when country changes
//           setCities([]); 
//           // reset selected city
//           setSelectedCity(""); 
//         })
//         .catch((error) => console.error("Error fetching states:", error));
//     }
//   }, [selectedCountry]);

//   // fetch cities when a state is selected
//   useEffect(() => {
//     if (selectedState) {
//       fetch(
//         `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           setCities(data); 
//         })
//         .catch((error) => console.error("Error fetching cities:", error));
//     }
//   }, [selectedState]);

//   const handleCountryChange = (e) => {
//     setSelectedCountry(e.target.value);
//     // reset state when country changes
//     setSelectedState(""); 
//     // reset cities when country changes
//     setCities([]); 
//   };

//   const handleStateChange = (e) => {
//     setSelectedState(e.target.value);
//     // reset city when state changes
//     setSelectedCity(""); 
//   };

//   const handleCityChange = (e) => {
//     setSelectedCity(e.target.value);
//   };

//   return (
//     <div>
//       <h1>Location Selector</h1>

//       <label htmlFor="country">Select Country:</label>
//       <select
//         id="country"
//         value={selectedCountry}
//         onChange={handleCountryChange}
//       >
//         <option value="">Select Country</option>
//         {countries.map((country) => (
//           <option key={country} value={country}>
//             {country}
//           </option>
//         ))}
//       </select>

//       <label htmlFor="state">Select State:</label>
//       <select
//         id="state"
//         value={selectedState}
//         onChange={handleStateChange}
//         disabled={!selectedCountry}
//       >
//         <option value="">Select State</option>
//         {states.map((state) => (
//           <option key={state} value={state}>
//             {state}
//           </option>
//         ))}
//       </select>

//       <label htmlFor="city">Select City:</label>
//       <select
//         id="city"
//         value={selectedCity}
//         onChange={handleCityChange}
//         disabled={!selectedState}
//       >
//         <option value="">Select City</option>
//         {cities.map((city) => (
//           <option key={city} value={city}>
//             {city}
//           </option>
//         ))}
//       </select>

//       {selectedCountry && selectedState && selectedCity && (
//         <h4>
//           You selected {selectedCity}, {selectedState}, {selectedCountry}
//         </h4>
//       )}
//     </div>
//   );
// }

// export default App;
