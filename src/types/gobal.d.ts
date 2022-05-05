export {};

declare global {
  interface workspace {
    path: string;
    workSpace: string;
    links: string[];
  }
  type wsList = workspace[];
}
