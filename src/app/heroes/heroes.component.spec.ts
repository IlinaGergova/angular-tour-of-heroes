import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';
import { HeroesComponent } from './heroes.component';

class FakeHeroService {
  getHeroes(): Observable<Hero[]> {
    return of([...HEROES]);
    // return of(_.cloneDeep(HEROES));
  }

  addHero(hero: Hero): Observable<Hero> {
    hero.id = 1;
    return of(hero);
  }

  deleteHero(id: number): Observable<Hero> {
    return of();
  }
}

fdescribe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let fakeHeroService = new FakeHeroService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [{ provide: HeroService, useValue: fakeHeroService }, HttpClient]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should set the list of heroes', () => {
    component.ngOnInit();
    // expect(component.heroesArr).toEqual([]);
    expect(component.heroesArr).toEqual(HEROES);
  });

  it('should add new hero', () => {
    fixture.detectChanges();

    const nameEmpty = '';
    component.add(nameEmpty);
    expect(component.heroesArr).toEqual(HEROES);

    const name = '  JoJo ';
    // const name = 'JoJo';
    component.add(name);

    // expect(component.heroesArr).toContain({ id: 1, name: 'JoJoo' } as Hero);
    // expect(component.heroesArr).toContain({ id: 2, name: 'JoJo' } as Hero);
    expect(component.heroesArr).toContain({ id: 1, name: 'JoJo' } as Hero);

  })

  it('should delete hero', () => {
    fixture.detectChanges();

    const deleteHeroSpy = spyOn(fakeHeroService, 'deleteHero').and.callThrough();

    const hero = { id: 18, name: 'Dr. IQ' };
    component.delete(hero);
    // expect(component.heroesArr).toContain(hero);
    expect(component.heroesArr).not.toContain(hero);

    expect(deleteHeroSpy).toHaveBeenCalledOnceWith(18);
  })
});
