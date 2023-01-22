import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IPlayer } from '../models/player.model';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent {

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    const player: IPlayer = {
      id: Math.random().toString(),
      name: form.value.name,
      championshipCount: form.value.championships,
      points: form.value.points,
      mvpCount: form.value.mvpTitles
    };
    this.playerService.addPlayer(player);
    this.router.navigate(['/players']);
  }
}
