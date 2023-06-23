import React, { useEffect, useState } from 'react'
import '../styles/register.module.css'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {app} from '../config/Firebase'
import {getAuth,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'
export default function Login() {
    let {register,handleSubmit,formState: {errors},watch,reset} = useForm()
    const [signInError, setSignInError] = useState(null);
    let auth = getAuth(app)
    let navigate = useNavigate()

    let signIn = async () => {
        try {
          await signInWithEmailAndPassword(auth,watch('email'),watch('password'))
          reset()
          navigate('/')
        } catch (error) {
          if (error.code === 'auth/user-not-found') {
            setSignInError('Account not found. Please check your email and password.');
          } else {
            setSignInError('An error occurred during sign-in. Please try again.');
          }            }
        }


  return (
    <>
    <section>
    
      <form onSubmit={handleSubmit()}>           
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='Email'   {...register('email',{required:true,pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}})} />
            {errors.email?.type === 'required' && <p>Email is required</p>}
            {errors.email?.type === 'pattern' && <p>Email is invalid</p>}
             <p className='loginError'>{signInError} </p>
            <label htmlFor="password"> Password</label>
            <input type="password" id="password" placeholder='Password'   {...register('password',{required:true,minLength:{value:8,message:<p>Password contain atLeast 8 character</p>}})} />
            {errors.password?.type === 'required' && <p>password is required</p> }
            {errors.password?.type === 'minLength' && <p>password contain atLeast 8 letters</p>}


            <button onClick={signIn}>Sign in</button>
        </form> 

</section>
    </>
  )
}
