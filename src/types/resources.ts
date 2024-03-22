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
  favorite?: string | null;
}

export interface ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
  favorite?: string | null;
}

export interface IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
  favorite?: string | null;
}

export interface IFavorites {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
