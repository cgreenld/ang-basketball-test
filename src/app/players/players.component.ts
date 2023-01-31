import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { DarklyService } from '../services/darkly.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  crudButtonsShown: boolean = false;
  show: boolean;
  _subscription: any;


  constructor(
    private darklyService: DarklyService,
    private router: Router,
    public playerService: PlayerService,
    ) { 
  }

  addPlayer() {
    this.router.navigate(['/add-player']);
  }

  deletePlayer(id: string) {
    this.playerService.deletePlayer(id);
  }
  ngOnInit() {
    this.darklyService.flagsReady$.subscribe(() => {
      if (this.darklyService.getFlagBooleanValue("beta_users", false) === true)
        this.crudButtonsShown = true;
      else
        this.crudButtonsShown = false;
    }, error => {
      console.log('Error connecting to LaunchDarkly SDK');
    });
  }
}
