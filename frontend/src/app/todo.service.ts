import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface ToDo {
  id?: number;
  title?: string;
  completed?: boolean;
  editing?: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class TodoService {
  private apiUrl = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) {
  }

  getToDos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.apiUrl);
  }

  addToDos(todo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.apiUrl, todo);
  }

  updateToDoStatus(id: number, completed: boolean): Observable<ToDo> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = {completed};
    return this.http.put<ToDo>(`${this.apiUrl}/${id}`, body, {headers, withCredentials: true});
  }

  updateToDoTitle(id: number, title: string): Observable<ToDo> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = {title};
    return this.http.put<ToDo>(`${this.apiUrl}/updateTitle/${id}`, body, {headers, withCredentials: true});
  }

  deleteToDos(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
