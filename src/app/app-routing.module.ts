import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { AddPlayerComponent } from './add-player/add-player.component';

const routes: Routes = [
  {
    path: 'players',
    component: PlayersComponent
  },
  {
    path: 'add-player',
    component: AddPlayerComponent
  },
  {
    path: '**',
    redirectTo: 'players'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
