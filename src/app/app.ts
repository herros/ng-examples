import { Component, signal } from '@angular/core';
import { TeamContainer } from '@features/teams/components/container/team-container';

@Component({
  selector: 'app-root',
  imports: [TeamContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('pool');
}
