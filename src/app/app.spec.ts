import { TeamService } from '@features/teams/services/team-service';
import { render, screen } from '@testing-library/angular';
import { App } from './app';

describe('App', () => {
  it('should create the app', async () => {
    const { fixture } = await render(App, {
      providers: [{ provide: TeamService, useValue: { getAll: vi.fn().mockResolvedValue([]) } }],
    });
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the team container', async () => {
    await render(App);

    expect(screen.getByText('No team selected')).toBeTruthy();
  });
});
