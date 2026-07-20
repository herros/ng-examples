import { TestBed } from '@angular/core/testing';
import { TeamService } from '@features/teams/services/team-service';
import { TeamStoreFacade } from '@features/teams/services/team-store-facade';
import { TeamStore } from '@features/teams/store/team.store';
import { Team } from '@models/team';
import { teamFactory } from '../../../shared/factories/team-factory';

const teams = teamFactory.buildList(2);

async function setup() {
  const getAll = vi.fn().mockResolvedValue(teams);

  TestBed.configureTestingModule({
    providers: [
      TeamStore,
      TeamStoreFacade,
      {
        provide: TeamService,
        useValue: {
          getAll,
        },
      },
    ],
  });

  const facade = TestBed.inject(TeamStoreFacade);
  const store = TestBed.inject(TeamStore);

  await store.getTeams();
  getAll.mockClear();

  return {
    facade,
    getAll,
  };
}

describe('TeamStoreFacade', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', async () => {
    const { facade } = await setup();

    expect(facade).toBeTruthy();
  });

  it('should expose the teams signal', async () => {
    const { facade } = await setup();

    expect(facade.teams()).toEqual(teams);
  });

  it('should expose the selected team signal', async () => {
    const { facade } = await setup();

    facade.setSelectedTeam(teams[1].publicKey as string);

    expect(facade.selectedTeam()).toEqual(teams[1]);
  });

  it('should not allow selected team to be set directly', async () => {
    const { facade } = await setup();

    expect(() => {
      facade.selectedTeam = new Team();
    }).toThrow('Do not set selectedTeam directly. Use setSelectedTeam() instead.');
  });

  it('should refresh teams and return the current teams', async () => {
    const { facade, getAll } = await setup();

    const currentTeams = await facade.refreshTeams(true);

    expect(currentTeams).toEqual(teams);
    expect(getAll).toHaveBeenCalledWith(true);
  });
});
