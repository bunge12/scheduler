import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = (newMode, replace) => {
    if (replace) {
      setMode(newMode)
      setHistory(history)
    } else {
      setHistory([...history, newMode])
      setMode(newMode)
    }

  }

  const back = () => {

    if (history.length > 1) {
      history.pop()
      const lastItem = history[history.length - 1]
      setMode(lastItem)
      setHistory(history)
    }

  }
  return { mode, transition, back };
}