import React, { useEffect, useState } from 'react'
import '../styles/register.module.css'
import {useForm} from 'react-hook-form'
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'
import {app} from '../config/Firebase'
import {useNavigate} from 'react-router-dom'

export default function Register() {
    let {register,handleSubmit,formState: {errors},watch} = useForm()

    //USE STATE
    
    let auth = getAuth(app)

    let handle = async (e) => {
      try {
        await createUserWithEmailAndPassword(auth, watch('email'), watch('password'));
      } catch (error) {
        console.log(error);
      }
    }

    // let navigate = useNavigate()

  //   useEffect(() => {
  //     onAuthStateChanged(auth, user => {
  //         if (user) {navigate("/") , console.log("user",user)}
  //     })
  //  })

 
  return (
    <>
    <section className='registerContainer'>
        <form onSubmit={handleSubmit()}>           
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='Email'   {...register('email',{required:true,pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}})} />
            {errors.email?.type === 'required' && <p>Email is required</p>}
            {errors.email?.type === 'pattern' && <p>Email is invalid</p>}

            <label htmlFor="password"> Password</label>
            <input type="password" id="password" placeholder='Password'   {...register('password',{required:true,minLength:{value:8,message:<p>Password contain atLeast 8 character</p>}})} />
            {errors.password?.type === 'required' && <p>password is required</p> }
            {errors.password?.type === 'minLength' && <p>password contain atLeast 8 letters</p>}


            <label htmlFor="password">Confirm Password</label>
            <input type="password"  id="password" placeholder='Password'  {...register('confirmPassword',{required:true,validate:(value) => value === watch('password') || 'please match your password'})} />
            {errors.confirmPassword?.type === 'required' && <p>please confirm your password</p>}
            {errors.confirmPassword?.type === 'validate' && <p>please match your confirm password</p>}

            <button onClick={handle}>Create Account</button>
        </form> 
</section>
    </>
  )
}
