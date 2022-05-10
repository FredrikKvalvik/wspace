export {};

declare global {
  interface workspace {
    path: string;
    workSpace: string;
    links: string[];
  }
  type wsList = workspace[];

  interface argv {
    _:string[],
    [key:string]: boolean | string[] | string
  }
}
