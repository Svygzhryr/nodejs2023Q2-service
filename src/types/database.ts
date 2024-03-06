import { IAlbum, IArtist, IFavorites, ITrack, IUser } from './resources';

export interface IDatabase {
  user: IUser[];
  track: ITrack[];
  album: IAlbum[];
  artist: IArtist[];
  favs: Map<string, IFavorites[]>;
}
