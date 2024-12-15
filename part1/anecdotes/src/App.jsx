import { useState } from 'react'
const Button = (props) => {
  return(
    <button onClick ={props.onClick}>
      {props.text}
    </button>
  )
} 

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function increaseVote(selected,votes) { 
  const copy = [...votes]
  copy[selected] +=1
  return copy

}

function maxer(arr){
  if(arr.length === 0){
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for(var i = 1; i< arr.length;i++){
    if(arr[i]>max){
      maxIndex = i;
      max = arr[i];
    }
  }
  return [max,maxIndex];
}


  


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const getRandom = () => setSelected( getRandomInt(anecdotes.length))
  const getVotes = () => setVotes(increaseVote(selected,votes))
  const ary = maxer(votes)
  console.log(votes)



  return (
    <div>
       <h2>Anecdote of the day</h2>
       <p>{anecdotes[selected]}</p>
       <p>has {votes[selected]} votes</p>
       <Button text ="vote" onClick ={getVotes}/>
       <Button text = "next anecdote" onClick = {getRandom}/>
       <h2>Anecdote with the most votes</h2>
       <p>{anecdotes[ary[1]]}</p>
       <p>has {ary[0]} votes</p>

    </div>
  )
}

export default App