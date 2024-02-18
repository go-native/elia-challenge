import axios from "axios";
import { Figure } from "../domain/Figure";

const BACKEND_URL = process.env["NEXT_PUBLIC_BACKEND_URL"] || "";

export const getFigures = async () =>
  await axios
    .get(`${BACKEND_URL}/figures`)
    .then<Figure[]>((response) => response.data);

export const saveFigure = async (figure: Omit<Figure, "id">) =>
  axios
    .post(`${BACKEND_URL}/figures`, figure)
    .then<Figure>((response) => response.data);

export const updateFigure = async (figure: Figure) =>
  axios
    .put(`${BACKEND_URL}/figures/${figure.id}`, figure)
    .then<Figure>((response) => response.data);
