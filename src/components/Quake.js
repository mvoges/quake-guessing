import React from 'react'
import '../styles/app.css'

export default function Quake({ data }) {

    const time = new Date(data.properties.time)
    const severity = Math.pow(data.properties.mag + 1, 3)

    console.log("magnitude:", data.properties.mag)
    console.log("severity:", severity)

    let customCssProperties = {}
    customCssProperties['--severityHigh'] = `${severity}px`
    customCssProperties['--severityLow'] = `-${severity}px`

    return (
        <div className="card" style={customCssProperties}>
            <b>{data.properties.place}:</b>
            <br/>
            at {time.toLocaleTimeString()}
            <br/>
            magnitude: {data.properties.mag}
        </div>
    )
}
