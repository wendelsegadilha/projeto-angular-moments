import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from '../../interfaces/moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrl: './moment-form.component.css',
})
export class MomentFormComponent implements OnInit {
  @Input() btnText!: string;
  @Input() momentData: Moment | null = null;
  @Output() onSubmit = new EventEmitter<Moment>();

  momentForm!: FormGroup;

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id : ''),
      title: new FormControl(this.momentData ? this.momentData.title : '', [
        Validators.required,
      ]),
      description: new FormControl(
        this.momentData ? this.momentData.description : '',
        [Validators.required]
      ),
      image: new FormControl(''),
    });
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  onChangeSelected(event: any) {
    //pegando imagem e inserindo no formulário
    const file: File = event.target.files[0];
    this.momentForm.patchValue({ image: file });
  }

  submit(): void {
    if (this.momentForm.invalid) {
      return;
    }
    console.log(this.momentForm.value);

    //envia os dados do formulário para o componente pai através do evento
    this.onSubmit.emit(this.momentForm.value);
  }
}
