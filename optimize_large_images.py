import os
from PIL import Image

def optimize_images(root_dir):
    log_file = open("converted_files.txt", "w", encoding="utf-8")
    log_file.write("Iniciando conversión de imágenes grandes a WebP sin pérdida...\n")
    
    for dirpath, _, filenames in os.walk(root_dir):
        if 'heronuevo' in dirpath or 'upscayl_png_upscayl-lite-4x_4x' in dirpath:
            continue
            
        for filename in filenames:
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(dirpath, filename)
                try:
                    size_mb = os.path.getsize(file_path) / (1024 * 1024)
                    
                    if size_mb > 1.0:
                        name, _ = os.path.splitext(filename)
                        webp_filename = name + '.webp'
                        webp_path = os.path.join(dirpath, webp_filename)
                        
                        if not os.path.exists(webp_path):
                            with Image.open(file_path) as img:
                                img.save(webp_path, 'webp', lossless=True)
                            log_file.write(f"CONVERTED|{filename}|{webp_filename}\n")
                            log_file.flush()
                except Exception as e:
                    log_file.write(f"Error procesando {filename}: {e}\n")
    
    log_file.close()

if __name__ == '__main__':
    public_dir = r"C:\Users\nancy\OneDrive\Escritorio\airtraing\public"
    optimize_images(public_dir)
