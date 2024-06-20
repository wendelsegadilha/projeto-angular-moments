import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { Moment } from '../../../interfaces/moment';
import { MomentService } from '../../../services/moment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from '../../../services/messages.service';
import { Comment } from '../../../interfaces/comment';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css',
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ) {}

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();
    this.messageService.add('Momento excluído com sucesso!');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    // pegar id da url
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
      //console.log(this.moment);
    });

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async onSubmit(FormDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }
    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);

    await this.commentService.createComment(data).subscribe((comment) => {
      this.moment!.comments?.push(comment.data);
    });

    this.messageService.add('comntário adicionado');

    // reseta o form
    this.commentForm.reset();
    FormDirective.resetForm();
  }
}
