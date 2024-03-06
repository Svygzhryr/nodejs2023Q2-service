import { IDatabase } from 'src/types';

export const database: IDatabase = {
  user: [
    {
      id: '93851f2a-c4ca-48ca-bd5a-a06cdbffa211',
      login: 'Icarus',
      password: '12345',
      version: 0,
      createdAt: 1709715389803,
      updatedAt: 1709715389803,
    },
    {
      id: '5cad2fb3-dd10-4507-97fa-262cdc5485cb',
      login: 'Pegasus',
      password: '54323',
      version: 0,
      createdAt: 1709715464621,
      updatedAt: 1709715464621,
    },
  ],
  track: [],
  album: [],
  artist: [],
  favs: new Map(),
};
