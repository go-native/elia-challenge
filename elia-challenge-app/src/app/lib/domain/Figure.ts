export type Position = {
  x: number;
  y: number;
};

export type Figure = {
  id: string;
  position: Position;
  customSVG?: string;
};
