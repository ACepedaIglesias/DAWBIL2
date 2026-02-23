import pandas as pd
import numpy as np

df = pd.read_csv("files/300614-0-centros-educativos.csv", sep=";", encoding="latin1")
print(len(df) + 1)
contbri = 0
for i in range(len(df)):
    if df.startswith("Colegio Britanico") in df[:1]:
        contbri += 1
