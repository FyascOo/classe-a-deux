import { NgClass, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Pipe,
  PipeTransform,
  signal,
} from '@angular/core';
import { ContainsPipe } from '@classe-a-deux/shared-services';
import { ContainerComponent } from '@classe-a-deux/shared-ui';

@Pipe({
  name: 'redOrBlue',
  standalone: true,
})
export class IsRedPipe implements PipeTransform {
  transform({ x, y }: Boule) {
    return (y <= 5 && x <= 5) || (y > 5 && x > 5) ? 'red' : 'blue';
  }
}
interface Boule {
  x: number;
  y: number;
}
@Component({
  selector: 'classe-a-deux-boulier-ux',
  standalone: true,
  imports: [NgFor, NgClass, ContainerComponent, ContainsPipe, IsRedPipe],
  template: `
    <ui-container>
      @for (y of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; track $index) {
      <div class="flex w-full">
        @for ( x of [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]; track $index) {
        <button
          (click)="select({x,y})"
          [ngClass]="{x,y} | redOrBlue"
          class="border border-black focus:ring-4 m-1.5 scale-150 rounded-full p-2.5 z-20"
          [class.ml-auto]="{x,y} | contains : selectedBoules()"></button>
        }

        <div
          class="absolute translate-y-3.5 w-[95%] h-1 bg-slate-800 opacity-50 z-10"></div>
      </div>
      }
    </ui-container>
  `,
  styles: [
    `
      .red {
        @apply bg-red-800 hover:bg-red-800 hover:border-red-300 focus:ring-red-300;
      }

      .blue {
        @apply bg-blue-800 hover:bg-blue-800 hover:border-blue-300 focus:ring-blue-300;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoulierUXComponent {
  selectedBoules = signal([] as Boule[]);

  select(boule: Boule) {
    const isSelectedBoulesEmpty = this.selectedBoules().length === 0;
    if (boule === null) return;
    else if (isSelectedBoulesEmpty) this.selectedBoules.set([boule]);
    else
      this.selectedBoules.set(
        this._computedSelection(this.selectedBoules(), boule)
      );
  }

  private _computedSelection(boules: Boule[], boule: Boule) {
    const isNewLineSelected = !boules.some(({ y }) => boule.y === y);
    if (isNewLineSelected) return [...boules, boule];

    return boules.map(({ x, y }) => {
      const isAnoterLine = boule.y !== y;
      const isGreaterIndex = boule.x > x && boule.y === y;

      if (isAnoterLine) return { x, y };
      if (isGreaterIndex) return { x: boule.x, y };
      else return { x: boule.x - 1, y };
    });
  }

  isSelected({ x, y }: { x: number; y: number }) {
    return this.selectedBoules().some(
      coordonne => coordonne.x === x && coordonne.y === y
    );
  }
}
