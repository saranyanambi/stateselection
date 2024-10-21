
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

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
        <h4>You Selected{selectedCountry} , <span style={{"color":"grey"}}>{selectedState} , {selectedCity} </span></h4>
      )}
    </div>
  );
}

export default App;
