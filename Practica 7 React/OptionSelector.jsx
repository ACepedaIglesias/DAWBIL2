import React, { useState } from 'react';

// Props: Recibe un array de opciones y la función para manejar el clic
export default function OptionSelector({ options, onSelectOption }) {
  // useState: Guarda temporalmente el ID de la opción clicada para animación/feedback
  const [clickedId, setClickedId] = useState(null);

  const handleClick = (id) => {
    setClickedId(id);
    // Retrasamos un poco el avance para que el usuario vea qué pulsó
    setTimeout(() => {
      onSelectOption(id);
      setClickedId(null);
    }, 400); 
  };

  // Renderizado condicional para cuando no hay opciones (fin del flujo)
  if (!options || options.length === 0) {
    return <div style={{ fontStyle: 'italic', color: 'gray' }}>Conversación finalizada.</div>;
  }

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
      {/* Colecciones: Iteramos sobre el array de opciones */}
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => handleClick(opt.id)} // Evento
          style={{
            padding: '10px',
            backgroundColor: clickedId === opt.id ? '#FFD700' : '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}