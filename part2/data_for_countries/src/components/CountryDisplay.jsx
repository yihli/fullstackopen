import countriesService from '../services/countriesService'
import { useState, useEffect } from 'react'

const CountryDisplay = ({ countriesToDisplay, selectCountry }) => {
    // const [selectedCountry, setSelectedCountry] = useState(null)

    if (countriesToDisplay.length === 0) {
        return <div>No matching country!</div>
    }

    if (countriesToDisplay.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
    }

    if (countriesToDisplay.length > 1) {
        return (
            <div>
            {countriesToDisplay.map((country) => 
                <p key={country.name.common}>{country.name.common} <button onClick={() => selectCountry(country.name.common)}>show</button></p>
            )}
            </div>
        )
    }

    const selectedCountry = countriesToDisplay[0]
    console.log(selectedCountry)
    return (
        <div>
            <h1>{selectedCountry.name.common}</h1>
            <div>
                <p>Capital: {selectedCountry.capital[0]}</p>
                <p>Area: {selectedCountry.area}</p>
            </div>

            
            <h2>Languages: </h2>
                
            <ul>
                {
                Object.values(selectedCountry.languages).map(language => 
                    <li key={language}>{language}</li>
                )
            
                }
            </ul>

            <img src={selectedCountry.flags.png} alt={selectedCountry.name} />
        </div>
    )
}

export default CountryDisplay 