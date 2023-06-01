import React from 'react';

interface NavigationContextType {
  basename: string;
}

const NavigationContext = React.createContext<NavigationContextType | null>(null);

export default NavigationContext;
