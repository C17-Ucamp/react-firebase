import React, { useEffect, useState } from 'react'
import { db } from './Firebase/firebase'
import { collection, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore'

const App = () => {

  const [users, setUsers]= useState([])
  const userCollectionRef = collection(db, 'reservaciones')
  const [newName, setNewName]= useState("")
  const [newEmail, setNewEmail]= useState("")
  const [newTable, setNewTable]= useState(0)

   const createUserDocs = async()=>{
     await addDoc(userCollectionRef, {nombre: newName, correo: newEmail, mesa:newTable})
     getUserDocs()
   }

   const getUserDocs = async() =>{
     const data = await getDocs(userCollectionRef)
     setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
   }

   const incrementarMesa = async(id, newTable) =>{
   const userDoc = doc(userCollectionRef, id)
   const newMesa = {mesa: parseInt(newTable) + 1}
   console.log(newMesa)
   await updateDoc(userDoc, newMesa)
   getUserDocs()
   }

 const borrarDoc = async(id) =>{
 const userDoc = doc(userCollectionRef, id)
 await deleteDoc(userDoc)
 getUserDocs()
 }

useEffect(() => {
     getUserDocs()
    },[])


  return (
    <div>

      <input type='text' placeholder='Nombre'  onChange={(e)=>{setNewName(e.target.value)}}/>
      <input type='email' placeholder='Correo'  onChange={(e)=>{setNewEmail(e.target.value)}} />
      <input type='number' placeholder='#dePersonas'  onChange={(e)=>{setNewTable(e.target.value)}}/>
       <button onClick={createUserDocs}>Enviar</button> 

     {users.map((user)=> 
          <div key={user.id}> 
          <h1>Nombre:{user.nombre}</h1>
          <h1>Correo:{user.correo}</h1>
          <h1>#depersonas:{user.mesa}</h1>
          <button onClick={()=> incrementarMesa(user.id, user.mesa)}>Incrementar número de asistentes</button>
          <button onClick={()=> borrarDoc(user.id)}>Borrar</button>
          </div>
      )} 

    </div>
  )
}

export default App
