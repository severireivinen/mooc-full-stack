import React from 'react'
import Weather from './Weather'

const DetailedCountry = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} width='100' height='100' alt='img' />
            <Weather country={country} />

        </div>
    )
}

export default DetailedCountry