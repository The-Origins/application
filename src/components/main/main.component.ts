import { Component } from '@angular/core';
import { LocationNavComponent } from '../location-nav/location-nav.component';
import { QueryFormComponent } from '../queryForm/query-form/query-form.component';
import { ResultsComponent } from '../results/results.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { fadeInOut, bottomIn } from '../../animations';

@Component({
  selector: 'app-main',
  imports: [
    LocationNavComponent,
    QueryFormComponent,
    ResultsComponent,
    FooterComponent,
    HeaderComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  animations: [fadeInOut, bottomIn],
})
export class MainComponent {
  handleQuerySubmit() {
    window.scrollTo({
      top: 500,
      behavior: 'smooth',
    });
  }
}
