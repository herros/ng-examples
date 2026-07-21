import { App } from '@app/app';
import { render } from '@testing-library/angular';

describe('App', () => {
  it('should create the app', async () => {
    const { fixture } = await render(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the team container', async () => {
    const { container } = await render(App);
    const teamsHost = container.querySelector('app-teams');

    expect(teamsHost?.textContent).toContain('No team selected');
  });
});
