import React, { useState, useEffect } from 'react'
import Axios from 'axios';


const Filter = props => {
    const { filterName, handleNewFiltername } = props
    return (
        <div>
            find countries
        <input value={filterName} onChange={handleNewFiltername} />
        </div>
    )
}

const Weather = props => {
    const { weatherInfo, capital } = props

    if (weatherInfo.hasOwnProperty('current')) {
        return (
            <div>
                <h3>Weather in {capital}</h3>
                <div>Temperature: {weatherInfo.current.temp_c} celsius</div>
                <img alt="text" src={weatherInfo.current.condition.icon} />
                <div>Wind {weatherInfo.current.wind_kph}kph direction {weatherInfo.current.wind_dir}</div>
            </div>
        )
    }
    return (
        <div></div>
    )
}

const App = () => {
    const [countries, setCountries] = useState([
    ])
    const [filterName, setFilterName] = useState('')
    const [weatherInfo, setWeatherInfo] = useState({})

    useEffect(() => {
        Axios.get('https://restcountries.eu/rest/v2/all').then(res => {
            setCountries(res.data)
        })
    }, [])

    const handleNewFiltername = e => {
        setFilterName(e.target.value)
    }

    const toFilterName = filterName.toLowerCase()
    const countriesToShow = toFilterName ?
        countries.filter(c =>
            c.name.toLowerCase().includes(toFilterName))
        : countries


    useEffect(() => {
        if (countriesToShow.length !== 1) {
            setWeatherInfo({})
            return
        }
        const country = countriesToShow[0]
        Axios.get('http://api.apixu.com/v1/current.json?key=43ea51eb62a9462e983103610192403&q='
            + country.capital).then(res => {
                setWeatherInfo(res.data)
            })
    })

    if (countriesToShow.length > 10) {
        return (
            <div>
                <Filter filterName={filterName} handleNewFiltername={handleNewFiltername} />
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
    else if (countriesToShow.length > 1) {
        return (
            <div>
                <Filter filterName={filterName} handleNewFiltername={handleNewFiltername} />
                {countriesToShow.map(c =>
                    <div key={c.name}>{c.name}
                        <button onClick={() => setFilterName(c.name)}>show</button>
                    </div>
                )}
            </div>
        )
    }
    else if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
        return (
            <div>
                <Filter filterName={filterName} handleNewFiltername={handleNewFiltername} />
                <h1>{country.name}</h1>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>

                <h3>Languages</h3>
                <ul>
                    {country.languages.map(l =>
                        <li key={l.name}>{l.name}</li>
                    )}
                </ul>
                <img alt="text" src={country.flag} width="100" height="100" />
                <Weather weatherInfo={weatherInfo} capital={country.capital} />
            </div>
        )
    } else {
        return (
            <div>
                <Filter filterName={filterName} handleNewFiltername={handleNewFiltername} />
                No matches
            </div>
        )
    }

}

export default App