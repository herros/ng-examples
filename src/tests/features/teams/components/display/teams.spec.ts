import { Teams } from '@features/teams/components/display/teams';
import { Team } from '@models/team';
import { fireEvent, render, screen } from '@testing-library/angular';
import { teamFactory } from '../../../../shared/factories/team-factory';

const teams = teamFactory.buildList(2);

async function setup(selectedTeam: Team = new Team()) {
  const view = await render(Teams, {
    componentInputs: {
      teams,
      selectedTeam,
    },
  });
  const selected = vi.fn();

  view.fixture.componentInstance.selected.subscribe(selected);

  return {
    selected,
    view,
  };
}

describe('Teams', () => {
  it('should create', async () => {
    const { view } = await setup();

    expect(view.fixture.componentInstance).toBeTruthy();
  });

  it('should render the teams', async () => {
    await setup();

    expect(screen.getByText(teams[0].name as string)).toBeTruthy();
    expect(screen.getByText(teams[1].name as string)).toBeTruthy();
  });

  it('should show the selected team', async () => {
    await setup(teams[1]);

    expect(screen.getByText(`Selected team: ${teams[1].name}`)).toBeTruthy();
  });

  it('should show when no team is selected', async () => {
    await setup();

    expect(screen.getByText('No team selected')).toBeTruthy();
  });

  it('should emit the selected team key when a team is clicked', async () => {
    const { selected } = await setup();

    fireEvent.click(screen.getByText(teams[1].name as string));

    expect(selected).toHaveBeenCalledWith(teams[1].publicKey);
  });
});
