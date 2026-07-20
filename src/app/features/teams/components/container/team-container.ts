import { Component, inject, OnInit } from '@angular/core';
import { TeamService } from '@features/teams/services/team-service';
import { TeamStoreFacade } from '@features/teams/services/team-store-facade';
import { TeamStore } from '@features/teams/store/team.store';
import { Teams } from '../display/teams';

@Component({
  selector: 'app-team-container',
  imports: [Teams],
  templateUrl: './team-container.html',
  styleUrl: './team-container.scss',
  providers: [TeamStore, TeamStoreFacade, TeamService],
})
export class TeamContainer implements OnInit {
  protected readonly facade = inject(TeamStoreFacade);
  protected teams = this.facade.teams;
  protected selectedTeam = this.facade.selectedTeam;

  ngOnInit(): void {
    this.facade.title = 'Teams';
  }
}
