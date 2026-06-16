"use client";

import { useRef, useState } from "react";

type SheetState = "open" | "hidden";

export function useDrag(peek = 60) {
  const [sheetState, setSheetState] = useState<SheetState>("open");
  const [dragDelta, setDragDelta] = useState(0);
  const isDragging = useRef(false);
  const startY = useRef(0);

  function onPointerDown(e: React.PointerEvent<HTMLElement>) {
    isDragging.current = true;
    startY.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId); 
  }

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (!isDragging.current) return;
    setDragDelta(e.clientY - startY.current);
  }

  function onPointerUp() {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (sheetState === "open" && dragDelta > 60) setSheetState("hidden");
    else if (sheetState === "hidden" && dragDelta < -60) setSheetState("open");
    setDragDelta(0);
  }

  const base = sheetState === "open" ? "0%" : `calc(100% - ${peek}px)`;
  const pull = sheetState === "open" ? Math.max(0, dragDelta) : Math.min(0, dragDelta);

  return {
    sheetState,
    sheetStyle: {
      transform: `translateY(calc(${base} + ${pull}px))`,
      transition: isDragging.current ? "none" : undefined,
    } as React.CSSProperties,
    handleProps: { onPointerDown, onPointerMove, onPointerUp },
  };
}