export interface IGame {
  readonly name: string;
  readonly salePrice: number;
  readonly cheapestPrice: number;
  readonly releaseDate: Date;
}

/* experiments with IGame data return */
export interface IGameConstructor {
  new(name: string, salePrice: number, cheapestPrice: number, releaseDate: Date): IGame;

  clone(): IGame;
}

export let IGame: IGameConstructor;