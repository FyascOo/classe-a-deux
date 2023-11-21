import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FooterComponent,
  HeaderComponent,
  MainComponent,
} from '@classe-a-deux/shared-ui';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, MainComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'classe-a-deux-root',
  template: `
    <ui-header>,,Boulier</ui-header>
    <ui-main><router-outlet></router-outlet></ui-main>
    <ui-footer></ui-footer>
  `,
  styles: [
    `
      :host {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class AppComponent {
  title = 'boulier';
}
