import React, { useState, useEffect } from 'react'
import SearchForm from './components/SearchForm'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleNameChange = (e) => {
    console.log(e.target.value)
    setCountryName(e.target.value)
  }

  const handleShowButton = (country) => {
    setCountryName(country)
  }


  return (
    <div>
      <SearchForm countryName={countryName} handleNameChange={handleNameChange} />
      <Countries countries={countries.filter((country) => country.name.toUpperCase().includes(countryName.toUpperCase()))} handleShowButton={handleShowButton} />

    </div>
  )
}

export default App