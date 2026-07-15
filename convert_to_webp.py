import os
from PIL import Image

def convert_png_to_webp(folder_path):
    print(f"Buscando imágenes en: {folder_path}")
    
    if not os.path.exists(folder_path):
        print("La ruta especificada no existe.")
        return

    count = 0
    for filename in os.listdir(folder_path):
        if filename.lower().endswith('.png'):
            png_path = os.path.join(folder_path, filename)
            # Cambiar la extensión del archivo a .webp
            webp_filename = os.path.splitext(filename)[0] + '.webp'
            webp_path = os.path.join(folder_path, webp_filename)
            
            try:
                # Abrir y convertir la imagen
                with Image.open(png_path) as img:
                    # Usar lossless=True para asegurar 0% pérdida de calidad
                    img.save(webp_path, 'webp', lossless=True)
                print(f"Convertido sin pérdida: {filename} -> {webp_filename}")
                count += 1
            except Exception as e:
                print(f"Error al convertir {filename}: {e}")
                
    print(f"\nProceso completado. Se han convertido {count} imágenes a WebP.")

if __name__ == '__main__':
    # Ruta donde se encuentran las imágenes PNG
    target_folder = r"C:\Users\nancy\OneDrive\Escritorio\airtraing\public\mejorahero\upscayl_png_upscayl-lite-4x_4x"
    convert_png_to_webp(target_folder)
