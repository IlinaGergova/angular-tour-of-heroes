import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';

import { DashboardComponent } from './dashboard.component';

class FakeHeroService {
  getHeroes(): Observable<Hero[]> {
    return of([...HEROES]);
  }
}
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let fakeHeroService = new FakeHeroService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: HeroService, useValue: fakeHeroService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load frist four heroes', () => {
    component.ngOnInit();
    const firstFour = HEROES.slice(1, 5);
    // const firstFour = HEROES.slice(1, 3); 
    expect(component.heroes).toEqual(firstFour);
  })

});
