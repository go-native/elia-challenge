"use client";

import { Board } from "./components/Board";
import { Figure as FigureType } from "./lib/domain/Figure";
import { useEffect, useRef, useState } from "react";
import { getFigures, saveFigure, updateFigure } from "./lib/actions/figures";

export default function Home() {
  const [figures, setFigures] = useState<FigureType[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async function () {
      const _figures = await getFigures();
      setFigures(_figures);
    })();
  }, []);

  const createFigure = async (customSVG?: string) => {
    const figureToCreate: Omit<FigureType, "id"> = {
      position: {
        x: 0,
        y: 0,
      },
      customSVG
    };

    const newFigure = await saveFigure(figureToCreate);
    setFigures([...figures, newFigure]);
  }

  const changePosition = async (figure: FigureType, x: number, y: number) => {
    const updatedFigure = await updateFigure({ ...figure, position: { x, y } });
    setFigures(figures.map((f) => (f.id === updatedFigure.id ? updatedFigure : f)));
  };

  const handleUploadClick = () => {
    fileInputRef.current!.click();
  };

  const handleInputFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const svgContent = e.target?.result;
        createFigure(svgContent?.toString());
      };
      reader.readAsText(file);
    } else {
      console.error("Please upload a valid SVG file.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Elia Challenge</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button onClick={() => createFigure()}>Add figure</button>
            </li>
            <li>
              <button onClick={handleUploadClick}>Upload SVG</button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleInputFileChange}
                accept=".svg"
              />
            </li>
          </ul>
        </div>
      </div>
      <Board figures={figures} onDrop={(figure, x, y) => changePosition(figure, x, y)} />
    </main>
  );
}
