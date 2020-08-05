import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Regulation } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class RegulationService {
    baseUri:string = 'http://localhost:4000/api';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    private regulationSubject: BehaviorSubject<Regulation>;
    public regulation: Observable<Regulation>;

    constructor(private router: Router, private http: HttpClient) {
        this.regulationSubject = new BehaviorSubject<Regulation>(JSON.parse(localStorage.getItem('regulation')));
        this.regulation = this.regulationSubject.asObservable();
    }

    // Create
    create(data): Observable<any> {
        let url = `${this.baseUri}/regs/create`;
        return this.http.post(url, data)
        .pipe(
            catchError(this.errorMgmt)
        )
    }

    // Get all regs
    getAll() {
        return this.http.get(`${this.baseUri}/regs`);
    }

    // Get regs
    getById(id): Observable<any> {
        let url = `${this.baseUri}/regs/read/${id}`;
        return this.http.get(url, {headers: this.headers}).pipe(
        map((res: Response) => {
            return res || {}
        }),
        catchError(this.errorMgmt)
        )
    }

    // Update regs
    update(id, data): Observable<any> {
        let url = `${this.baseUri}/regs/update/${id}`;
        return this.http.put(url, data, { headers: this.headers }).pipe(
        catchError(this.errorMgmt)
        )
    }

    // Delete regs
    delete(id): Observable<any> {
        let url = `${this.baseUri}/regs/delete/${id}`;
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