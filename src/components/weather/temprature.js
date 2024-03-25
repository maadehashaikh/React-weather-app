import React, { useEffect, useState } from 'react';
import './style.css'
import Weathercart from './weathercart';
const Temprature = () => {
  const [searchValue , setSearchValue] = useState("Kotri");
  const [tempInfo,setTempInfo] = useState({});

  const getWeatherInfo = async ()=>{
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=7c389f6914a6d7b34940ea543318648b`
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const {temp ,humidity ,pressure}= data.main;
      const {main:weathermood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country , sunset} = data.sys;
      const myNewWeatherInfo = {
       temp,humidity,pressure ,weathermood,speed ,country ,sunset
      }
      setTempInfo(myNewWeatherInfo);

    } catch (error) {
       console.log(error);
    }
  }
    useEffect(() => {
      getWeatherInfo();
    },[])
  
  return (
    <>
    <div className='wrap'>
      <div className='search'>
       <input type='search' placeholder="search..." id='search' className='searchTerm' value={searchValue} 
       onChange={(e)=>setSearchValue(e.target.value)}/>
       <button className='searchButton' type='button' onClick={getWeatherInfo}>Search </button>
       </div>
      </div>
      {/* Our tempearture card  */}
      <Weathercart tempInfo = {tempInfo}/>
    </>
    
  )
}

export default Temprature;
