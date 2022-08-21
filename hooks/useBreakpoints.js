import { useState, useEffect } from 'react';

export default function useDimensions() {
  const [dimensions, setDimensions] = useState({
    w: undefined,
    h: undefined,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      console.log('WINDOW IS UNDEFINED');
      return;
    }

    const detectSize = () => {
      setDimensions({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };

    window.addEventListener('resize', detectSize);

    return () => {
      console.log('REMOVE EVENT LISTENER');
      window.removeEventListener('resize', detectSize);
    };
  }, []);

  return {
    sm: dimensions.w <= 640,
    md: dimensions.w >= 641 && dimensions.w <= 768,
    lg: dimensions.w >= 769 && dimensions.w <= 1024,
    xl: dimensions.w >= 1025 && dimensions.w <= 1280,
    '2xl': dimensions.w >= 1281,
  };
}
