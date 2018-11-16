export interface ICheapSharkResponse {
  readonly internalName: string;
  readonly title: string;
  readonly metacriticLink: string;
  readonly dealID: string;
  readonly storeID: string;
  readonly gameID: string;
  readonly salePrice: string;
  readonly normalPrice: string;
  readonly isOnSale: string;
  readonly savings: string;
  readonly metacriticScore: string;
  readonly steamRatingText: string;
  readonly steamRatingPercent: string;
  readonly steamRatingCount: string;
  readonly steamAppID: string;
  readonly releaseDate: number;
  readonly lastChange: number;
  readonly dealRating: string;
  readonly thumb: string;
}