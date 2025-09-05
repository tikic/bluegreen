import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelList } from './panel-list';

describe('PanelList', () => {
  let component: PanelList;
  let fixture: ComponentFixture<PanelList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelList],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
