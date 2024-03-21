import { IAlbum, IArtist, ITrack, IUser } from './resources';

export interface IFavs {
  id?: number;
  artists?: string;
  albums?: string;
  tracks?: string;
}

export interface IDatabase {
  user: IUser[];
  track: ITrack[];
  album: IAlbum[];
  artist: IArtist[];
  favs: IFavs;
}
