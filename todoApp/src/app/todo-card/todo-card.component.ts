import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent implements OnInit {

  @Input() todoId!: string;
  @Input() todoContent!: string;
  @Input() todoStatus!: string;

  constructor(private _apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }




  deleteButton(id: string, status: string) {

    
    if(confirm("Confirm Delete")==true){   this._apiService.deleteTodos(id).subscribe(
      () => {
        console.log('Ürün başarıyla silindi.');
      },
      (error) => {
        console.error('Ürün silinirken bir hata oluştu:', error);
      }
    );}

    
  };

  selectedTodo: string = "";
  openPopup = false;
  openUpdateDialog(todoId: string): void {
    this.openPopup = !this.openPopup;
    this.selectedTodo = todoId;
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { id: todoId, openPopup: this.openPopup }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog kapandı:', result);
      // Gerekirse, dialog kapandığında yapılacak işlemler
    });
  }

}
