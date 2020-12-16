import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, first, map, switchMap} from 'rxjs/operators';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent implements OnInit {
  @Input() placeholder = ''
  @Input() autoCompleteFn: any;
  @Input() model!: string
  @Output() onSelect = new EventEmitter();
  public fireAutoCompleteFn = (inputValue: Observable<string>)=>{
    return inputValue.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((text) => this.autoFn(text)))
  }
  constructor() { }

  autoFn(text: string): Observable<readonly any[]>{
    return this.autoCompleteFn(text).pipe(map((results: any) => {
      return results.list;
    }), catchError(()=>{
      return []
    }));
  }
  OnSelectItem({item}: any){
    this.onSelect.emit(item.name)
  }

  resultFormatter(entry: any){
    return entry?.name || ''
  }

  ngOnInit(): void {
  }

}
