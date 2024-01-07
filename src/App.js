import './App.css'; 
import React, { useCallback, useEffect, useState ,useRef} from 'react';

function App() {

 const [length, setLength ] = useState(8);
 const [numberAllowed, setnumberAllowed] = useState(false);
 const [characterAllowed, setcharacterAllowed] =useState(false);
 const [password, setPassword] =useState(" ");

 // useRef hook 
 const passwordRef = useRef(null);

 
const passwordGenerator = useCallback( ()=>{
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQUSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  if(numberAllowed==true){
    str = str +"0123456789"
  }
  if(characterAllowed==true){
    str = str +"!@#$%^&*"; 
  }
  
  for(let i=1;i<length;i++){
    let char = Math.floor(Math.random() * str.length +1)
    pass += str.charAt(char);

  }
  setPassword(pass);
},  [length,numberAllowed,characterAllowed,setPassword]  )


const copyPasswordToClipboard = useCallback(()=>{
  // optimization useRef hook se 
  passwordRef.current?.select()
// passwordRef.current?.setSelectionRange(0,3);
  window.navigator.clipboard.writeText(password); 

}, [password])
  
useEffect( ()=>{
passwordGenerator()
}, [length,numberAllowed,characterAllowed,passwordGenerator])
  return (

    <>
      <h1 className="" >Password Generator</h1>
<div className="container">

  <div className="input-div">
    <div>
      <input  type="text"  value={password} placeholder='password' readOnly  ref={passwordRef} />
    </div>
    <button onClick={copyPasswordToClipboard}>Copy Password</button>
  </div>

 <div className="length-div">
 <div>
  <input className='input-range' onChange={(e)=>{setLength(e.target.value)}
  } type="range" min={6} max={100} value={length} />
  </div>
  <div>
 <label>length[{length}] </label>
 </div>
 <div>
  <input 
   type="checkbox" defaultChecked={numberAllowed} onChange={()=>{
    setnumberAllowed((prev) => !prev);
   }} 
   />
   <label >Numbers</label>
 </div>
 <div>
  <input 
   type="checkbox" defaultChecked={characterAllowed} onChange={()=>{
    setcharacterAllowed((prev) => !prev);
   }} 
   />
   <label >Characters</label>
 </div>
 
 </div>

</div>
     

      </>

  );
}

export default App;
