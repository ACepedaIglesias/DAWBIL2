import React, { useState, useEffect } from 'react';
import OptionSelector from './OptionSelector';
import { historyFlow } from './datos';

export default function Chat() {
  // states: Historial de mensajes y nodo actual del flujo guiado
  const [messages, setMessages] = useState([]);
  const [currentNode, setCurrentNode] = useState('inicio');
  const [isTyping, setIsTyping] = useState(true);

  // useEffect: Se ejecuta al cargar el componente o cambiar el nodo
  useEffect(() => {
    setIsTyping(true);
    const nodeData = historyFlow[currentNode];
    
    // Simulamos que el asistente está "pensando/escribiendo"
    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev, 
        { sender: 'bot', text: nodeData.text, options: nodeData.options }
      ]);
      setIsTyping(false);
    }, 800);

    // Limpieza del timeout (buena práctica de useEffect)
    return () => clearTimeout(timer);
  }, [currentNode]);

  // Evento: Manejador para avanzar en el flujo
  const handleUserChoice = (optionId) => {
    // 1. Buscamos el texto de la opción elegida para añadirlo como mensaje del usuario
    const currentOptions = historyFlow[currentNode].options;
    const selectedOption = currentOptions.find(o => o.id === optionId);
    
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: selectedOption.label }
    ]);

    // 2. Avanzamos al siguiente nodo en la historia
    setCurrentNode(optionId);
  };

  const handleReset = () => { // Otro evento
    setMessages([]);
    setCurrentNode('inicio');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3>Asistente Histórico</h3>
        <button onClick={handleReset}>Reiniciar Viaje</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Colecciones: Mapeando los mensajes */}
        {messages.map((msg, index) => (
          <div key={index} style={{
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: msg.sender === 'user' ? '#dcf8c6' : '#eee',
            padding: '10px',
            borderRadius: '10px',
            maxWidth: '80%'
          }}>
            <p style={{ margin: 0 }}>{msg.text}</p>
            
            {/* Renderizado condicional y Props: Mostramos opciones solo si es el último mensaje del bot */}
            {msg.sender === 'bot' && index === messages.length - 1 && !isTyping && (
              <OptionSelector 
                options={msg.options} 
                onSelectOption={handleUserChoice} 
              />
            )}
          </div>
        ))}
        
        {/* Renderizado condicional del indicador de escritura */}
        {isTyping && <div style={{ color: 'gray', fontSize: '0.9em' }}>El guía está escribiendo...</div>}
      </div>
    </div>
  );
}