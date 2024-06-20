import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../../interfaces/moment';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css',
})
export class EditMomentComponent implements OnInit {
  moment!: Moment;
  btnText: string = 'Editar';

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router
  ) {}

  async editHandler(momentData: Moment) {
    const id = this.moment.id;
    const formData = new FormData();
    formData.append('title', momentData.title);
    formData.append('description', momentData.description);
    if (momentData.image) {
      formData.append('image', momentData.image);
    }
    await this.momentService.updateMoment(id!, formData).subscribe();
    this.messageService.add(`Momento ${id} atualizado com sucesso!`);
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });
  }
}
