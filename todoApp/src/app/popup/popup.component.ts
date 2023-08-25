import { Component, OnInit, Inject } from '@angular/core';
import { Todo } from '../models/Todo';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _apiService: ApiService,
    // private el:ElementRef,
    private dialogRef: MatDialogRef<PopupComponent>
  ) {
    this.initFormUpdate();
  }


  ngOnInit(): void {

  }


  updateForm!: FormGroup;

  initFormUpdate() {

    this.updateForm = this.fb.group({
      updateContent: [''],
      updateStatus: ['']
    })

  }


  closeClick() {
    this.dialogRef.close();
  }



  updateTodoButton() {

    let todoData: Todo = {
      id: this.data.id,
      content: this.updateForm.value.updateContent,
      status: this.updateForm.value.updateStatus
    }

    this._apiService.updateTodos(this.data.id, todoData)
      .subscribe(
        (response) => {
          console.log('Todo başarıyla güncellendi:', response);
          if (this.data.getALL) {
            this.data.getALL(); // Veriyi yenilemek için getALL fonksiyonunu çağırın
          }
        },
        (error) => {
          console.error('Todo güncellenirken bir hata oluştu:', error);
        }
      );
    // this.upgradeTodoLists();

    this.updateForm.reset({
      content: '',
      status: ''
    });

    this.dialogRef.close();

    console.log('myForm: ', this.updateForm);



  }

}
