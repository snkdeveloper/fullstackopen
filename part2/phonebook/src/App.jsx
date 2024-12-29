import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
const Filter =({sName,handlesNameChange}) =>
  (
    <div> filter shown with<input value = {sName} onChange={handlesNameChange}/></div>
  )


const PersonForm =({addPerson,newName,handlePersonChange,newNumber,handleNumberChange})=>(
  <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}  onChange={handlePersonChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

const Persons = ({personToShow}) =>(
  <ul>
      
  {personToShow.map(person=>
  <Person key = {person.id} person={person}/>
)}
</ul>
)
const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [sName, setsName] = useState('')

  const hook = () =>{
    console.log('effect')
    axios
        .get('http://localhost:3001/persons')
        .then(response =>{
          console.log("promise fulfilled")
          setPersons(response.data)
        })
  }
  useEffect(hook,[])
  const personToShow = persons.filter(person => person.name.toLowerCase().includes(sName.toLowerCase()))

  const addPerson =(event) =>{
    event.preventDefault()
    const personObject = {
      name:newName,
      number:newNumber,
      id:String(persons.length + 1)

    }
    if(persons.some(e=>e.name===newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat(personObject))
      setNewName('')

    }

    
  }

  const handlePersonChange = (event) => {

    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const handlesNameChange =(event) =>{
    setsName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter sName={sName} handlesNameChange={handlesNameChange}/>
      
      <h3> Add a New</h3>
      
      <PersonForm addPerson={addPerson} newName = {newName}handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {/* <ul>
      
        {personToShow.map(person=>
        <Person key = {person.id} person={person}/>
      )}
      </ul> */}
      <Persons personToShow={personToShow}/>
    </div>
  )
}

export default App