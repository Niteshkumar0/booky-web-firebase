import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import '../styles/navbar.module.css'
import { getAuth ,onAuthStateChanged} from 'firebase/auth'
import { app } from '../config/Firebase'
import {useNavigate} from 'react-router-dom'

export default function Navbar() {
    let [user,setUser] = useState()
    let auth = getAuth(app)

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
            }else{
                setUser('')
            }
        })
    },[])

        let navigate = useNavigate()

    let signOut = () => {
        auth.signOut().then(()=> navigate('/')).catch((err) => console.log(err))
    }
  
  return (
    <>
        <nav>
            <h3>booky </h3>
            <ul>
                <li>
                    <NavLink to="/" style={{ textDecoration: 'none',color: 'black' }}>Home</NavLink>
                </li>
                {user ? <li>
                    <NavLink to="book/list" style={{ textDecoration: 'none',color: 'black' }}>listing book</NavLink>                    
                </li> : null }
                
                
                {
                user ? <li onClick={signOut}>
                    <NavLink to='signout' style={{ textDecoration: 'none',color: 'black' }}> signOut</NavLink></li> : null
                }

                {
                   user ? null : <li> <NavLink to='/register' style={{ textDecoration: 'none',color: 'black' }}> Register</NavLink> </li>

                }
                {
                    user ? null : <li> <NavLink to='/login' style={{ textDecoration: 'none',color: 'black' }}> Login</NavLink> </li>
                }
            </ul>
        </nav>
    </>
  )
}
