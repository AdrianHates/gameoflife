import { useState, useRef, useEffect } from 'react'
import { Contenedor } from './Componentes/datos'
import { random, Boton, espacio, changuito, createPatrons } from './Componentes/metodos'
import './App.css'

let interval= null;

function App() {
  const [espacioTemporal, setEspacioTemporal] = useState(espacio())
  const [ser, setSer] = useState(true)
  const [generation, setGeneration] = useState(0)
  
  const ejecutarIntervalo = () => {
    setEspacioTemporal(prevEspacioTemporal => changuito([...prevEspacioTemporal]))
    setGeneration(prevGeneration => prevGeneration + 1)
  }  

  useEffect(() => {
    interval = setInterval(ejecutarIntervalo, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const pausa = () => {
    if (interval) {
      setSer(false);
      clearInterval(interval)
      interval=null
    }
  }

  const playGame = () => {
    setSer(true);
    interval = setInterval(ejecutarIntervalo, 100);
  }

  const patrones = () => {
    document.getElementById('botones').style.display= 'none'
    document.getElementById('options').style.display= 'block'
   } 

  const clear = () => {
    setEspacioTemporal(espacio().map(x=>x.map(y=>false)))
    clearInterval(interval)
    setGeneration(0)
    setSer(false)
  }
  
  const random = () => {
    setEspacioTemporal(espacio())
    setSer(false)
    setTimeout(()=>{
      clearInterval(interval)
    },100)
    setTimeout(()=>{
      setSer(true)
      setGeneration(0)
      interval = setInterval(ejecutarIntervalo, 100);
    }, 150)
  }
  
  const patronGeneral = (n) => {
    setEspacioTemporal(createPatrons(Contenedor[n].map(x=>[x[0],x[1]])))
    setSer(false)
    setGeneration(0)
    clearInterval(interval)
  }

  return (
    <div id='todo'>
        <h1>Conway's Game of Life</h1>
        <div id='UniversoVisible'>
          <table id='table'>
            {espacioTemporal.map((x,i) => <tr key={i}>{x.map((y,index)=><td key={`${i}+'${index}`} className={y?'alive':'dead'}></td>)}</tr>)}
          </table>
        </div>
        <div id='botones'>
          <div id='generation'>Generation:<br />{generation}</div>
          <Boton id='pausa' texto='Start/Pause/Resume' onClick={ser?pausa:playGame} />          
          <Boton id='random' texto='Random' onClick={random} />
          <Boton id='clear' texto='Clearboard' onClick={clear} />
          <Boton id='patron' texto='Patrones' onClick={patrones} />          
        </div>
        <div id='options' style={{display:'none'}} >
          <Boton id='patron1' texto='Gosper Glider Gun' onClick={()=>patronGeneral('GosperGlider Gun')} />
          <Boton id='patron2' texto='Pulsar' onClick={()=>patronGeneral('Pulsar')} />
          <Boton id='patron3' texto='Beacon' onClick={()=>patronGeneral('Beacon')} />
          <Boton id='patron4' texto='Lwss' onClick={()=>patronGeneral('Lwss')} />
          <Boton id='patron5' texto='Glider' onClick={()=>patronGeneral('Glider')} />
          <Boton id='patron6' texto='Blinker' onClick={()=>patronGeneral('Blinker')} />
          <Boton id='patron7' texto='Create Gosper' onClick={()=>patronGeneral('Create Gosper')} />
          <Boton id='patron8' texto='Void' onClick={()=>patronGeneral('Void')} />
          <Boton id='patron9' texto='Quasar' onClick={()=>patronGeneral('Quasar')} />
          <Boton id='patron10' texto='Pulsars' onClick={()=>patronGeneral('Pulsars')} />
          <Boton id='back' texto='Back' onClick={()=>{
              document.getElementById('options').style.display= 'none';
              document.getElementById('botones').style.display= 'block';
            }} />
          </div>
      </div> 
    
  )
}

export default App
