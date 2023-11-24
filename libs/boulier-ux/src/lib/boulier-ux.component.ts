import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ButtonCircleComponent,
  ContainerComponent,
} from '@classe-a-deux/shared-ui';
import { BehaviorSubject } from 'rxjs';
interface Boule {
  x: number;
  y: number;
}
@Component({
  selector: 'classe-a-deux-boulier-ux',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ButtonCircleComponent],
  template: `
    <ui-container>
      <div
        *ngFor="let y of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        class="flex w-full"
      >
        <ui-button-circle
          *ngFor="let x of [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]"
          (action)="selectedBoule.next({x,y})"
          [style]="{
            backgroundColor: x > 5 ? 'bg-red-800' : 'bg-blue-800',
            hover: x > 5 ? 'hover:bg-red-800' : 'hover:bg-blue-800',
            hoverBorder:
              x > 5 ? 'hover:border-red-300' : 'hover:border-blue-300',
            focus: x > 5 ? 'focus:ring-red-300' : 'focus:ring-blue-300'
          }"
          class="z-20"
          [ngClass]="
            isSelected({x,y})
              ? 'ml-auto'
              : null
          "
        ></ui-button-circle>
        <div
          class="absolute translate-y-3 w-[96%] h-1 bg-slate-800 opacity-50 z-10"
        ></div>
      </div>
    </ui-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoulierUXComponent {
  selectedBoules: Boule[] = [];
  selectedBoule = new BehaviorSubject<Boule | null>(null);

  constructor() {
    this.selectedBoule.subscribe((boule) => {
      // Quand le tableau est vide on ajoute la boule séléctionné
      if (this.selectedBoules.length === 0 && boule !== null) {
        this.selectedBoules = [boule];
      } else {
        if (boule !== null) {
          // si on se trouve sur la même ligne on modifie la boule séléctionné
          if (this.selectedBoules.some(({ y }) => boule.y === y)) {
            this.selectedBoules = this.selectedBoules
              .map(({ x, y }) =>
                //si l'index est supérieur on remplace l'index : on ajoute plus de boule à droite
                boule.x > x && boule.y === y
                  ? { x: boule.x, y }
                  : // sinon l'index est inférieur mais on est sur la même ligne alors on prend l'index de la boule - 1 : on déplace toute les boules à gauche
                  boule.y === y
                  ? { x: boule.x - 1, y }
                  : // sinon on renvoie la valeur du tableau sans modification
                    { x, y }
              )
              // on filtre si jamais la 1er boule a été séléctionné : on vide la ligne
              .filter(({ x }) => x !== 0);
          } else {
            // une nouvelle ligne a été séléctioné on l'ajoute
            this.selectedBoules = [...this.selectedBoules, boule];
          }
        }
      }
    });
  }

  isSelected({ x, y }: { x: number; y: number }) {
    return this.selectedBoules.some(
      (coordonne) => coordonne.x === x && coordonne.y === y
    );
  }
}
