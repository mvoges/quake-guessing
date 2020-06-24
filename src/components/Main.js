import React, { useState, useEffect } from 'react'

export default function Main() {
    const [earthQuakes, setEarthQuakes] = useState([])

    useEffect(() => {
        fetchEarthquakeData()
    }, [])

    const handleClick = event => {
        fetchEarthquakeData()
    }

    const fetchEarthquakeData = () => {
        const script = document.createElement('script');
        script.src = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp?callback=eqfeed_callback';
        document.querySelector('head').appendChild(script);

        // jsonp callback, needs to be global
        window.eqfeed_callback = earthQuakes => {
            console.log(earthQuakes['features'][0])
            setEarthQuakes(earthQuakes['features'])
        }
    }

    return (
        <div>
            <button onClick={handleClick}>Update data</button>
            <h2>Today's US Earthquakes:</h2>
            {earthQuakes && earthQuakes.map(earthquake => (
                <div key={earthquake.properties.code}>
                    <b>{earthquake.properties.place}:</b> {earthquake.properties.mag}
                </div>
            ))}
        </div>
    )
}
