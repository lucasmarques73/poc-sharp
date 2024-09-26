const sharp = require("sharp");

const imageUrl =
  "https://images.pexels.com/photos/28199959/pexels-photo-28199959/free-photo-of-the-old-man-of-storr-skye-scotland.jpeg";

const resizeImageToFile = async (imageBuffer) => {
  const info = await sharp(imageBuffer)
    .jpeg({ quality: 10 })
    .toFile("resized.jpg");

  console.log(JSON.stringify({ info }, null, 2));
};

const resizeImageToBuffer = async (imageBuffer) => {
  const data = await sharp(imageBuffer).jpeg({ quality: 10 }).toBuffer();

  return data;
};

const main = async () => {
  const image = await fetch(imageUrl);
  const imageBuffer = await image.arrayBuffer();
  await resizeImageToFile(imageBuffer);
  const resizedImageBuffer = await resizeImageToBuffer(imageBuffer);

  const resizedImageBase64 = Buffer.from(resizedImageBuffer).toString('base64')

  console.log({resizedImageBase64})
};

main()
  .then(() => console.log("ok"))
  .catch((e) => console.log("erro", e.message));
