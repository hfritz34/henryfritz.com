import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [isResizing, setIsResizing] = useState(false);
  let resizeTimer;

  useEffect(() => {
    const handleResize = () => {
      // Add resizing class to body for performance optimization
      document.body.classList.add('resizing');
      setIsResizing(true);

      // Clear existing timer
      clearTimeout(resizeTimer);

      // Update window size
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Remove resizing class after resize ends
      resizeTimer = setTimeout(() => {
        document.body.classList.remove('resizing');
        setIsResizing(false);
      }, 150);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Breakpoint detection
  const breakpoints = {
    xs: windowSize.width < 380,
    sm: windowSize.width >= 380 && windowSize.width < 640,
    md: windowSize.width >= 640 && windowSize.width < 768,
    lg: windowSize.width >= 768 && windowSize.width < 1024,
    xl: windowSize.width >= 1024 && windowSize.width < 1280,
    '2xl': windowSize.width >= 1280,
  };

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  return {
    windowSize,
    isResizing,
    breakpoints,
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useResponsive;