import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DarklyService } from './services/darkly.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private darklyService: DarklyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

  }
}
