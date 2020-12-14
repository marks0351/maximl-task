import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AutocompleteComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    NgbModule,
    FormsModule,
    AutocompleteComponent
  ]
})
export class SharedModule { }
