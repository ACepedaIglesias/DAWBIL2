import json
with open("files/persona.json","r", encoding="utf-8") as f:
    datos = json.load(f)
print(datos)
datos["edad"] = 29
datos["ciudad"] = "Madrid"
with open("files/persona.json","w", encoding="utf-8") as f:
    json.dump(datos, f, indent=4, ensure_ascii=False)
print("Fichero actualizado")