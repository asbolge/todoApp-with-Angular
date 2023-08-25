import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _apiService: ApiService,
    private dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit(): void {
    this.todoId = this.data.id;
    this.todoContent = this.data.content;
  }

  todoId: string = "";
  todoContent: string = "";

  closeClick() {
    this.dialogRef.close();
  }


  deleteButton(id: string) {


    this._apiService.deleteTodos(id).subscribe(
      () => {
        console.log('Ürün başarıyla silindi.');
        if (this.data.getALL) {
          this.data.getALL();
        }
      },
      (error) => {
        console.error('Ürün silinirken bir hata oluştu:', error);
      }
    );
  };


}
