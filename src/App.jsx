import {Route,Routes} from 'react-router-dom'
import Register from './pages/Register'
import { useEffect, useState } from 'react'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import ListingBook from './pages/ListingBook'
import HomePage from './pages/Home'
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import { app } from './config/Firebase'
function App() {
  let [user,setUser] = useState()
  let auth = getAuth(app)

  useEffect(()=>{
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      }
      else{
        setUser('')
      }
    })
  },[])


  return (
    <>
      
    <Navbar/>
      <Routes>
        
        <Route path='/' element={<HomePage/>}/>
        {
          user ? null : <Route path="/login" element={<Login/>}/>
        }
        {
          user ?  null
          :  <Route path='/register' element={<Register/>}/>
        } 
        <Route path='/book/list' element={<ListingBook/>}/>
        <Route path='/signout' /> 
     </Routes>

   
  
    </>
  )
}

export default App
