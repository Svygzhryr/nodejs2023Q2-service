import { Module } from '@nestjs/common';

import { UserModule } from './resources/user/user.module';
import { TrackModule } from './resources/track/track.module';
import { AlbumModule } from './resources/album/album.module';
import { FavsModule } from './resources/favs/favs.module';
import { ArtistModule } from './resources/artist/artist.module';
import { AppController } from './app.controller';

@Module({
  imports: [UserModule, TrackModule, AlbumModule, FavsModule, ArtistModule],
  controllers: [AppController],
})
export class AppModule {}
