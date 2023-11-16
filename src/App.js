import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // create an array to store the data from the json request
  const [resultados, setResultados] = useState([]); 

  console.log('Renderizando App'); // Agrega esta línea

  // we make sure it is called once the page is mounted 
  React.useEffect(() => {
    //console.log("Ejecuntando useEffect")
    fetch('http://localhost:3001/categorias')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        //console.log("Datos recibidos")
        setResultados(data);
      });
  }, [])

  


  return (
    <div className="App">
      {
        resultados.map( d => (
          <div key={d.id}> {d.title} </div>
        ))
      }      
    </div>
  );
}

export default App;
