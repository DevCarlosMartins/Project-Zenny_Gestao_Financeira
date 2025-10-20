import { useState, useEffect } from 'react';

export const useSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(() => {
    // Recupera o estado do menu do localStorage
    const saved = localStorage.getItem('sidebar-expanded');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    
    // Salva o estado do menu no localStorage
    localStorage.setItem('sidebar-expanded', JSON.stringify(isExpanded));
    
    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [isExpanded]);

  const toggle = () => setIsExpanded(prev => !prev);
  const close = () => setIsExpanded(false);

  return { isExpanded, toggle, close };
};
