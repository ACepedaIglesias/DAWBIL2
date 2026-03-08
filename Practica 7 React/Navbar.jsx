import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  // useState: Controla si el menú móvil está abierto o no
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Evento: Alterna el estado del menú
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav style={{ padding: '1rem', background: '#8B0000', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Tiempos de España</h2>
        <button onClick={toggleMenu} style={{ cursor: 'pointer' }}>
          {isMenuOpen ? 'Cerrar Menú' : 'Abrir Menú'}
        </button>
      </div>

      {/* Renderizado Condicional Avanzado: Solo se muestra si isMenuOpen es true */}
      {isMenuOpen && (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
          <li><Link to="/" style={{ color: 'white' }}>Inicio</Link></li>
          <li><Link to="/chat" style={{ color: 'white' }}>Asistente Histórico</Link></li>
        </ul>
      )}
    </nav>
  );
}