import sys
from PIL import Image

def recolor_image(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            r, g, b, a = item
            
            # If the pixel is completely transparent, just keep it
            if a == 0:
                newData.append(item)
                continue
                
            # Check if it's primarily red
            # A typical red in the logo will have high R and low G/B
            if r > 100 and r > g * 1.3 and r > b * 1.3:
                # It's red, keep it
                newData.append((r, g, b, a))
            else:
                # It's blue/dark blue (eagle or text), change to white
                # Maintain the original alpha for smooth edges
                # For anti-aliased edges of the dark blue, making them white with the same alpha looks perfect
                newData.append((255, 255, 255, a))
                
        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    recolor_image("public/icon.png", "public/icon_white.png")
