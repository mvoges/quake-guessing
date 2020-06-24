import React, { useState, useEffect } from 'react'
import QuakeCard from "./QuakeCard";
import '../styles/app.css'

export default function Main() {
    const [quakes, setQuakes] = useState([])

    const magnitudes = quakes.map(q => q.properties.mag)

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
            setQuakes(todaysQuakes)
        }
    }

    return (
        <div>
            <button onClick={handleClick}>Update data</button>
            <h2>Today's US Earthquakes: {quakes.length > 0 ? quakes.length : " "}</h2>
            <p>Hover over cards to compare the severity of the respective quake and take a guess.</p>
            <div className="wrapper">
                {quakes.map(earthquake => {
                    return <QuakeCard key={earthquake.id}
                                      data={earthquake}
                                      otherMagnitudes={magnitudes}/>
                })}
            </div>
        </div>
    )
}
