import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/Todo';
import { FormBuilder, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Validators } from '@angular/forms';

uuidv4();

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {



  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {

    this.initForm();

  }

  initForm() {

    this.myForm = this.fb.group({
      content: ['', Validators.required],
      status: ['', Validators.required]
    })

  }

  todos: Todo[] = [
    {
      id: uuidv4(),
      content: 'work',
      status: 'upcoming'
    },
    {
      id: uuidv4(),
      content: 'work',
      status: 'ready'
    },
    {
      id: uuidv4(),
      content: 'learn html',
      status: 'ready'
    },
    {
      id: uuidv4(),
      content: 'work',
      status: 'inprogress'
    }
  ]

  // todos listesinden elemanların statuslerine göre listelere ayrılması
  upcomingTodos = this.todos.filter(todo => todo.status === "upcoming");

  readyTodos: Todo[] = this.todos.filter(todo => todo.status === "ready");

  inprogressTodos: Todo[] = this.todos.filter(todo => todo.status === "inprogress");

  todoLists: Todo[][] = [this.upcomingTodos,
  this.readyTodos,
  this.inprogressTodos];


  upgradeTodoLists() {
    this.upcomingTodos = this.todos.filter(todo => todo.status === "upcoming");

    this.readyTodos = this.todos.filter(todo => todo.status === "ready");

    this.inprogressTodos = this.todos.filter(todo => todo.status === "inprogress");

    this.todoLists = [this.upcomingTodos,
    this.readyTodos,
    this.inprogressTodos];

  }




  statuses = ['upcoming', 'ready', 'inprogress'];


  ngOnInit(): void { }

  addTodo() {

    console.log('Form submitted:', this.myForm.value);
    this.todos.push({
      id: uuidv4(),
      content: this.myForm.value.content,
      status: this.myForm.value.status
    })

    this.upgradeTodoLists();

    console.log(this.todos);

    this.myForm.controls['content'].setErrors(null);
    this.myForm.controls['status'].setErrors(null);

    this.myForm.reset({
      content: '',
      status: ''
    });

    
  }

  deleteTodo(id: string) {

    this.todos = this.todos.filter(todo => todo.id !== id);
    console.log(this.todos);
    // this.upcomingTodos= this.todos.filter(todo => todo.status === "upcoming");
    this.upgradeTodoLists();
  }

  changeTodoStatus() {
    this.upgradeTodoLists();
  }

}
