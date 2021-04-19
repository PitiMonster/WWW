from os import listdir
from os.path import isfile, join
from PIL import Image

images = [Image.open(f'fotki/{f}') for f in listdir("fotki") if isfile(join("fotki", f))]

print(images[0].filename)

for img in images:
    res_img = img.resize((200, 100))
    name = img.filename.split(".")[0]
    name2 = name.split("/")[-1]
    img_type = img.filename.split(".")[-1]
    res_img.save("fotki2/"+name2+"."+img_type)