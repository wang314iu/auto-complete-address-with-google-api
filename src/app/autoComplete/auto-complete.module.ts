import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AutoCompleteDirective } from './auto-complete.directive';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDcxe2aVJrZXoOVL-cWmfKZO4PnADqVPgE',
      libraries: ['places']
    })
  ],
  entryComponents: [
    LoadingComponent
  ],
  declarations: [
    AutoCompleteDirective,
    LoadingComponent
  ],
  exports: [
    AutoCompleteDirective
  ]
})
export class AutoCompleteModule { }
