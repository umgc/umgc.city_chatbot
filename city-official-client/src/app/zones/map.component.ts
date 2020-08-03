import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import OsmSource from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
  x = -13152200.617877632;
  y = 4048680.122585318;

  constructor() { }

  ngOnInit(): void {
    let map = new Map({
      target: 'map',
      layers: [
          new TileLayer({
              source: new OsmSource()
          })
      ],
      view: new View({
        // Following values need to be set based on user input to center in that city
        center: [this.x, this.y],
        zoom: 13,
        maxZoom: 17,
        minZoom: 11
      })
  });

  }

}
