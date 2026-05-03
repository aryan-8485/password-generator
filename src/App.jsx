import React, { useState,useCallback, useEffect,useRef } from 'react'
function App() {
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charactersAllowed, setCharactersAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbersAllowed){
      str += "0123456789"
    }
    if(charactersAllowed){
      str += "!@#$%^&*()_+"
    }
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numbersAllowed,charactersAllowed,setPassword])
  const copyPasswordToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator()
  }
  ,[length,numbersAllowed,charactersAllowed,passwordGenerator])
    
  
  return (
    <>
  <div className= 'w-full max-w-3xl h-75 mx-auto shadow-md rounded-lg px-4 my-8 text-cyan-600 bg-gray-700'>
  <h1 className='text-2xl text-center font-bold py-2 text-white'>Password Generator</h1>
  <div className='flex-shadow rounded-lg overflow-hidden mb-4'>
  <input
   type='text'
   value={password}
   className='outline-none rounded-md w-full py-1 px-3 '
   placeholder='password'
   readOnly
    ref={passwordRef}
   />
  <button className='outline-none rounded-md bg-blue-500 text-white px-4 py-1 my-2 active:bg-green-500' onClick={copyPasswordToClipboard}>copy</button>
  </div>
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input type='range' min={6} max={100}value={length} className='cursor-pointer'
        onChange={(e)=>setLength(e.target.value)}/>
      <label> Length: {length}</label>
    </div>
    <div className='flex items-center gap-x-1 py-3'>
      <input type='checkbox' defaultChecked={numbersAllowed} onChange={()=>setNumbersAllowed((prev)=> !prev)}/>
     <label htmlFor='numbersInput'>Numbers</label> 
     <input type='checkbox' defaultChecked={charactersAllowed} onChange={()=>setCharactersAllowed((prev)=> !prev)}/>
     <label htmlFor='charactersInput'>Characters</label>
     </div>
  </div>
 </div> 
 </>  
  )
}

export default App
