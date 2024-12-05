import React, { useState } from 'react'

import { motion } from 'framer-motion'
import {Mail ,Lock,Loader} from "lucide-react";
import { Link } from 'react-router-dom';
import Input from './Input'
import { useAuthStore } from '../store/authStore';
function LoginPage() {
  
    const {login,isLoading,error} =useAuthStore()
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const handleLogin=async(e)=>{
  console.log(email,password)
    e.preventDefault()
await login(email,password)
}

  return (
    <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden'
    >
      <div className='p-8'>
              <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Welcome Vack</h2>
  <form onSubmit={handleLogin}>
  
       <Input icon={Mail} type='text'
      placeholder='Email'
      name='Email'
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      ></Input>
  
  <Input icon={Lock} type='text'
      placeholder='Password'
      name='password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      ></Input>

      <div className='flex items-center mb-6'>
        <Link className='text-sm text-green-400 hover:underline' to='/forgot-password'>Forgot Password</Link>

      </div>
      {error&& <p className='text-red-500 font-semibold mb-2'>{error}</p>}
      <motion.button
      whileHover={{scale:1.02}}
      whileTap={{scale:0.98}}
      className='w-full py-3 px-4 bg-gradient bg-gradient-to-t from-green-500 to-emerald-600 text-white font-bold
      rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-green-500  focus:ring-offset-2 
      focus:ring-offset-gray-900 transition duration-200 text-center '
      type='submit'
      >
        {isLoading?<Loader className='w-6 h-6 animate-spin  mx-auto'></Loader>:"Login"}
        
        
      </motion.button>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center '>
<p className='text-sm text-gray-500 '>
  Don&apos; t have an account ?{" "} <Link to='/signup' className='text-green-400 hover:underline' >Signup</Link>
</p>
        </div>
  </form>
  </div>
    </motion.div>
  )
}

export default LoginPage