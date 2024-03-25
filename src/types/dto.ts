export interface ICreateUserDto {
  login: string;
  password: string;
}

export interface IUpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface ICreateTrackDto {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface IUpdateTrackDto {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface ICreateAlbumDto {
  name: string;
  year: number;
  artistId: string | null;
}

export interface IUpdateAlbumDto {
  name: string;
  year: number;
  artistId: string | null;
}

export interface ICreateArtistDto {
  name: string;
  grammy: boolean;
}

export interface IUpdateArtistDto {
  name: string;
  grammy: boolean;
}
