import { ICheapSharkDealResponse } from '../interfaces/cheapSharkDealResponse.interface';

export const dealResponse: ICheapSharkDealResponse = {
  gameInfo: {
    storeID: '1',
    gameID: '114',
    name: 'Grand Theft Auto: San Andreas',
    steamAppID: '12120',
    salePrice: '14.99',
    retailPrice: '14.99',
    steamRatingText: 'Very Positive',
    steamRatingPercent: '88',
    steamRatingCount: '23957',
    metacriticScore: '93',
    metacriticLink: '/game/pc/grand-theft-auto-san-andreas',
    releaseDate: 1118102400,
    publisher: 'N/A',
    steamworks: '1',
    thumb:
      'https://steamcdn-a.akamaihd.net/steam/apps/12120/capsule_sm_120.jpg?t=1543431179',
  },
  cheaperStores: [
    {
      dealID: 'Tw6QuKrpKlCoe4hebLbEJPCjtSs0kK84RsxeDjiocHw%3D',
      storeID: '23',
      salePrice: '12.59',
      retailPrice: '14.99',
    },
  ],
  cheapestPrice: { price: '2.99', date: 1432315105 },
};
