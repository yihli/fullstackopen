import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>
    

const Button = ({ onSmash, text }) => <button onClick={onSmash}>{text}</button>
    


const App = () => {
    const name = 'Peter'
    const age = 10

    // add state to the component and initialize to 0
    const [ counter, setCounter ] = useState(0)
    console.log('rendering with counter value', counter)


    // setTimeout(
    //     () => setCounter(counter + 1),
    //     1000
    // )

    // event handlers
    const increaseByOne = () => {
        console.log('increase, value before', counter)
        setCounter(counter + 1)
    }
    const decreaseByOne = () => setCounter(counter - 1)
    const resetCounter = () => setCounter(0)

  

    return (
        <div>
            <Display counter={counter} />
             {/* event handler is a function or function reference, not a function call */}
            <Button onSmash={increaseByOne} text="Increase" />
            <Button onSmash={decreaseByOne} text="Decrease" />
            <Button onSmash={resetCounter} text="Reset" />
            
        </div> 
    )
}

export default App


