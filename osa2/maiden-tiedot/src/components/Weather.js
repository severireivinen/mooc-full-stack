import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Should be working. Couldn't test any longer because of the monthly request limit (forgot to include a second parameter on my useEffect call)
const Weather = ({ country }) => {

    const [temperature, setTemperature] = useState(undefined)
    const [wind, setWind] = useState(undefined)
    const [iconUrl, setIconUrl] = useState('')
    const api_key = process.env.REACT_APP_API_KEY
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`

    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                try {
                    const resTemperature = response.data.current.temperature
                    const resWind = response.data.current.wind_speed
                    const resIcon = response.data.current.weather_icons
                    setTemperature(resTemperature)
                    setWind(resWind)
                    setIconUrl(resIcon)
                } catch (error) {
                    console.log('Problem with weather fetching', error)
                }

            })
    }, [url])

    if (temperature !== undefined) {
        return (
            <div>
                <h1>Weather in {country.capital}</h1>
                <p><strong>temperature: {temperature}</strong></p>
                <img src={iconUrl} alt='' />
                <p><strong>wind: {wind}</strong></p>
            </div>
        )
    }
    else {
        return (
            <div>

            </div>
        )
    }



}

export default Weather