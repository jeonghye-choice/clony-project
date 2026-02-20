from PIL import Image
import os

def remove_background_better(input_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Check for white background with higher tolerance and wider range
            # Also checking for light grays that might be shadows
            if item[0] > 220 and item[1] > 220 and item[2] > 220:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
        
        img.putdata(newData)
        # Verify if any pixels needed to be cleaned up, maybe use a floodfill approach if this is too aggressive
        # For now, let's try the simple threshold but slightly more aggressive on 'near white'
        
        img.save(input_path, "PNG")
        print(f"Processed: {input_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

assets = [
    "public/assets/glass/scan.png",
    "public/assets/glass/cream.png",
    "public/assets/glass/shield.png"
]

for asset in assets:
    if os.path.exists(asset):
        remove_background_better(asset)
    else:
        print(f"File not found: {asset}")
