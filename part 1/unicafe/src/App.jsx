import { useState } from 'react'

const Header = () => {
  return (
    <div>
      <h1>give feedback</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  if (props.text == "positive") {
    return (
      <table>
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>{props.value}%</td>
          </tr>
        </tbody>
      </table>
    )
  }
  return (
    <table>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </table>
  )

}

const Statistics = (props) => {

  if (props.total == 0) {
    return (
      <div>
        <div>
          <h1>statistics</h1>
        </div>
        <div>
          No feedback given
        </div>
      </div>

    )
  }
  return (
    <div>
      <div>
        <h1>statistics</h1>
      </div>

      <div>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.total} />
        <StatisticLine text="average" value={props.average} />
        <StatisticLine text="positive" value={props.positive} />

      </div>

    </div>

  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    var updatedGood = good + 1;
    setGood(updatedGood)
    setTotal(bad + neutral + updatedGood)
  }
  const handleNeutralClick = () => {
    var updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral)
    setTotal(bad + updatedNeutral + good)

  }
  const handleBadClick = () => {
    var updatedBad = bad + 1;
    setBad(updatedBad)
    setTotal(updatedBad + neutral + good)

  }

  const average = () => {
    if (total != 0) {
      return ((good - bad) / total)
    }
    return 0
  }

  const positive = () => {
    if (total == 0) {
      return 0;
    }
    return ((good / total) * 100)
  }

  return (
    <div>
      <Header></Header>
      <Button handleClick={handleGoodClick} text="good"></Button>
      <Button handleClick={handleNeutralClick} text="neutral"></Button>
      <Button handleClick={handleBadClick} text="bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average()} positive={positive()}></Statistics>
    </div>
  )
}

export default App