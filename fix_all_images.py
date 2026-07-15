"""
Script para re-convertir TODAS las imágenes pesadas del proyecto.
- JPG → WebP LOSSY quality=90 (visualmente idéntico, MUCHO más liviano)
- PNG → WebP LOSSLESS (ya son más pequeñas así)
- Sobreescribe las .webp existentes que quedaron mal (lossless de JPG)
"""
import os
from PIL import Image

def convert_all(root_dir):
    log = open("fix_log.txt", "w", encoding="utf-8")
    
    for dirpath, _, filenames in os.walk(root_dir):
        # Saltar las imágenes del hero (ya están bien, son PNG→WebP)
        if 'upscayl_png_upscayl-lite-4x_4x' in dirpath:
            continue
        if 'heronuevo' in dirpath:
            continue
            
        for filename in filenames:
            filepath = os.path.join(dirpath, filename)
            lower = filename.lower()
            
            # Solo procesar imágenes originales
            if not (lower.endswith('.jpg') or lower.endswith('.jpeg') or lower.endswith('.png')):
                continue
                
            size_mb = os.path.getsize(filepath) / (1024 * 1024)
            
            # Solo convertir imágenes > 500KB
            if size_mb < 0.5:
                continue
            
            name, ext = os.path.splitext(filename)
            webp_path = os.path.join(dirpath, name + '.webp')
            
            try:
                with Image.open(filepath) as img:
                    if ext.lower() in ['.jpg', '.jpeg']:
                        # JPG → WebP LOSSY quality=90 (visualmente idéntico)
                        img.save(webp_path, 'webp', quality=90, method=4)
                        mode = "LOSSY q90"
                    else:
                        # PNG → WebP LOSSLESS
                        img.save(webp_path, 'webp', lossless=True)
                        mode = "LOSSLESS"
                
                new_size = os.path.getsize(webp_path) / (1024 * 1024)
                log.write(f"{mode} | {filename} ({size_mb:.2f}MB) -> {name}.webp ({new_size:.2f}MB)\n")
                log.flush()
            except Exception as e:
                log.write(f"ERROR | {filename}: {e}\n")
    
    log.close()

if __name__ == '__main__':
    convert_all(r"C:\Users\nancy\OneDrive\Escritorio\airtraing\public")
