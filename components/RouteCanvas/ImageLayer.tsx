import React, { useEffect, useState } from "react";
import { Image, Layer } from "react-konva";
import useImage from "use-image";

interface ImageLayerProps {
  imageUrl: string;
}

const ImageLayer = ({ imageUrl }: ImageLayerProps) => {
  const [image] = useImage(imageUrl);

  return <Image image={image} />;
};

export default ImageLayer;
