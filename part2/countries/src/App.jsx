import { useState } from 'react'
import { useEffect } from 'react'

import axios from 'axios'

// import './App.css
// '
const Filter =({sName,handlesNameChange}) =>
  (
    <div> filter shown with<input value = {sName} onChange={handlesNameChange}/></div>
  )

const Countries = ({countryToShow, setsName,setLanguages,countryDetailsOf,bCountry})=>{
  if(countryToShow.length>=10){
    return <div>Too many matches,specify another filter</div>
  }

  if(bCountry!=null){
    console.log(bCountry)
    const languages = Object.values(bCountry.languages)
    console.log(languages)
    
    return (
      <>
      <h1>{bCountry.name.common}</h1>
      <p>capital {bCountry.capital}</p>
      <p>area {bCountry.area}</p>
      <h3>languages:</h3>
      <ul>
      {languages.map((item,index)=>
        <li key={index} >{item}</li>
      )}

      </ul>
      <img src={bCountry.flags.png}/>
      </>
    )

  }

  if(countryToShow.length==1){
    const languages = Object.values(countryToShow[0].languages)
    console.log(languages)
    
    return (
      <>
      <h1>{countryToShow[0].name.common}</h1>
      <p>capital {countryToShow[0].capital}</p>
      <p>area {countryToShow[0].area}</p>
      <h3>languages:</h3>
      <ul>
      {languages.map((item,index)=>
        <li key={index} >{item}</li>
      )}

      </ul>
      <img src={countryToShow[0].flags.png}/>
      </>
    )
  }
 
  return(
  <ul>
    {
      countryToShow.map(country=>
        <Country key={country.name.common} country ={country} setsName={setsName} countryDetails={()=>countryDetailsOf(country)}/>
      )
      
    }
  </ul>
  )
}
const Country=({country,setsName,countryDetails})=>{
 

  return(
    <>
    <li >{country.name.common}<button onClick={countryDetails}>Button</button></li>
    
    </>
  )
 
 
}

const App=() => {

 
  const [countries, setCountries] = useState([]) 
  const [sName, setsName] = useState('')
  const [sLanguages,setLanguages] = useState([]) 
  const [bCountry,setBCountry] = useState(null)
  const handlesNameChange =(event) =>{
    setsName(event.target.value)
    setBCountry(null)
   
  }
  const countryDetailsOf = country =>{
    
    console.log(country.name.common)
    setBCountry(country)
    

  }

 
 
  const countryToShow = countries.filter(country => country.name.common.toLowerCase().includes(sName.toLowerCase()))
  const hook = () => {
    console.log('effect')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])
  // console.log(countries)
  // console.log(sLanguages)
  return (
    <>
    <Filter sName={sName} handlesNameChange={handlesNameChange} />
    <Countries countryToShow={countryToShow} setsName={setsName} setLanguages={setLanguages} countryDetailsOf={countryDetailsOf}bCountry={bCountry}/>
    </>
  )
}

export default App
