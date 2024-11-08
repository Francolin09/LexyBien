export const getUsers = async () => {
  const response = await fetch('/api/usuarios', {
    method: 'GET'
  })
  if (response.statusText !== 'OK'){
    console.log(response.statusText)
  }
  const json = await response.json();
  return json;
}

export const getConsultas = async () => {
const response = await fetch('/api/consultas',{
  method: 'GET'
})
if (response.statusText !== 'OK'){
  console.log('error de solicitud')
}
const json = await response.json();
return json;
}

export const getDetalles = async () => {
  const response = await fetch('/api/detalle',{
    method: 'GET'
  })
  if (response.statusText !== 'OK'){
    console.log('error de solicitud')
  }
  const json = await response.json();
  return json;
  }

export const getOcupados = async () => {
  const response = await fetch('/api/ocupados',{
    method: 'GET'
  })
  if (response.statusText !== 'OK'){
    console.log('error de solicitud')
  }
  const json = await response.json();
  return json;
  }
