
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios";

// function App() {
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [states, setStates] = useState([]);
//   const [selectedState, setSelectedState] = useState("");
//   const [cities, setCities] = useState([]);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [statedisable,setStatedisable]=useState(true);
//   const [citydisable,setCitydisable]=useState(true);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       const res = await fetch("https://crio-location-selector.onrender.com/countries");
//       const data = await res.json();
//       setCountries(data);
//     };

//     fetchCountries();
//   }, []);

//   const handleCountryChange = async (e) => {
//     const country = e.target.value;
//     setSelectedCountry(country);
//     setStatedisable(false)
//     try{
//     const res = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
//     if (!res.ok)
//       {
//         throw new Error ("fail to fetch states")
//       }
//     const data = await res.json();
//     setStates(data);
//     setSelectedState("");
//     setCities([]);
//     }
//     catch(e){
//       console.error("Network error",e)
//     }
//   };

//   const handleStateChange = async (e) => {
//     const stateValue = e.target.value;
//     setSelectedState(stateValue);
//     setCitydisable(false)
    
//     try{
//     const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${stateValue}/cities`);
//     if (!res.ok)
//     {
//       throw new Error ("fail to fetch states")
//     }
//     const data = await res.json();
//     setCities(data);
  
//     setSelectedCity("");
//     }
//     catch(e){
//       console.error("Network error",e)
//     }
//   };

//   const handleCityChange = (e) => {
//     setSelectedCity(e.target.value);
//   };

//   return (
//     <div className="App">
//       <h1>Select Location</h1>
     
//         <select onChange={handleCountryChange} value={selectedCountry}>
//           <option value="">Select a Country</option>
//           {countries.map((item) => (
//             <option value={item} key={item}>{item}</option>
//           ))}
//         </select>
      

     
//         <select disabled={statedisable} onChange={handleStateChange} value={selectedState}>
//           <option value="">Select State</option>
//           {states.map((item) => (
//             <option value={item} key={item}>{item}</option>
//           ))}
//         </select>
      
        
      

     
//         <select disabled={citydisable} onChange={handleCityChange} value={selectedCity}>
//           <option value="">Select City</option>
//           {cities.map((item) => (
//             <option value={item} key={item}>{item}</option>
//           ))}
//         </select>
      

//       {selectedCountry && selectedState && selectedCity && (
//         <h4>You Selected{selectedCountry} , <span style={{"color":"grey"}}>{selectedState} , {selectedCity} </span></h4>
//       )}
//     </div>
//   );




const App = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        )
        .then((response) => {
          setStates(response.data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        )
        .then((response) => {
          setCities(response.data);
          setSelectedCity("");
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className='App'>
      <h1>Select Location</h1>
      <select
        className="dropdown"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="" disabled>
          Select Country
        </option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        className="dropdown"
        disabled={!selectedCountry}
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="" disabled>
          Select State
        </option>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select
        className="dropdown"
        disabled={!selectedState}
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="" disabled>
          Select City
        </option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      {selectedCity && (
        <h2 className="result">
          You selected <span className="highlight">{selectedCity}</span>,{" "}
          <span className="fade">
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
};





export default App;
