import {useState} from "react";

export const useToggle = (initialState = false) => {
  const [isToggle, setIsToggle] = useState(initialState);

  const open = () => {
    setIsToggle(true);
  };

  const close = () => {
    setIsToggle(false);
  };

  const toggle = () => (isToggle ? close() : open());

  return { isToggle, open, close, toggle };
};