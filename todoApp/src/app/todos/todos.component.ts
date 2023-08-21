import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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


uuidv4();

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder, private _apiService: ApiService, private dialog: MatDialog) {
    this.initForm();
  }

  ngOnInit(): void {

    this.getALL();


  }

  myForm!: FormGroup;

  todos: Todo[] = [];
  cancelledTodosJson: Todo[] = [];
  doneTodosJson: Todo[] = [];
  inprogressTodosJson: Todo[] = [];


  getALL() {
    this._apiService.getTodos().subscribe(
      data => {
        this.todos = data;
      }
    );

    this._apiService.getCancelled().subscribe(
      data => {
        this.cancelledTodosJson = data;

      }
    );

    this._apiService.getDone().subscribe(
      data => {
        this.doneTodosJson = data;

      }
    );

    this._apiService.getTodos().subscribe((todos) => {
      this.inprogressTodosJson = todos.filter((todo) => todo.status === 'inprogress');
      this.doneTodosJson = todos.filter((todo) => todo.status === 'done');
      this.cancelledTodosJson = todos.filter((todo) => todo.status === 'cancelled');
    });

  }



  initForm() {

    this.myForm = this.fb.group({
      content: ['',],
      status: ['',]
    })

  }


  addTodoButton() {

    let todo: Todo = {
      id: uuidv4(),
      content: this.myForm.value.content,
      status: this.myForm.value.status
    }

    this._apiService.postTodos(todo).subscribe(
      (response) => {
        console.log('Todo başarıyla eklendi:', response);
        this.cdr.detectChanges();

      },
      (error) => {
        console.error('Todo eklenirken bir hata oluştu:', error);
      }
    );

    this.myForm.reset({
      content: '',
      status: ''
    });

    console.log('myForm: ', this.myForm);
    this.getALL();
  };



  deleteButton(id: string, status: string) {

    
    if(confirm("Confirm Delete")==true){   this._apiService.deleteTodos(id).subscribe(
      () => {
        console.log('Ürün başarıyla silindi.');
      },
      (error) => {
        console.error('Ürün silinirken bir hata oluştu:', error);
      }
    );}

    this.getALL();

    
  };

  selectedTodo: string = "";
  openPopup = false;
  openUpdateDialog(todoId: string): void {
    this.openPopup = !this.openPopup;
    this.selectedTodo = todoId;
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { id: todoId, openPopup: this.openPopup,
        getALL: this.getALL.bind(this) }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog kapandı:', result);
      // Gerekirse, dialog kapandığında yapılacak işlemler
    });
  }
}

