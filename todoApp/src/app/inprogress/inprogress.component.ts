import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { Todo } from '../models/Todo';
import { FormBuilder, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inprogress',
  templateUrl: './inprogress.component.html',
  styleUrls: ['./inprogress.component.css']
})
export class InprogressComponent implements OnInit {

  @Input() inprogressTodosJson!: Todo[];

  constructor(private dialog: MatDialog,private _apiService:ApiService) { }

  ngOnInit(): void { }





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
