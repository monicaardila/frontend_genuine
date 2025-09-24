import React from 'react';

// Wrapper para iconos que previene errores de viewBox inválidos
const IconWrapper = ({ icon: Icon, className, ...props }) => {
  if (!Icon) return null;
  
  return (
    <Icon 
      className={className} 
      {...props}
      style={{
        ...props.style,
        // Forzar viewBox válido si es necesario
        viewBox: props.viewBox || "0 0 24 24"
      }}
    />
  );
};

export default IconWrapper;
