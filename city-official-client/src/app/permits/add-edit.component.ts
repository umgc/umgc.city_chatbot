import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { PermitService, AlertService } from '@app/_services';
import { Permit } from '../_models/permit';

@Component({ templateUrl: 'add-edit.component.html' })
export class PermitAddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    permitData: Permit[];
    textareaParsed: any[];
    textarea: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private permitService: PermitService,
        private alertService: AlertService,
        private ngZone: NgZone,
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.isAddMode = !this.id;
        
        // keywords not required in edit mode
        const keywordsValidators = [Validators.minLength(2)];
        if (this.isAddMode) {
            keywordsValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            code: ['', Validators.required],
            url: ['', Validators.required],
            applicationUrl: ['', Validators.required],
            keywords: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.permitService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.f.code.setValue(x.code);
                    this.f.url.setValue(x.url);
                    this.f.applicationUrl.setValue(x.applicationUrl);
                    this.f.keywords.setValue(x.keywords);
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    parseTextArea() {
        this.textarea = this.form.get('keywords').value;
        this.textareaParsed = this.textarea.split(',');
        this.form.controls['keywords'].setValue(this.textareaParsed);
     }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createPermit();
        } else {
            this.updatePermit();
        }
    }

    private createPermit() {
        this.submitted = true;
        if (!this.form.valid) {
          return false;
        } else {
        this.parseTextArea();
        this.permitService.create(this.form.value).subscribe(
            (res) => {
              console.log('Permit successfully created!')
              this.ngZone.run(() => this.router.navigateByUrl('/permit-list'))
            }, (error) => {
              console.log(error);
            });
    }
}

    private updatePermit() {
        this.permitService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['..', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}