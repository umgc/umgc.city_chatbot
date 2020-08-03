import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { RegulationService, AlertService } from '@app/_services';
import { Regulation } from '../_models/regulation';

@Component({ templateUrl: 'add-edit.component.html' })
export class RegAddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    regulationData: Regulation[];
    textareaParsed: any[];
    textarea: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private regulationService: RegulationService,
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
            keywords: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.regulationService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.f.code.setValue(x.code);
                    this.f.url.setValue(x.url);
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
            this.createRegulation();
        } else {
            this.updateRegulation();
        }
    }

    private createRegulation() {
        this.submitted = true;
        if (!this.form.valid) {
          return false;
        } else {
        this.parseTextArea();

        this.regulationService.create(this.form.value).subscribe(
            (res) => {
              console.log('Regulation successfully created!')
              this.ngZone.run(() => this.router.navigateByUrl('/regulation-list'))
            }, (error) => {
              console.log(error);
            });
    }
}

    private updateRegulation() {
        this.regulationService.update(this.id, this.form.value)
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