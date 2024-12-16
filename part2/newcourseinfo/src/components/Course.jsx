const Course = ({course}) =>{
  
    return (
      <>
      <Header course={course}/>
     
      <Content parts={course.parts} />
      <Total parts = {course.parts}/>
      </>
      
    )
  } 
  
  const Header = ({course})=>
    <h2>{course.name}</h2>
  
  
  const Part = ({part})=>
    <p>
  {part.name} {part.exercises}
  </p>
  
  const Content =({parts})=>
  //   <Part part = {parts[0]}/>
  // <Part part = {parts[1]}/>
  // <Part part = {parts[2]}/>
    
    parts.map(part => <Part key = {part.id} part ={part}/>)
  
  const Total =({parts})=>
    <b>total of {parts.reduce((sum,part)=>sum+part.exercises,0)} exercises</b>
  
  
  
    
    
  
  
  
  
  
  // const Content = ({parts})=>{
  
  // }
export default Course 