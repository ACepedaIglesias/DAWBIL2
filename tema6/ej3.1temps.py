import csv

with open("files/temperaturas.csv","r",encoding="utf-8") as f:
    archivocsv = csv.reader(f)
    next(archivocsv)
    Temperaturas = 20.0
    for Temperatura_C in archivocsv:
        temperatura_actual = float(Temperatura_C[1])
        if temperatura_actual > Temperaturas:
            with open ("files/temperaturas20mas.txt","a",encoding="utf-8") as f2:
                f2.writelines(f"\n {Temperatura_C[1]}")
                print("Escrito")