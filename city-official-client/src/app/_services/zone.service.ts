import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Zone } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ZoneService {
    baseUri:string = 'http://localhost:4000/api';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    private zoneSubject: BehaviorSubject<Zone>;
    public zone: Observable<Zone>;

    constructor(private router: Router, private http: HttpClient) {
        this.zoneSubject = new BehaviorSubject<Zone>(JSON.parse(localStorage.getItem('zone')));
        this.zone = this.zoneSubject.asObservable();
    }

    // Create
    create(data): Observable<any> {
        let url = `${this.baseUri}/zone/create`;
        return this.http.post(url, data)
        .pipe(
            catchError(this.errorMgmt)
        )
    }

    // Get all zones
    getAll() {
        return this.http.get(`${this.baseUri}/zone`);
    }

    // Get zone
    getById(id): Observable<any> {
        let url = `${this.baseUri}/zone/read/${id}`;
        return this.http.get(url, {headers: this.headers}).pipe(
        map((res: Response) => {
            return res || {}
        }),
        catchError(this.errorMgmt)
        )
    }

    // Update zone
    update(id, data): Observable<any> {
        let url = `${this.baseUri}/zone/update/${id}`;
        return this.http.put(url, data, { headers: this.headers }).pipe(
        catchError(this.errorMgmt)
        )
    }

    // Delete zone
    delete(id): Observable<any> {
        let url = `${this.baseUri}/zone/delete/${id}`;
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