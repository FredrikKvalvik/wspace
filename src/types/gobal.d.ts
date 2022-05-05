export {};

declare global {
  interface workspace {
    path: string;
    workSpace: string;
    links?: Array<string>;
  }
  type wsList = Array<workspace>;
}
