import React from 'react'
import FloatingShap from './component/FloatingShap'
import {Routes, Route} from 'react-router-dom'
import SignUpPage from './component/SignUpPage'
import LoginPage from './component/LoginPage'
LoginPage
SignUpPage
function App() {
  return (
    <div className='min-h-screen bg-gradient-to-tr from-gray-900 via-green-900
    flex items-center justify-center relative overflow-hidden
     to-emerald-900'>
      <FloatingShap color='bg-green-500 ' size='w-64 h-64' top="-5%" left="10%" delay={0}></FloatingShap>
      <FloatingShap color='bg-emerald-500 ' size='w-48 h-48' top="70%" left="80%" delay={5}></FloatingShap>
      <FloatingShap color='bg-lime-500 ' size='w-32 h-32' top="40%" left="-10%" delay={2}></FloatingShap>
      
      
      
      
      
      



<Routes>
    <Route path="/" element={"homekbikbuki"} />
    <Route path="/signup" element={<SignUpPage></SignUpPage>} />
    <Route path="/login" element={<LoginPage></LoginPage>} />
</Routes>
      </div>

      
      
  )
}

export default App