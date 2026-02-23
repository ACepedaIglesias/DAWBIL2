import json
with open("files/datos.json", "r", encoding="utf-8") as f:
    datos = json.load(f)
print(datos)
print(datos["nombre"])
print(datos["hobbies"][1])