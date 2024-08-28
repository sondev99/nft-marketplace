export interface PriceData {
  dayOfWeek: string;
  price: number;
}

export const fakeData1: PriceData[] = [
  {
    dayOfWeek: 'Friday',
    price: 2.4,
  },
  {
    dayOfWeek: 'Thursday',
    price: 2.32,
  },
  {
    dayOfWeek: 'Wednesday',
    price: 2.25,
  },
];
