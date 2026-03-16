import { useState, useEffect } from "react";

export function usePreloadImages(urls: string[]) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (urls.length === 0) return;

    let loadedCount = 0;

    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === urls.length) setLoaded(true);
      };
    });
  }, [urls]);

  return loaded;
}
