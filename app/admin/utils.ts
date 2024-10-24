export const getUsers = async () => {
    const response = await fetch('/api/usuarios', {
      method: 'GET'
    })
    if (response.statusText !== 'ok'){
      console.log('error en peticion')
    }
    const json = await response.json();
    console.log(json)
    return json;
  }

export const getConsultas = async () => {
  const response = await fetch('/api/consultas',{
    method: 'GET'
  })
  if (response.statusText !== 'ok'){
    console.log('error de solicitud')
  }
  const json = await response.json();
  console.log(json)
  return json;
}

export const getUserespe = async (id: String) => {
  const response = await fetch(`/api/consultas/${id}`,{
    method: 'GET'
  })
  if (response.statusText !== 'ok'){
    console.log('error de solicitud')
  }
  const json = await response.json();
  console.log(json)
  return json;
}