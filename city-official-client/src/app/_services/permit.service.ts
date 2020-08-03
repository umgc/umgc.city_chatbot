import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Permit } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class PermitService {
    baseUri:string = 'http://localhost:4000/api';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    private permitSubject: BehaviorSubject<Permit>;
    public permit: Observable<Permit>;

    constructor(private router: Router, private http: HttpClient) {
        this.permitSubject = new BehaviorSubject<Permit>(JSON.parse(localStorage.getItem('permit')));
        this.permit = this.permitSubject.asObservable();
    }

    // Create
    create(data): Observable<any> {
        let url = `${this.baseUri}/permit/create`;
        return this.http.post(url, data)
        .pipe(
            catchError(this.errorMgmt)
        )
    }

    // Get all employees
    getAll() {
        return this.http.get(`${this.baseUri}/permit`);
    }

    // Get employee
    getById(id): Observable<any> {
        let url = `${this.baseUri}/permit/read/${id}`;
        return this.http.get(url, {headers: this.headers}).pipe(
        map((res: Response) => {
            return res || {}
        }),
        catchError(this.errorMgmt)
        )
    }

    // Update employee
    update(id, data): Observable<any> {
        let url = `${this.baseUri}/permit/update/${id}`;
        return this.http.put(url, data, { headers: this.headers }).pipe(
        catchError(this.errorMgmt)
        )
    }

    // Delete employee
    delete(id): Observable<any> {
        let url = `${this.baseUri}/permit/delete/${id}`;
        return this.http.delete(url, { headers: this.headers }).pipe(
        catchError(this.errorMgmt)
        )
    }

    // Error handling 
    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
        } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    }