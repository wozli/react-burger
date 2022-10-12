import {useState} from "react";

export const useToggle = (initialState = false) => {
  const [isToggle, setIsToggle] = useState(initialState);

  const toggle = () => setIsToggle(previousState => !previousState);

  return { isToggle, toggle  };
};