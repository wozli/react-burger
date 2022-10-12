import {useState} from "react";

export const useToggle = (initialState = false) => {
  const [isToggle, setIsToggle] = useState(initialState);

  const open = () => {
    setIsToggle(previousState => !previousState);
  };

  const close = () => {
    setIsToggle(previousState => !previousState);
  };

  const toggle = () => (isToggle ? close() : open());

  return { isToggle, toggle  };
};