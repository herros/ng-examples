import { Component, input, output } from '@angular/core';
import { Team } from '@models/team';

@Component({
  selector: 'app-teams',
  imports: [],
  templateUrl: './teams.html',
  styleUrl: './teams.scss',
})
export class Teams {
  teams = input.required<Team[]>();
  selectedTeam = input.required<Team>();
  selected = output<string>();
  sort = output<{ key: keyof Team; direction?: 'asc' | 'desc' }>();

  protected sortDirection?: 'asc' | 'desc' = undefined;
  protected sortField: keyof Team = 'name';

  public clicked(key: string | null): void {
    if (key !== null) {
      this.selected.emit(key);
    }
  }
}
