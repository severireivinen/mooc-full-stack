import React from 'react'
import Country from './Country'
import DetailedCountry from './DetailedCountry'

const Countries = ({ countries, handleShowButton }) => {

    if (countries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
    else if (countries.length === 1) {
        return (
            <div>
                <DetailedCountry country={countries[0]} />
            </div>
        )
    }
    else if (countries.length < 10 && countries.length > 1) {
        return (
            <div>
                <ul>
                    {countries.map(country =>
                        <Country key={country.name} name={country.name} handleShowButton={handleShowButton} />
                    )}
                </ul>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

export default Countries