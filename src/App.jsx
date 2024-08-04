import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [lengthVal, setLengthVal] = useState(8)
  const [keepNum, setkeepNum] = useState(false)
  const [keepSym, setkeepSym] = useState(false)
  const [copy, setCopy] = useState("Copy")

  const char = 'abcdefghijklmnopqrstuvwxyz'
  const charUp = char.toUpperCase()
  const num = '0123456789'
  const sym = ' ~`!@#$%^&*()_-+={[}]|\:;"\'<,>.?/'

  

  const allThings = char +
  charUp+
  (keepNum? num : '') +
  (keepSym? sym : '');

  function randGenerator(str){
    let random = Math.floor(Math.random() * str.length)
    return str.charAt(random)
  }

  let password = ''
  password += randGenerator(char) + randGenerator(charUp);
  
  if(keepNum) password += randGenerator(num)
  if(keepSym) password += randGenerator(sym)

  let remaining = lengthVal - password.length

  for(let i =0 ; i<remaining; i++){
    password += randGenerator(allThings)
  }


  return (
    <>
      <div className='flex items-center justify-center fixed inset-0 bg-gray-800'>
        <div className='flex-col justify-center items-center w-104 text-white'>
        <h1 className='bg-red-800 p-4 text-xl font-bold'>Password Generator</h1>
        <form  onSubmit={e => {
            e.preventDefault();
            navigator.clipboard.writeText(password);
            setCopy("Copied!")
            }}>
          
          <div className='w-full py-8 flex items-center justify-center gap-4 bg-rose-200'>
          <div className='text-black w-9/12 p-4 h-5/6 text-center bg-white'  id="password"  >{password}</div>
          <button className='bg-orange-500 p-4 h-5/6' type="submit" >{copy}</button>
          </div>

          <div className='flex gap-4 bg-gray-400 p-4'>
          <input type="range" min="8" max="16" value={lengthVal} name="length" id="length" onChange={(e)=>setLengthVal(e.target.value)}/>
          <label htmlFor="length">Length ({lengthVal})</label>

          <input type="checkbox" name="Numbers" id="number" onChange={() => setkeepNum(!keepNum)}/>
          <label htmlFor="number">Number</label>

          <input type="checkbox" name="Symbols" id="symbols" onChange={() => setkeepSym(!keepSym)}/>
          <label htmlFor="symbols">Symbols</label>
          </div>
          
        </form>
        </div>
        
      </div>
    </>
  )
}

export default App
