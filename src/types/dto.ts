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
