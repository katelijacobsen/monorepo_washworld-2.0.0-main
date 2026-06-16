"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import Icon from "./Icon";
import "../styles/snackbar.css";

interface SnackbarProps {
  message?: string;
  duration?: number;
  variant?: "success" | "error";
  onUndo?: () => void;
}

const Snackbar = ({
  message = "IT'S A ME! SNACKBACK!",
  duration = 3000, onUndo
}: SnackbarProps) => {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => {
      setLeaving(true);
    }, duration);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, duration + 300);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`snackbar bg-bg-dark w-[336px] flex justify-around items-center p-16 rounded-4 ${leaving ? "snackbar--leaving" : ""}`}
    >
      <div className="flex gap-4">
        <Icon iconName="circlecheck" style="text-primary-400" />
        <p className="text-surface-2 font-medium">{message}</p>
      </div>

      <Button
        buttonName="Fortryd"
        elementType="button"
        size="xs"
        type="tertiary"
        status="normal"
        onClick={onUndo}
      />
    </div>
  );
};

export default Snackbar;