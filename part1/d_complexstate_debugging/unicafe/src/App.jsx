import { useState } from 'react'

// Button with text and eventhandler capability
const Button = ({eventHandler, text}) => (
  <button onClick={eventHandler}>{text}</button>
)

// A table row with text and value as its columns
const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

// A section displaying the statistic information if there is any.
const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={props.total} />
          <StatisticLine text='average' value={props.average} />
          <StatisticLine text='positive' value={props.positive} />
        </tbody>
      </table>
    </div>
  )
}


// Webpage for feedback. There are buttons to give feedback and a section 
// displaying the relevant data and statistics about the feedback
const App = () => {
  // useStates
  // --------------------------------------
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Event handlers 
  // ---------------------------------------
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  const calculateTotal = () => (good + neutral + bad) 
  const calculateAverage = () => (good - bad) / calculateTotal()
  const calculatePositive = () => (good / calculateTotal()) + '%'

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' eventHandler={increaseGood} />
      <Button text='neutral' eventHandler={increaseNeutral} />
      <Button text='bad' eventHandler={increaseBad} />
      <h1>statistics</h1>
      <Statistics total={calculateTotal()} average={calculateAverage()} positive={calculatePositive()} 
                  good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
