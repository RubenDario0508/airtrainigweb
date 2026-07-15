import os

def update_code():
    # Read the mapping from the log
    replacements = []
    try:
        with open("converted_files.txt", "r", encoding="utf-8") as f:
            for line in f:
                if line.startswith("CONVERTED|"):
                    parts = line.strip().split('|')
                    if len(parts) == 3:
                        old_name = parts[1]
                        new_name = parts[2]
                        replacements.append((old_name, new_name))
    except FileNotFoundError:
        print("Log no encontrado")
        return

    # Directories to search
    search_dirs = [
        r"C:\Users\nancy\OneDrive\Escritorio\airtraing\src",
        r"C:\Users\nancy\OneDrive\Escritorio\airtraing\app",
        r"C:\Users\nancy\OneDrive\Escritorio\airtraing\components"
    ]
    
    for search_dir in search_dirs:
        if not os.path.exists(search_dir):
            continue
            
        for root, dirs, files in os.walk(search_dir):
            for file in files:
                if file.endswith(('.tsx', '.ts', '.js', '.jsx', '.css', '.scss')):
                    filepath = os.path.join(root, file)
                    
                    try:
                        with open(filepath, 'r', encoding='utf-8') as f:
                            content = f.read()
                            
                        new_content = content
                        changed = False
                        
                        for old_name, new_name in replacements:
                            if old_name in new_content:
                                new_content = new_content.replace(old_name, new_name)
                                changed = True
                                
                        if changed:
                            with open(filepath, 'w', encoding='utf-8') as f:
                                f.write(new_content)
                            print(f"Updated {filepath}")
                            
                    except Exception as e:
                        print(f"Failed to process {filepath}: {e}")

if __name__ == '__main__':
    update_code()
