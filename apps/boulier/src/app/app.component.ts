import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent, HeaderComponent, MainComponent } from '@classe-a-deux/shared-ui';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, MainComponent, FooterComponent],
  selector: 'classe-a-deux-root',
  template: `
    <ui-header>,,Test ,,table ,,de ,,multiplication</ui-header>
    <ui-main><router-outlet></router-outlet></ui-main>
    <ui-footer></ui-footer>
  `,
  styles: [''],
})
export class AppComponent {
  title = 'boulier';
}
