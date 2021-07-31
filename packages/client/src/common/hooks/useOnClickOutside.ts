import { useEffect, useRef } from 'react';

const useOnClickOutside = <T extends HTMLElement>(handler: Function) => {
  const ref = useRef<T>(null);

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
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
