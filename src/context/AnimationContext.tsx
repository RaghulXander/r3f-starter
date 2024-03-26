import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

type AnimationContextType = {
  animations: any[]; // Replace 'any[]' with the actual type of your animations
  selectedAnimation: string; // Replace 'string' with the actual type of your selected animation
  setAnimations: Dispatch<SetStateAction<any[]>>; // Replace 'any[]' with the actual type of your animations
  setSelectedAnimation: Dispatch<SetStateAction<string>>; // Replace 'string' with the actual type of your selected animation
};

const AnimationContext = createContext<AnimationContextType>({
  animations: [],
  selectedAnimation: '',
  setAnimations: () => {},
  setSelectedAnimation: () => {},
});

export const AnimationProvider: React.FC = ({ children }) => {
  const [animations, setAnimations] = useState<any[]>([]); // Replace 'any[]' with the actual type of your animations
  const [selectedAnimation, setSelectedAnimation] = useState<string>(''); // Replace 'string' with the actual type of your selected animation

  return (
    <AnimationContext.Provider value={{ animations, setAnimations, selectedAnimation, setSelectedAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationContext = (): AnimationContextType => useContext(AnimationContext);
