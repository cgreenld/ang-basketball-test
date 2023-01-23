import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { LDClient } from 'launchdarkly-js-client-sdk';
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
    //   this.show = darklyService.flags['beta_users'];
    //   this._subscription = darklyService.flagChange.subscribe((flags) => {
    //   this.show = flags['beta_users'].current;
    // })
  }

  addPlayer() {
    this.router.navigate(['/add-player']);
  }

  deletePlayer(id: string) {
    this.playerService.deletePlayer(id);
  }
  ngOnInit() {
    this.darklyService.sdkReady$.subscribe(() => {
      const treatment = this.darklyService.ldClient.variation("beta_users",false);
      console.log('treatment:', treatment)

      if (treatment === true)
        this.crudButtonsShown = true;
      else
        this.crudButtonsShown = false;
    }, error => {
      console.log('Error connecting to LaunchDarkly SDK');
    });
  }
}
