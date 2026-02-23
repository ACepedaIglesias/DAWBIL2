import json
persona = {
    "nombre": "Mariano",
    "edad": 22,
    "profesión":"CM",
}
with open("files/persona.json","w") as f:
    json.dump(persona, f, indent=4, ensure_ascii=False)
print("Fichero json correctamente generado")