export interface IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: bigint | number;
  updatedAt: bigint | number;
}

export interface IArtist {
  id: string;
  name: string;
  grammy: boolean;
}

export interface ITrack {
  id: string;
  name: string;
  artist_id: string | null;
  album_id: string | null;
  duration: number;
}

export interface IAlbum {
  id: string;
  name: string;
  year: number;
  artist_id: string | null;
}

export interface IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}
