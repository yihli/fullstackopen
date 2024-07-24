import { useState } from 'react'
import './styles.css'

const CounterDisplay = ({ counter }) => <p>{counter}</p>

const Button = ({ onClick, text }) => <button className="button" onClick={onClick}>{text}</button>

const TestApp = () => {
    const [counter, setCounter] = useState(0)

    const increase = () => setCounter(counter + 1)
    const decrease = () => setCounter(counter - 1)
    const reset = () => setCounter(0)

    return (
        <div>
            <CounterDisplay counter={counter} />
            <div className='container'>
                <Button onClick={increase} text="Increase" />
                <Button onClick={decrease} text="Decrease" />
                <Button onClick={reset} text="Reset" />
            </div>
        </div>
    )
}

export default TestApp