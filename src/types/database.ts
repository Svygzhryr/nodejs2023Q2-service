import { IAlbum, IArtist, IFavorites, ITrack, IUser } from './resources';

export interface IFavs {
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
