import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/Todo';

@Injectable()
export class ApiService {

    constructor(private httpclient: HttpClient) { }

    readonly todosUrl = "http://localhost:3000/todos";
    readonly cancelledUrl = "http://localhost:3000/cancelled/";
    readonly doneUrl = "http://localhost:3000/done/";
    readonly inprogressUrl = "http://localhost:3000/inprogress/";


    getCancelled(): Observable<Todo[]> {
        return this.httpclient.get<Todo[]>("http://localhost:3000/todos/?status=cancelled");
    }

    getDone(): Observable<Todo[]> {
        return this.httpclient.get<Todo[]>("http://localhost:3000/todos/?status=done");
    }

    getInprogress(): Observable<Todo[]> {
        return this.httpclient.get<Todo[]>("http://localhost:3000/todos/?status=inprogress");
    }

    getTodos(): Observable<Todo[]> {
        return this.httpclient.get<Todo[]>(this.todosUrl);
    }

    deleteTodos(todoId: string): Observable<Todo[]> {
        return this.httpclient.delete<Todo[]>(`${this.todosUrl}/${todoId}`);

    }

    postTodos(todo: any): Observable<Todo[]> {
        return this.httpclient.post<Todo[]>(this.todosUrl, todo);
    }

    updateTodos(todoId: string, todoData: any): Observable<Todo[]> {
        const url = `${this.todosUrl}/${todoId}`;
        return this.httpclient.put<Todo[]>(url, todoData);
    }

}