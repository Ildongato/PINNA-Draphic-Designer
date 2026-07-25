export type Theme = "light" | "dark";
export type GridPlacement = { column:string; row:string; offset:string; mobileWidth:string; mobileAlign:"start"|"end" };
export type ProjectMedia = { src:string; width:number; height:number; alt:string };
export type Project = { slug:string; title:string; year:string; discipline:string; sector:string; summary:string; description:string; deliverables:string[]; cover:string; coverAlt:string; width:number; height:number; aspectRatio:number; dominantColor:string; palette:string[]; theme:Theme; grid:GridPlacement; gallery:ProjectMedia[] };
