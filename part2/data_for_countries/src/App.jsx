import { useState, useEffect } from 'react'
import countriesService from './services/countriesService'
import CountryDisplay from './components/CountryDisplay'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToDisplay, setCountriesToDisplay] = useState([])
  const [input, setInput] = useState('')

  // get all country data when page loads
  useEffect(() => {
    const newCountriesList = []

    countriesService
      .getAll()
      .then(returnedCountries => {
        for (const country of returnedCountries)
        newCountriesList.push(country)
      })
      
      setCountries(newCountriesList)
      console.log(countries)
      console.log('finished getting country data')
  }, [])

  // when given multiple options, allows user to choose a specific country to display
  const selectCountry = (selectedCountry) => {
    setCountriesToDisplay(countries.filter(country => country.name.common === selectedCountry))
  }

  // filter function to match search query
  const searchCountries = (query) => {
    console.log(countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase())))
    setCountriesToDisplay(countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase())))
  }

  // Event handlers
  // ------------------------------
  const handleInputChange = (event) => {
    searchCountries(event.target.value)
    setInput(event.target.value)
  }

  return (
    <div>
      find countries <input value={input} onChange={handleInputChange}/>
      <CountryDisplay countriesToDisplay={countriesToDisplay} selectCountry={selectCountry}/>
    </div>
  )
}

export default App
