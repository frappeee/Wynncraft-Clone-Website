import React, { useState } from 'react'
import wynnLogo from './assets/wynncraft_logo.png'
import './App.css'

function App() {
  const [username, setUsername] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlayer = async (e) => {
    e.preventDefault(); //prevents page reload
    if(!username) {
      return;
    }

    setLoading(true);
    setError(null);
    setPlayerData(null);

    try {
      const response = await fetch('https://api.wynncraft.com/v3/player/${username}')

      if(response.ok) {
        throw new Error("Player not found");
      }

      const data = await response.json();
      setPlayerData(data);
    }
    catch(err) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        <a href="https://wynncraft.com" target="_blank">
          <img src={wynnLogo} className="logo" alt="wynn logo" />
        </a>
      </div>

      <h1>The Minecraft MMORPG</h1>
      {/* <h2>Enter a username</h2> */}
      <form onSubmit={fetchPlayer} className='search-form'>
        <input 
        type="text" 
        placeholder='Search a player...' 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='input-text'/>

        <button type='submit' disabled={loading}></button>
      </form>
    </>
  )
}

export default App