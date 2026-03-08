import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AUTH_DATA_SOURCE } from '../features/auth/api/auth.contract';
import { GAME_CATALOG_DATA_SOURCE } from '../features/game/api/game-catalog.contract';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        {
          provide: AUTH_DATA_SOURCE,
          useValue: {
            authenticate: () => of(null),
          },
        },
        {
          provide: GAME_CATALOG_DATA_SOURCE,
          useValue: {
            fetchGames: () => of([]),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render WishFlix brand in navbar', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.wishflix-shell__brand')?.textContent).toContain('WishFlix');
  });

  it('should display login action by default', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.wishflix-shell__user .btn-primary')?.textContent).toContain(
      'Se connecter',
    );
  });
});
