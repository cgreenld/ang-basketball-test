import { Injectable } from '@angular/core';
import { IPlayer } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  players: IPlayer[] = [{
    id: Math.random().toString(),
    name: 'Michael Jordan',
    points: 32292,
    championshipCount: 6,
    mvpCount: 6
  }, {
    id: Math.random().toString(),
    name: 'Kobe Bryant',
    points: 33683,
    championshipCount: 5,
    mvpCount: 1
  },
  {
    id: Math.random().toString(),
    name: 'LeBron James',
    points: 35367,
    championshipCount: 4,
    mvpCount: 3
  }];

  public addPlayer(player: IPlayer) {
    this.players.push(player);
  }

  public deletePlayer(id: string) {
    this.players = this.players.filter(player => player.id !== id);
  }
}
