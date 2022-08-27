import { Area } from "react-easy-crop";

export const createImage = async (url: string) => {
  const imagePromise = new Promise((resolve, reject) => {
    const image: HTMLImageElement = new Image();
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.src = url;
  });

  return imagePromise;
};

export const getCroppedImage = async (imageSrc: string, croppedArea: Area) => {
  const image = (await createImage(imageSrc)) as HTMLImageElement;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  // set canvas size to match the bounding box of the image
  canvas.width = image.width;
  canvas.height = image.height;

  // ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  // extract the cropped image using these values
  const data = ctx.getImageData(
    croppedArea.x,
    croppedArea.y,
    croppedArea.width,
    croppedArea.height
  );

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = croppedArea.width;
  canvas.height = croppedArea.height;
  ctx.putImageData(data, 0, 0);
  const croppedImg = canvas.toDataURL("image/jpeg");

  return croppedImg;
};
