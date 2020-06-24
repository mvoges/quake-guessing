import React from 'react'
import '../styles/app.css'

export default function Quake({ data }) {

    const time = new Date(data.properties.time)

    return (
        <div className="card">
            <b>{data.properties.place}:</b>
            <br/>
            at {time.toLocaleTimeString()}
        </div>
    )
}
