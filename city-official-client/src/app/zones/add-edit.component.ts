import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ZoneService, AlertService } from '@app/_services';
import { Zone } from '../_models/zone';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    zoneData: Zone[];
    textareaParsed: any[];
    textarea: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private zoneService: ZoneService,
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
            symbol: ['', Validators.required],
            details: ['', Validators.required],
            url: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.zoneService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.f.symbol.setValue(x.symbol);
                    this.f.details.setValue(x.details);
                    this.f.url.setValue(x.url);
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

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
            this.createZone();
        } else {
            this.updateZone();
        }
    }

    private createZone() {
        this.submitted = true;
        if (!this.form.valid) {
          return false;
        } else {
        this.zoneService.create(this.form.value).subscribe(
            (res) => {
              console.log('Zone successfully created!')
              this.ngZone.run(() => this.router.navigateByUrl('/zone-list'))
            }, (error) => {
              console.log(error);
            });
    }
}

    private updateZone() {
        this.zoneService.update(this.id, this.form.value)
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