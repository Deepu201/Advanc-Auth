import React from 'react'
import { motion } from 'framer-motion'
import { User,Mail ,Lock} from "lucide-react";
import { Link } from 'react-router-dom';
import Input from './Input'
export default Login = () => {

    
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

consthandleLogin=(e)=>{
    e.preventDefault()
}

  return (<>
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
</form>
</div>
  </motion.div>
  
  
  </>
  )
}
