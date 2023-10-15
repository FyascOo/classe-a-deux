import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@classe-a-deux/shared-ui';

@Component({
  selector: 'multiplication-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ui-header></ui-header>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'multiplication';
}
