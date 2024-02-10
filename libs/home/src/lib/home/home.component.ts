import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
} from '@classe-a-deux/shared-ui';
import { selectTime, updateTime } from '@classe-a-deux/test';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'classe-a-deux-home',
  standalone: true,
  imports: [AsyncPipe, ContainerComponent, ButtonComponent, InputComponent],
  template: `
    <ui-container>
      <p>Nous allons tester tes connaissances des tables de multiplication</p>
      <p>Tu auras 5 secondes par calcul.</p>
      <p>A la fin, télécharge ou imprime le tableau récapitulatif</p>
      <br />
      <ui-button (action)="navigate()">Commencer le test</ui-button>
    </ui-container>

    <ui-container>
      <h2>Paramètres</h2>
      <ui-input
        [reset]="(time$ | async)!"
        (valueChanges)="updateTime($event)"></ui-input>
    </ui-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  #router = inject(Router);
  #store = inject(Store);
  time$ = this.#store.select(selectTime).pipe(map(time => `${time}`));

  ngOnInit(): void {
    this.#store.dispatch(
      updateTime({
        time: localStorage.getItem('time') ? +localStorage.getItem('time')! : 5,
      })
    );
  }

  navigate() {
    this.#router.navigate(['/test']);
  }

  updateTime(time: string) {
    this.#store.dispatch(updateTime({ time: +time }));
  }
}
