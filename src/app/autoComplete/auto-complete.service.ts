import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Subject } from 'rxjs';

@Injectable()
export class AutoCompleteService {
  private autoFinishService: any;
  predictiveArr: Subject<Array<string>> = new Subject();

  constructor(private _apiLoader: MapsAPILoader) {
    this._apiLoader.load().then(() => {
      this.autoFinishService = new window['google'].maps.places.AutocompleteService();
    });
  }

  onFetchAddress(query: string): void {
    if (query) {
      this.autoFinishService.getPlacePredictions({ input: query }, (data: any[]) => {
        if (data) {
          data = data.map(obj => obj['description']);
          this.predictiveArr.next(data);
        }
      });
    } else {
      this.predictiveArr.next(null);
    }
  }
}
