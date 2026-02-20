from PIL import Image
import os
import sys

def remove_white_bg(input_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Change all white (also shades of whites)
            # Find all pixels that are near white
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
        
        img.putdata(newData)
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
        remove_white_bg(asset)
    else:
        print(f"File not found: {asset}")
