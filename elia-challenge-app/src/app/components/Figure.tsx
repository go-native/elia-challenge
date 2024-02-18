"use client";

import React from "react";
import { Figure as FigureType } from "../lib/domain/Figure";
import DOMPurify from "dompurify";
import circle from "/public/circle.svg";

type Props = {
  figure: FigureType;
};

export const Figure = ({ figure }: Props) => {
  const sanitizedSVG = figure.customSVG && DOMPurify.sanitize(figure.customSVG);
  const encodedSvg = sanitizedSVG && encodeURIComponent(sanitizedSVG);

  const svgURL = figure.customSVG
    ? `data:image/svg+xml;charset=utf-8,${encodedSvg}`
    : circle.src;

  return (
    <div
      style={{ backgroundImage: `url("${svgURL}")` }}
      className={`cursor-move h-24 w-24 bg-contain bg-center bg-no-repeat`}
    />
  );
};
