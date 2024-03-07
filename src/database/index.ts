import { IDatabase } from 'src/types';

export const database: IDatabase = {
  user: [
    {
      id: '93851f2a-c4ca-48ca-bd5a-a06cdbffa211',
      login: 'Icarus',
      password: '12345',
      version: 1,
      createdAt: 1709715389803,
      updatedAt: 1709715389803,
    },
    {
      id: '5cad2fb3-dd10-4507-97fa-262cdc5485cb',
      login: 'Pegasus',
      password: '54323',
      version: 1,
      createdAt: 1709715464621,
      updatedAt: 1709715464621,
    },
  ],
  track: [
    {
      id: '0ef8dc1b-b77c-4a13-8f89-bf861e709429',
      name: 'Sexualizer',
      artistId: '1a006280-09c0-480a-9196-9393b5035067',
      albumId: 'f0e3a451-1312-4ef2-98dd-fd95fce1afc2',
      duration: 299,
    },
    {
      id: '35d39a2a-fa38-444e-8fcf-252b74263d37',
      name: 'Miami Disco',
      artistId: '1a006280-09c0-480a-9196-9393b5035067',
      albumId: 'f0e3a451-1312-4ef2-98dd-fd95fce1afc2',
      duration: 271,
    },
  ],
  album: [],
  artist: [],
  favs: new Map(),
};
