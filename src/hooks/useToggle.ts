import {useState} from "react";

export const useToggle = (initialState:boolean = false): { isToggle: boolean, toggle: () => void } => {
  const [isToggle, setIsToggle] = useState<boolean>(initialState);

  const toggle = () => setIsToggle(previousState => !previousState);

  return { isToggle, toggle  };
};