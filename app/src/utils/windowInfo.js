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

  if (size[0] <= 425) {
    return "mobile";
  }
  if (size[0] <= 768) {
    return "tablet";
  }
  if (size[0] >= 1920) {
    return "large_screen";
  }
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