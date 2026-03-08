// Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Descubre la Historia de España</h1>
      <p>Un viaje interactivo por nuestro pasado.</p>
      <button 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => navigate('/chat')}
        style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: hover ? '#A52A2A' : '#8B0000', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Comenzar la Aventura
      </button>
    </div>
  );
}