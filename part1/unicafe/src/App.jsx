import { useState } from 'react'
const StatisticLine = (props) =>{
  if(props.text=="positive"){
    return(
      <tr><td>{props.text} </td><td>{props.value.toFixed(2)} %</td></tr>
    )
  }
  if (props.text =="good" || props.text =="bad"|| props.text =="neutral" ){
    return(
      <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>

    )
  }
  return(

    <tr>
    <td>{props.text}</td>
    <td>{props.value.toFixed(2)}</td>
  </tr>
)}
const Button = (props) => (
  <button onClick = {props.handleClick}>
    {props.text}
  </button>
)

const Statistics =(props) =>{
  if(props.total==0){
    return(
      <div>
        <p>No feedback given</p>
      </div>

    )
    
  }
  
  return(

  <div>
  <h3>Statistics</h3>
  


 
  <table border="1" >
    <tbody>
    {/* <tr>
      <td>good</td>
      <td>{props.good}</td>
    </tr>
    <tr>
      <td>neutral</td>
      <td>{props.neutral}</td>
    </tr>

    <tr>
      <td>bad</td>
      <td>{props.bad}</td>
    </tr>
    <tr>
      <td>total</td>
      <td>{props.total}</td>
    </tr>
    <tr>
      <td>average</td>
      <td>{((props.good+(-1*props.bad))/(props.total)).toFixed(2)}</td>
    </tr>
    <tr>
      <td>positive</td>
      <td>{(props.good/props.total*100).toFixed(2)} %</td>
    </tr> */}
<StatisticLine text  ="good" value = {props.good}/>
  <StatisticLine text  ="neutral" value = {props.neutral}/>
  <StatisticLine text  ="bad" value = {props.bad}/>
  <StatisticLine text  ="total" value = {props.total}/>
  <StatisticLine text  ="average" value = {(props.good+(-1*props.bad))/(props.total)}/>
  <StatisticLine text  ="positive" value = {props.good/props.total*100}/>


    </tbody>
  </table>
  </div>
)}
const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let total = good+neutral+bad



  return (
    
    <div>
      <h3>Give Feedback</h3>
      <Button handleClick={()=>setGood(good+1)} text="good"></Button>
      <Button handleClick={()=>setNeutral(neutral+1)} text="neutral"></Button>
      <Button handleClick={()=>setBad(bad+1)} text="bad"></Button>
      <Statistics good ={good} neutral ={neutral } bad={bad} total= {total}></Statistics>

     
    </div>
  )
}

export default App