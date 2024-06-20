import { Component, OnInit } from '@angular/core';

import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../../interfaces/moment';
import { environment } from '../../../../environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentService: MomentService) {}

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    // filtro de momentos
    this.moments = this.allMoments.filter((moment) => {
      return moment.title.toLocaleLowerCase().includes(value);
    });
  }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });
      this.allMoments = data;
      this.moments = data;
    });
  }
}
