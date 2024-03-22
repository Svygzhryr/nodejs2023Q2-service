import { IAlbum, IArtist, ITrack, IUser } from './resources';

export interface IFavs {
  id?: string;
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

export interface IDatabase {
  user: IUser[];
  track: ITrack[];
  album: IAlbum[];
  artist: IArtist[];
  favs: IFavs;
}
