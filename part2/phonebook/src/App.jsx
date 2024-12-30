import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import personService from './services/persons'
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

const Persons = ({personToShow,toggleDeletionOf}) =>(
  <ul>
      
  {personToShow.map(person=>
  <Person key = {person.id} person={person} toggleDeletion={() => toggleDeletionOf(person.name,person.id)}/>
)}
</ul>
)

const Person = ({ person , toggleDeletion}) => {
  return (
    <li>{person.name} {person.number} <button onClick={toggleDeletion}>Delete</button></li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [sName, setsName] = useState('')

  const hook = () =>{
    console.log('effect')
    personService
        .getAll()
        .then(intialPersons =>{
          console.log("promise fulfilled")
          setPersons(intialPersons)
        })
  }
  useEffect(hook,[])
  const personToShow = persons.filter(person => person.name.toLowerCase().includes(sName.toLowerCase()))

  const addPerson =(event) =>{
    event.preventDefault()
    const personObject = {
      name:newName,
      number:newNumber,
    

    }
    if(persons.some(e=>e.name===newName)){
      const leperson = persons.find(e=>e.name===newName)
      if (window.confirm(`${leperson.name} is already added to phonebook, replace the old number with a new one?`)) {
       
      console.log(leperson)
      personService.update(leperson.id,personObject)
      .then(returnedPerson => {        setPersons(persons.map(person => person.id === leperson.id ? returnedPerson : person))      })
      }
      
      

    }else{
      personService
      .create(personObject)
      .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
       setNewName('')  })

     

    }

    
  }

  const handlePersonChange = (event) => {

    setNewName(event.target.value)
  }
  const toggleDeletionOf = (names,id) =>{
    if (window.confirm(`Delete ${names}?`)) {
      axios.delete(`http://localhost:3001/persons/${id}`)
      setPersons(persons.filter(n => n.id !== id))
    }
    
  
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
      <Persons personToShow={personToShow} toggleDeletionOf={toggleDeletionOf}/>
    </div>
  )
}

export default App