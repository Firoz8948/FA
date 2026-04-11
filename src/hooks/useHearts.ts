"use client";

import { useState, useEffect } from "react";

export const useHearts = () => {
  const [enabled, setEnabled] = useState(true);

  const toggleHearts = () => {
    const newState = !enabled;
    setEnabled(newState);
    localStorage.setItem("hearts-enabled", JSON.stringify(newState));
  };

  useEffect(() => {
    const saved = localStorage.getItem("hearts-enabled");
    if (saved !== null) {
      setEnabled(JSON.parse(saved));
    }
  }, []);

  return { enabled, toggleHearts };
};
