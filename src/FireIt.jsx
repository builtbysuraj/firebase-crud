import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { db } from "./firebaseConfig"


const Todo = () => {
  const [name, setName] = useState()
  const [age, setAge] = useState()
  const [users, setUsers] = useState([])
  const [newName, setNewName] = useState()
  const [newAge, setNewAge] = useState()

  const collectionRef = collection(db, 'users')

  //deleting user
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, 'users', id))
  }

  //updating user
  const updateUser = async (id) => {
    await updateDoc(doc(db, 'users', id), { name: newName, age: newAge })
  }

  //reading & displaying data
useEffect(() => {
  const getUsers = async () => {
    const data = await getDocs(collectionRef)
    setUsers(data.docs.map(doc => ({...doc.data(), id: doc.id})))
  }
  getUsers()
}, [])

  //creating users
  const clickHandler = async () => {
    try {
      name && age ?  await addDoc(collectionRef, { name: name, age: Number(age) }) : alert('please enter correct value')
    } catch (error) {
      console.log('something wrong')
    }
  }

  return (
    <div>
      <input type="text" placeholder='name' onChange={e => setName(e.target.value)} />
      <br />
      <br />
      <input type="number" placeholder='age' onChange={e => setAge(e.target.value)} />
      <br />
      <br />
      <button onClick={clickHandler} >add</button>
      <br />
      <br />
      {
        users.map((ele, i) => {
          return (
            <div className="container" key={i}>

              <div className="child"> name: {ele.name} || age: {ele.age} </div>
              <div className="child">
              <input onChange={(e) => setNewName(e.target.value)} type="text" placeholder="newName" />

              <input onChange={(e) => setNewAge(e.target.value)} type="text" placeholder="newAge" />

              <button onClick={() => updateUser(ele.id)} >update name</button>

              <button onClick={() => updateUser(ele.id)} >update age</button>

              <button onClick={() => deleteUser(ele.id)} >delete</button>
              </div>

            </div>
          )
        })
      }
    </div>
  )
}

export default Todo