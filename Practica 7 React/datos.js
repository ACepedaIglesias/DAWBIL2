// historyData.js
export const historyFlow = {
  inicio: {
    text: "¡Saludos, viajero del tiempo! Soy tu guía de Historia de España. ¿Qué época deseas explorar hoy?",
    options: [
      { id: "alandalus", label: "Al-Ándalus (711 - 1492)" },
      { id: "imperio", label: "El Imperio Español (S. XVI - XVII)" }
    ]
  },
  alandalus: {
    text: "Al-Ándalus fue el territorio de la península ibérica bajo poder musulmán. ¿Qué aspecto te interesa más?",
    options: [
      { id: "cordoba", label: "El Califato de Córdoba" },
      { id: "granada", label: "Reino Nazarí de Granada" }
    ]
  },
  imperio: {
    text: "Bajo los Austrias, el Imperio Español alcanzó su máxima expansión. ¿Sobre qué monarca quieres aprender?",
    options: [
      { id: "carlosv", label: "Carlos V" },
      { id: "felipeii", label: "Felipe II" }
    ]
  },
  cordoba: {
    text: "Proclamado por Abderramán III en el 929, fue una época de máximo esplendor cultural, científico y comercial. ¡Fin del recorrido!",
    options: []
  },
  granada: {
    text: "El último bastión musulmán en la península, famoso por la Alhambra, cayó en 1492 ante los Reyes Católicos. ¡Fin del recorrido!",
    options: []
  },
  carlosv: {
    text: "Carlos I de España y V de Alemania heredó un imperio inmenso y se enfrentó a los protestantes y al Imperio Otomano. ¡Fin del recorrido!",
    options: []
  },
  felipeii: {
    text: "En su imperio 'nunca se ponía el sol'. Estableció la capital en Madrid (1561) y construyó El Escorial. ¡Fin del recorrido!",
    options: []
  }
};