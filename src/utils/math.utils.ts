export const randomIntFromInterval = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

export const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);
