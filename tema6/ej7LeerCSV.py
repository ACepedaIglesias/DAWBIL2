import csv
with open("files/alumnos.csv","r",encoding="utf-8") as f:
    lector = csv.reader(f)
    for fila in lector:
        print(f"Nombre: {fila[0]}, Edad: {fila[1]},Ciudad: {fila[2]}")

import pandas as pd
#panda integra en la misma linea el with y el close
df = pd.read_csv("files/alumnos.csv")
print("Leemos las primeras 5 filas")
print(df.head())
print("La media de edad de los alumnos es:", df["edad"].mean())
