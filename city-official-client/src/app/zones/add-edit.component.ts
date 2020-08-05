import { Component, OnInit, NgZone, Input, AfterViewInit, ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__ } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ZoneService, AlertService } from '@app/_services';
import { Zone } from '../_models/zone';

import { PermitService } from '../_services/permit.service';
import { RegulationService } from '../_services/regulation.service';

import Feature from 'ol/Feature';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Map from 'ol/Map';
import {Draw, Modify, Snap} from 'ol/interaction';
import {OSM, Vector as VectorSource } from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import View from 'ol/View';
import { VectorSourceEvent } from 'ol/source/Vector'


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

    Permit:any = [];
    Regs:any = [];

    x = -118.14722273301304; //-13152200.617877632;
    y = 34.149929793833856; //4048680.122585318;
    draw: Draw;
    snap: Snap;
    map: Map;
    source: VectorSource;
    vector: VectorLayer;
    modify: Modify;
    geoJSON: any = null;
    feature: Feature;
    event: VectorSourceEvent;

    get permitFormArray() {
      return this.form.controls.permits as FormArray;
    }

    get regsFormArray() {
      return this.form.controls.regs as FormArray;
    }

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private zoneService: ZoneService,
        private alertService: AlertService,
        private permitService: PermitService,
        private regulationService: RegulationService,
        private ngZone: NgZone,
    ) {
      this.readPermit();
      this.readRegulation();
      this.form = this.formBuilder.group({
        symbol: ['', Validators.required],
        details: [''],
        url: ['', Validators.required],
        permits: this.formBuilder.array([new FormControl('')]),
        regs: this.formBuilder.array([new FormControl('')]),
        outline: ['', Validators.required]
    });

    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.isAddMode = !this.id;
        
        // keywords not required in edit mode
        const keywordsValidators = [Validators.minLength(2)];
        if (this.isAddMode) {
            keywordsValidators.push(Validators.required);
        }



        if (!this.isAddMode) {
            this.zoneService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.f.symbol.setValue(x.symbol);
                    this.f.details.setValue(x.details);
                    this.f.url.setValue(x.url);
                    this.f.permits.setValue(x.permits);
                    this.f.regs.setValue(x.regs);
                    this.f.outline.setValue(x.outline);
                });
        }
    }

    ngAfterViewInit() : void {
        this.source = new VectorSource();
        this.vector = new VectorLayer({
          source: this.source,
          renderBuffer: 600, // value in pixels
          style: new Style({
              fill: new Fill({
              color: 'rgba(204, 245, 255, 0.4)'
            }),
            stroke: new Stroke({
              color: '#0099ff',
              width: 2
            }),
            image: new CircleStyle({
              radius: 7,
              fill: new Fill({
                  color: '#0099ff'
              })
            })
          })
        });
    
        // Uses default Web Mercator projection (EPSG:3857) change to EPSG:4326 for lonlat
        this.map = new Map({
          target: 'map',
          layers: [
              new TileLayer({
                  source: new OSM()
              }),
              this.vector
          ],
          view: new View({
            // Following values need to be set based on user input to center in that city
            projection: 'EPSG:4326',
            center: [this.x, this.y],
            zoom: 13,
            maxZoom: 17,
            minZoom: 11,
          })
        });
    
        this.modify = new Modify({source: this.source});
        this.map.addInteraction(this.modify);

        this.setListener();

        this.addInteractions();

    }

    onPermitCheckboxChange(e) {
      const checkArray: FormArray = <FormArray>this.form.get('permits') as FormArray;
      console.log(this.form.get('permits'));
      if (e.target.checked) {
        checkArray.push(new FormControl(e.target.value));
      } else {
        let i: number = 0;
        checkArray.controls.forEach((item: FormControl) => {
          if (item.value == e.target.value) {
            checkArray.removeAt(i);
            return;
          }
          i++;
        });
      }
    }

    onRegsCheckboxChange(e) {
      const checkArray: FormArray = <FormArray>this.form.get('regs') as FormArray;
      console.log(this.form.get('regs'));
      if (e.target.checked) {
        checkArray.push(new FormControl(e.target.value));
      } else {
        let i: number = 0;
        checkArray.controls.forEach((item: FormControl) => {
          if (item.value == e.target.value) {
            checkArray.removeAt(i);
            return;
          }
          i++;
        });
      }
    }

    readPermit(){
      this.permitService.getAll().subscribe((data) => {
       this.Permit = data;
      })    
    }

    readRegulation(){
      this.regulationService.getAll().subscribe((data) => {
       this.Regs = data;
      })    
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

    addInteractions() {

        this.draw = new Draw({
          source: this.source,
          type: "Polygon"
        });
        this.map.addInteraction(this.draw);
        this.snap = new Snap({source: this.source});
        this.map.addInteraction(this.snap);
      }
    
      clearMap() {
        this.vector.getSource().clear();
      }
      setListener() {
        var evtKey = this.source.on('addfeature', (evt) => {
            // Order of a coordinate is [lon,lat]
            this.feature = evt.feature;
            this.geoJSON = this.feature.getGeometry().getCoordinates()[0];
            var temp: number;
            // Openlayers uses long lat, flipping here
            for (var i = 0; i < this.geoJSON.length; i++) {
            temp = this.geoJSON[i][0];
            this.geoJSON[i][0] = this.geoJSON[i][1];
            this.geoJSON[i][1] = temp;
            }
            console.log("Coordinates: " + this.geoJSON);
            this.form.patchValue({outline: this.geoJSON});
        });
        return evtKey;
      }

    saveCoords() {
        console.log("save coords");
        this.form.patchValue({outline: this.geoJSON});
    }
}