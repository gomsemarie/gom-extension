import { KeyboardEventHandler, useRef, useState } from "react";

export const useKeyEvent = <T>() => {
  const keyListRef = useRef<string[]>([]);

  const keyDownHandler: KeyboardEventHandler<T> = (e) => {
    if (!keyListRef.current.includes(e.key)) {
      keyListRef.current = [...keyListRef.current, e.key];
    }
  };

  const keyUpHandler: KeyboardEventHandler<T> = (e) => {
    keyListRef.current = keyListRef.current.filter((key) => key !== e.key);
  };

  return {
    keyListRef,
    props: { onKeyDown: keyDownHandler, onKeyUp: keyUpHandler },
  };
};
