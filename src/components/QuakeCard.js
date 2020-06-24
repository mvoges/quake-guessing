import React, {useState} from 'react'
import '../styles/app.css'
import { sample, shuffle } from 'underscore'

export default function QuakeCard({ data, otherMagnitudes }) {

    const [buttonPressed, setButtonPressed] = useState(false)
    const [solutionFound, setSolutionFound] = useState(false)
    const [potentialMagnitudes] = useState(shuffle([...sample(otherMagnitudes, 2), data.properties.mag]))

    const formattedPotMagnitudes = potentialMagnitudes.map(mag => parseFloat(mag).toFixed(2))
    const time = new Date(data.properties.time)
    const severity = Math.pow(data.properties.mag + 1, 3.5)

    let customCssProperties = {}
    customCssProperties['--severityHigh'] = `${severity}px`
    customCssProperties['--severityLow'] = `-${severity}px`

    const handleClick = (value, idx) => {
        setButtonPressed(idx)
        if (value === parseFloat(data.properties.mag).toFixed(2)) {
            setSolutionFound(true)
        } else {
            setSolutionFound(false)
        }
    }

    const buttonClass = idx => {
        if (buttonPressed === idx)
            return solutionFound ? "correct-button" : "wrong-button"
        else
            return ""
    }

    return (
        <div className="card" style={customCssProperties}>
            <b>{data.properties.place}</b>
            <br/>
            <i>at {time.toLocaleTimeString()}</i>
            <br/>
            <br/>
            <div>Guess the magnitude:</div>
            {formattedPotMagnitudes && formattedPotMagnitudes.map( (mag, idx) =>
                <button key={idx}
                        className={buttonClass(idx)}
                        value={mag}
                        onClick={(event) => handleClick(event.target.value, idx)}>
                    {mag}
                </button>
            )}
        </div>
    )
}
