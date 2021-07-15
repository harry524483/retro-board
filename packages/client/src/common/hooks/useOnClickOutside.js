import { useEffect, useRef } from 'react';

const useOnClickOutside = (handler) => {
  const ref = useRef();

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return [ref];
};

export default useOnClickOutside;
