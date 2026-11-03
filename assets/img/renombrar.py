import os

# 1. Define la ruta de la carpeta que contiene las imágenes
carpeta = r"." 

# 2. Define las extensiones válidas para no afectar otros archivos
extensiones = ('.png', '.jpg', '.jpeg', '.webp')

# 3. Obtiene y ordena la lista de imágenes
archivos = [f for f in os.listdir(carpeta) if f.lower().endswith(extensiones)]
archivos.sort() 

# 4. Renombra secuencialmente
for i, archivo in enumerate(archivos, start=1):
    extension = os.path.splitext(archivo)[1]
    # Formato :02d crea nombres como 01.jpg, 02.jpg. Cambia a :03d si son más de 100.
    nuevo_nombre = f"{i:02d}{extension}" 
    
    ruta_antigua = os.path.join(carpeta, archivo)
    ruta_nueva = os.path.join(carpeta, nuevo_nombre)
    
    os.rename(ruta_antigua, ruta_nueva)

print(f"Se han renombrado {len(archivos)} imágenes con éxito.")