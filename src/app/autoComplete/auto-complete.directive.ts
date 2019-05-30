import {
  Directive, OnInit, HostListener, ElementRef, ViewContainerRef,
  ComponentFactoryResolver, EventEmitter, Output, AfterViewInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AutoCompleteService } from './auto-complete.service';
import { LoadingComponent } from './loading/loading.component';
import { NgModel } from '@angular/forms';


@Directive({
  selector: '[appAutoComplete]',
  providers: [AutoCompleteService, NgModel]
})
export class AutoCompleteDirective implements OnInit, AfterViewInit {
  input: Subject<string> = new Subject();
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter();
  // predicts: Array<any>;
  predictionListComponentRef: any;

  constructor(
    private _el: ElementRef,
    private _container: ViewContainerRef,
    private _service: AutoCompleteService,
    private _factoryResolver: ComponentFactoryResolver) {
  }

  @HostListener('input', ['$event'])
  onInput() {
    this.input.next(this._el.nativeElement.value);
  }
  @HostListener('focus', ['$event'])
  onfocus() {
    this.input.next(this._el.nativeElement.value);
  }

  ngOnInit() {
    this.input.pipe(debounceTime(200)).subscribe(
      val => {
        this._service.onFetchAddress(val);
      }
    );
    this._service.predictiveArr.subscribe(val => {
      if (val) {
        if (this.predictionListComponentRef) { this.dismissPredictions(); }
        this.displayPredictions(val);
      } else {
        this.dismissPredictions();
      }
    });
  }

  ngAfterViewInit() {
    document.body.addEventListener('click', () => this.dismissPredictions())
  }

  displayPredictions(val: Array<string>) {
    const componentFactory = this._factoryResolver.resolveComponentFactory(LoadingComponent);
    this.predictionListComponentRef = this._container.createComponent(componentFactory);
    (<LoadingComponent>this.predictionListComponentRef.instance).setContents(val);
    (<LoadingComponent>this.predictionListComponentRef.instance).selected.subscribe(val => {
      if (val) {
        this._container.element.nativeElement.value = val;
        this.ngModelChange.emit(val)
        this.dismissPredictions();
      }
    });
  }

  dismissPredictions() {
    if (this.predictionListComponentRef) { this.predictionListComponentRef.destroy(); }
  }
}
