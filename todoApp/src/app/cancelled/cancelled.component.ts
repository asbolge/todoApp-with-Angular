import { ChangeDetectorRef, Component, OnInit,Input } from '@angular/core';
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
  selector: 'app-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrls: ['./cancelled.component.css']
})
export class CancelledComponent implements OnInit {

  @Input() cancelledTodosJson!:Todo[];
  constructor(private dialog: MatDialog) { }




  ngOnInit(): void {
  }

  deleteCancelledButton(id:string){

  }

  
  selectedTodo:string = "";
  openUpdateDialog(todoId:string): void {

    this.selectedTodo = todoId;
    const dialogRef = this.dialog.open(PopupComponent,{
      data: { id: todoId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog kapandı:', result);
      // Gerekirse, dialog kapandığında yapılacak işlemler
    });
  }

}
