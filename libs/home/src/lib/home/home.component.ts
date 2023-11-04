import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent, ContainerComponent } from '@classe-a-deux/shared-ui';

@Component({
  selector: 'classe-a-deux-home',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ButtonComponent],
  template: `
    <ui-container>
      <p>Bienvenu dans le module de test de multiplication de Classe à deux.</p>
      <p>Le but est de vous tester sur toutes les tables de multiplication.</p>
      <p>
        Vous aurez <b>5s</b> par calcul. Si vous ne répondez pas cela sera
        considéré comme une erreur.
      </p>
      <p>Bon chance.. ahahah</p>
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
    this.#router.navigate(['test']);
  }
}
