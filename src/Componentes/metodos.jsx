export const random = () => {
  if(Math.random()<0.5) {
    return true
  } else {
    return false
  }
}

export const Boton = ( { id,onClick,texto } ) => {
  return(
  <button id={id} onClick={onClick} >
    {texto}
  </button >
  )
}

const tablaM=33;
const tablaN=50;

export function espacio() {
  let result = []
  for(let i=0;i<tablaM;i++) {
    let a = [];
    for(let j=0;j<tablaN;j++) {
      a.push(random())
    }
    result.push(a)    
  } return result  
}

export function changuito(matriz) {    
    let kappa = matriz.map(elem => [...elem])
    for(let i=0;i<matriz.length;i++) {
      for(let j=0;j<matriz[i].length;j++){
        let a = [];
      if(matriz[i-1]) {
        a.push(matriz[i-1][j-1],matriz[i-1][j],matriz[i-1][j+1])        
      };
      if(matriz[i]) {
        a.push(matriz[i][j-1],matriz[i][j+1])
      };
      if(matriz[i+1]) {
        a.push(matriz[i+1][j-1],matriz[i+1][j],matriz[i+1][j+1])
      }
      let b = a.filter(x=>x===true)
      if(matriz[i][j]) {
        if(b.length<2||b.length>3) {
          kappa[i][j]=false
        } else if(b.length===2||b.length===3) {
          kappa[i][j]=true
        }
      } else if (!matriz[i][j]) {
        if(b.length===3) {
          kappa[i][j]=true
        }
      }
      } 
    } return kappa
  }

export const createPatrons = (patron) => {
  let a = espacio().map(x=>x.map(y=>false))
  for(let i=0;i<patron.length;i++) {
    a[patron[i][0]][patron[i][1]]=true
  }
  return a
}