import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent, ContainerComponent } from '@classe-a-deux/shared-ui';

@Component({
  selector: 'classe-a-deux-home',
  standalone: true,
  imports: [ContainerComponent, ButtonComponent],
  template: `
    <ui-container>
      <p>Nous allons tester tes connaissances des tables de multiplication</p>
      <p>Tu auras 5 secondes par calcul.</p>
      <p>A la fin, télécharge ou imprime le tableau récapitulatif</p>
      <br />
      <ui-button (action)="navigate()">Commencer le test</ui-button>
    </ui-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  #router = inject(Router);
  navigate() {
    this.#router.navigate(['/test']);
  }
}
