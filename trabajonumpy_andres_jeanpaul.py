
import numpy as np
import matplotlib.pyplot as plt
# Cargar el archivo CSV con el delimitador correcto (punto y coma)
bombero = np.loadtxt('./ActuacionesBomberos_2025.csv', skiprows=1, delimiter=';', dtype=str)
columnas_numericas = bombero[:, 4:]
columnas_numericas = np.where(columnas_numericas == '', '0', columnas_numericas).astype(float)
#funcion de normalizacion
def normalizar_min_max(datos):
    minimos = np.min(datos, axis=0)
    maximos = np.max(datos, axis=0)
    rango = maximos - minimos
    rango = np.where(rango == 0, 1, rango)  # Evitar división por cero
    return (datos - minimos) / rango

datos_normalizados = normalizar_min_max(columnas_numericas)


medoct = bombero[0:22, 4:]  # Filas de octubre, columna a partir de la coumna numero de distrito

# Convertir a números para calcular la media
medoctpamedia = medoct.astype(float)
mediaactuacionesoctubre = np.mean(medoctpamedia)
print(f"\nLa media de actuaciones de bomeros en el mes de Octubre: {mediaactuacionesoctubre:.0f}")
print(f"\n Rangos normalizados: {normalizar_min_max(medoctpamedia)}")

# Actuaciones totales en lo que llevamos de año
sumatotaldeactuaciones2025 = bombero[:, 4:]
# Reemplazar vacíos con '0' antes de convertir
sumatotaldeactuaciones2025 = np.where(sumatotaldeactuaciones2025 == '', '0', sumatotaldeactuaciones2025).astype(float)
total2025 = np.sum(sumatotaldeactuaciones2025)

print(f"\nEl numero total de actuaciones en 2025 es de: {total2025:.0f}")
print(f"\n Rangos normalizados: {normalizar_min_max(sumatotaldeactuaciones2025)}")

filaspuentevallecas = bombero[bombero[:, 2] == 'PUENTE VALLECAS']
# Extraer la columna SERVICIOS VARIOS (columna 10)
serviciosvariospv = filaspuentevallecas[:, 10]
# Convertir en float
serviciosvariospv = np.where(serviciosvariospv == '', '0', serviciosvariospv).astype(float)
# Sumar todos los servicios varios de Puente de Vallecas
totalserviciosvarios = np.sum(serviciosvariospv)

print(f"\nActuaciones con el pretexto de servicios varios en el distrito de Puente de Vallecas: {totalserviciosvarios:.0f}")
print(f"\n Rangos normalizados: {normalizar_min_max(sumatotaldeactuaciones2025)}")

# menor cantidad de actuaciones por fuego, utilizando el numero de distrito en vez del nombre, en usera
filasusera = bombero[bombero[:, 3] == '12']
intervencionfuegos = filasusera[:, 5]
intervencionfuegos = np.where(intervencionfuegos == '', '0', intervencionfuegos).astype(float)
menosfuegosusera= np.min(intervencionfuegos)
print(f"\nLa menor cantidad de actuaciones por fuego en Usera fue: {menosfuegosusera:.0f}")
print(f"\n Rangos normalizados: {normalizar_min_max(sumatotaldeactuaciones2025)}")

# Extraer columnas necesarias
distritos = bombero[:, 2]
fuegos = bombero[:, 4].astype(float)
danos_construccion = bombero[:, 5].astype(float)
salvamentos = bombero[:, 6].astype(float)
incidentes = bombero[:, 8].astype(float)


# Tomamos los primeros 10 distritos para no saturar las gráficas
distritos = distritos[:10]
fuegos = fuegos[:10]
danos_construccion = danos_construccion[:10]
salvamentos = salvamentos[:10]
incidentes = incidentes[:10]


# Gráfico Dos líneas
plt.plot(distritos, fuegos, label="Fuegos", marker="o")
plt.plot(distritos, salvamentos, label="Salvamentos y Rescates", marker="s")
plt.xlabel("Distrito")
plt.ylabel("Número de actuaciones")
plt.title("Comparación de Fuegos y Salvamentos por Distrito")
plt.legend()
plt.grid(True)
plt.xticks(rotation=45)
plt.show()
plt.close()


# Gráfico Puntos individuales
plt.scatter(distritos, fuegos)
plt.xlabel("Distrito")
plt.ylabel("Número de fuegos")
plt.title("Fuegos por Distrito (Gráfico de puntos)")
plt.grid(True)
plt.xticks(rotation=45)
plt.show()



#Gráfico de barras (bar)
plt.bar(distritos, fuegos)
plt.xlabel("Distrito")
plt.ylabel("Número de fuegos")
plt.title("Fuegos por distrito")
plt.xticks(rotation=45)
plt.grid(True)
plt.show()

# Gráfico Tres Elementos
plt.plot(distritos, fuegos, 'r--',               # Rojo discontinua → fuegos
         distritos, salvamentos, 'bs',           # Azul con marcadores cuadrados → salvamentos
         distritos, incidentes, 'g^')            # Verde con triángulos → daños por agua
plt.xlabel("Distrito")
plt.ylabel("Número de actuaciones")
plt.title("Actuaciones de Bomberos por Distrito")
plt.legend(["Fuegos", "Salvamentos", "Incidentes"])
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
plt.close()

# Extraer las columnas que necesitamos
fuegos_total = bombero[:, 4].astype(float)
salvamentos_total = bombero[:, 6].astype(float)


# Gráfico scatter
plt.figure(figsize=(8, 5))
plt.scatter(fuegos_total, salvamentos_total, c='green', label="Distritos")
plt.xlabel("Número de Fuegos")
plt.ylabel("Número de Salvamentos y Rescates")
plt.title("Relación entre Fuegos y Salvamentos en Distritos (2025)")
plt.legend()
plt.grid(True)
plt.show()


# Gráfica Histograma
plt.hist(danos_construccion, color='skyblue', edgecolor='black')
plt.xlabel("Número de daños en construcción")
plt.ylabel("Frecuencia")
plt.title("Distribución de daños en construcción (Histograma)")
plt.grid(True)
plt.show()



