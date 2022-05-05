export {};

declare global {
  interface workspace {
    path: String;
    workSpace: String;
    links?: Array<String>;
  }
  type wsList = Array<workspace>;
}
