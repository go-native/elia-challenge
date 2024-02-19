"use client";

import React from "react";
import Draggable from "react-draggable";
import { Figure as FigureType } from "../lib/domain/Figure";
import { Figure } from "./Figure";

type Props = {
  figures: FigureType[];
  onDrop: (figure: FigureType, x: number, y: number) => void;
};

export const Board = ({ figures, onDrop }: Props) => {

  const handleDragStop = (e: any, data: any, figure: FigureType) => {
    const { x, y } = data;
    onDrop(figure, x, y);
  };

  return (
    <div className="w-full bg-neutral relative flex-1">
      {figures.map((figure) => (
        <Draggable
          key={figure.id}
          bounds={'parent'}
          onStop={(e, data) => handleDragStop(e, data, figure)}

          defaultPosition={{ x: figure.position.x, y: figure.position.y }}
        >
          <div className="absolute">
            <Figure figure={figure} />
          </div>
        </Draggable>
      ))}
    </div>
  );
};
