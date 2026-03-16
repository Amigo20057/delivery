import { useState } from "react";

type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function LazyImage({
  src,
  alt,
  className,
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      {...props}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-500 ease-in-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
