import { useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState('8');
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef(null);

  useEffect(() => {
    const passGenerator = () => {
      let char = '';
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let pass = '';
      numAllowed ? (str += '0123456789') : (str += '');
      charAllowed ? (str += '~!@#$%^&*()_') : (str += '');
      for (let i = 1; i <= length; i++) {
        char = Math.floor(Math.random() * str.length);
        pass += str.charAt(char);
      }
      setPassword(pass);
    };

    passGenerator();
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        // Optionally handle success here
      }, (err) => {
        console.error('Failed to copy password: ', err);
      });

      // Highlight the password field
      if (passwordInputRef.current) {
        passwordInputRef.current.select();
      }
    }
  }, [password]);

  return (
    <>
      <div className='flex flex-wrap flex-col 
        py-3 px-2 bg-slate-50 rounded-xl 
        mt-10 space-y-7 items-center'>
        <h1 className='text-black font-bold'>Password Generator</h1>
        <div>
          <input 
            type="text" 
            className='rounded-l-lg bg-slate-100 px-2 py2 text-slate-500'
            placeholder='Password'
            size={40}
            value={password}
            name='password'
            readOnly
            ref={passwordInputRef}
          />
          <button 
            className='bg-sky-400 px-2 py2 rounded-r-lg'
            onClick={() => passwordInputRef.current.select()}
          >
            Copy
          </button>
        </div>
        <div className='space-x-2'>
          <input 
            type="range"
            value={length} 
            min={6}
            max={40}
            onChange={(e) => setLength(e.target.value)}
            id='lengthAllowed'
          />
          <label htmlFor="lengthAllowed">Length({length})</label>
          <input 
            type="checkbox" 
            checked={numAllowed}
            id='numberAllowed'
            onChange={() => setNumAllowed(prev => !prev)}
          />
          <label htmlFor="numberAllowed">Number</label>
          <input 
            type="checkbox"
            checked={charAllowed} 
            id='charAllowed'
            onChange={() => setCharAllowed(prev => !prev)}
          />
          <label htmlFor="charAllowed">Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
