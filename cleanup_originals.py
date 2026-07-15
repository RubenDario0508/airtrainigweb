"""
Propuesta 2: Eliminar archivos originales (.jpg, .jpeg, .png) que ya tienen su .webp equivalente.
Conserva los que NO tienen .webp y los que son muy pequeños (íconos, logos < 500KB).
"""
import os

def cleanup(root_dir):
    log = open("cleanup_log.txt", "w", encoding="utf-8")
    total_saved = 0
    deleted_count = 0
    kept_count = 0
    
    for dirpath, _, filenames in os.walk(root_dir):
        # Saltar la carpeta del hero mejorado (solo tiene .webp, no hay duplicados)
        if 'upscayl_png_upscayl-lite-4x_4x' in dirpath:
            continue
        if 'heronuevo' in dirpath:
            continue
        
        # Obtener lista de archivos webp en esta carpeta
        webp_files = set()
        for f in filenames:
            if f.lower().endswith('.webp'):
                name_without_ext = os.path.splitext(f)[0].lower()
                webp_files.add(name_without_ext)
        
        for filename in filenames:
            lower = filename.lower()
            if not (lower.endswith('.jpg') or lower.endswith('.jpeg') or lower.endswith('.png')):
                continue
            
            name_without_ext = os.path.splitext(filename)[0].lower()
            filepath = os.path.join(dirpath, filename)
            size_bytes = os.path.getsize(filepath)
            size_mb = size_bytes / (1024 * 1024)
            
            # Si tiene equivalente .webp Y es mayor a 100KB, eliminar
            if name_without_ext in webp_files and size_bytes > 100 * 1024:
                os.remove(filepath)
                total_saved += size_mb
                deleted_count += 1
                log.write(f"DELETED | {os.path.relpath(filepath, root_dir)} ({size_mb:.2f} MB)\n")
            else:
                kept_count += 1
                reason = "no webp" if name_without_ext not in webp_files else "small (<100KB)"
                log.write(f"KEPT    | {os.path.relpath(filepath, root_dir)} ({size_mb:.2f} MB) - {reason}\n")
            
            log.flush()
    
    log.write(f"\n--- RESUMEN ---\n")
    log.write(f"Eliminados: {deleted_count} archivos\n")
    log.write(f"Conservados: {kept_count} archivos\n")
    log.write(f"Espacio liberado: {total_saved:.2f} MB\n")
    log.close()

if __name__ == '__main__':
    cleanup(r"C:\Users\nancy\OneDrive\Escritorio\airtraing\public")
