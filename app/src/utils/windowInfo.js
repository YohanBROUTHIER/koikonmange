import { useLayoutEffect, useState } from 'react';

export function useSupportType() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  let displaySize = size[0];
  if (displaySize === 0 && size[1] === 0) {
    displaySize = window.screen.width;
  }

  if (displaySize <= 425) return "mobile";
  if (displaySize <= 768) return "tablet";
  if (displaySize >= 1920) return "large_screen";
  return "desktop";
}

export function getSupportType() {
  const size = window.innerWidth;

  if (size <= 425) {
    return "mobile";
  }
  if (size <= 768) {
    return "tablet";
  }
  if (size >= 1920) {
    return "large_screen";
  }
  return "desktop";
}