import { LocationStrategy } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ReflectiveInjector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';
import { Location } from '@angular/common'

import { HeroDetailComponent } from './hero-detail.component';

class FakeHeroService {
  getHero(id: number): Observable<Hero> {
    return of({ id: id, name: 'YAYA' });
  }
  updateHero(hero: Hero): Observable<Hero> {
    return of(hero);
  }
}

fdescribe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let fakeHeroService = new FakeHeroService();
  const ID = 12;
  const fakeLocation = {
    back: jasmine.createSpy('back')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: fakeHeroService },
        HttpHandler,
        HttpClient,
        {
          provide: ActivatedRoute, useValue:
          {
            snapshot:
            {
              paramMap:
              {
                get: (key: string) => key === 'id' ? ID : undefined
              }
            }
          }
        },
        {
          provide: Location, useValue: fakeLocation
        }
      ]
    })
      .compileComponents();


    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();

    TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get hero by id', () => {
    component.ngOnInit();
    expect(component.hero).toEqual({ id: ID, name: 'YAYA' });
  })

  it('should go back', () => {
    fixture.detectChanges();
    component.goBack();
    expect(fakeLocation.back).toHaveBeenCalledTimes(1);
  })

  fit('should save', () => {
    const updateHeroSpy = spyOn(fakeHeroService, 'updateHero').and.callThrough();
    expect(component.hero).toBeUndefined();
    component.save();
    expect(updateHeroSpy).not.toHaveBeenCalled();

    component.ngOnInit();
    expect(component.hero).toBeDefined();
    component.save();
    expect(updateHeroSpy).toHaveBeenCalledWith(component.hero as Hero);
    expect(fakeLocation.back).toHaveBeenCalledTimes(1);
  })
});
