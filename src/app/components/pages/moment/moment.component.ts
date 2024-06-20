import { Component, OnInit } from '@angular/core';
import { Moment } from '../../../interfaces/moment';
import { MomentService } from '../../../services/moment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css',
})
export class MomentComponent implements OnInit {
  moment?: Moment;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // pegar id da url
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
      //console.log(this.moment);
    });
  }
}
