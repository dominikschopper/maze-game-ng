import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './game/board/board.component';
import { TileComponent } from './game/board/tile/tile.component';
import { SpaceComponent } from './game/board/tile/space/space.component';
import { WallComponent } from './game/board/tile/wall/wall.component';
import { CharacterComponent } from './game/board/tile/character/character.component';
import { HeroComponent } from './game/board/tile/hero/hero.component';
import { ArticleComponent } from './game/board/tile/article/article.component';
import { ExitComponent } from './game/board/tile/exit/exit.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    BoardComponent,
    TileComponent,
    SpaceComponent,
    WallComponent,
    CharacterComponent,
    HeroComponent,
    ArticleComponent,
    ExitComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
