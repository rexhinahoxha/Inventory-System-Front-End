import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, Subscription } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({ 
  providedIn: 'root' 
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    

    constructor(private http: HttpClient,
              private router: Router,
            //   private snackBar: MatSnackBar
      ) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject;
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        
      let data = {'username': username, 'password': password};
      const headers = new HttpHeaders ({'Content-Type': 'application/json'});
      
      return this.http.post<any>(`${environment.apiUrl}/api/User/Login`, data, {headers: headers})
       .pipe(map(user  =>
        {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }),
    
        );
}
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}