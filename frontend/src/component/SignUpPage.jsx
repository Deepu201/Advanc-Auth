import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Input from './Input'
import { User,Mail } from "lucide-react";
function SignUpPage() {

const {name,setName}=useState('')
const {email,setEmail}=useState('')

    const handleSignUP=()=>{
        
    }
  return (
    <motion.div initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden'
    >


        <div className='p-8'>
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Create Account</h2>
<form onSubmit={handleSignUP}>
    <Input icon={User} type='text'
    placeholder='Username'
    name='username'
    value={name}
    onChange={(e)=>setName(e.target.value)}
    ></Input>
     <Input icon={Mail} type='text'
    placeholder='Email'
    name='Email'
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    ></Input>

</form>
        </div>
    </motion.div>
  )
}

export default SignUpPage