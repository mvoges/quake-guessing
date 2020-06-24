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
            const isToday = date => (new Date().getDate() === new Date(date).getDate())
            const todaysQuakes = earthQuakes['features'].filter(e => isToday(e.properties.time))
            setEarthQuakes(todaysQuakes)
        }
    }

    return (
        <div>
            <button onClick={handleClick}>Update data</button>
            <h2>Today's US Earthquakes: {earthQuakes.length > 0 ? earthQuakes.length : " "}</h2>
            {earthQuakes && earthQuakes.map(earthquake => {
                const time = new Date(earthquake.properties.time)
                return <div key={earthquake.properties.code}>
                    <b>{earthquake.properties.place}:</b> {earthquake.properties.mag}, at {time.toLocaleTimeString()} ({time.toLocaleDateString()})
                </div>
            })}
        </div>
    )
}
