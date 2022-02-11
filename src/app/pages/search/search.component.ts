import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // Se convierte automaticamente en un observable
  // Al ligarlo a [formcontrol]
  inputSearch = new FormControl('');

  @Output() submitted = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.onChange();
  }

  onChange(): void {
    this.inputSearch.valueChanges
      .pipe(
        // Transformando la respuesta, quitando espacios
        map((search: string) => search.trim()),
        // Esperando el tiempo para emitir
        debounceTime(350),
        // Verificar que el valor que va a emitir es diferente al previamente emitido
        distinctUntilChanged(),
        // Asegurandonos que lo que llegue no este vacio
        filter((search: string) => search !== ''),
        // Si todo es correcto entonces emitimos
        tap((search: string) => this.submitted.emit(search))
      )
      .subscribe();

    // this.inputSearch.valueChanges
    //   .pipe(
    //     tap(res => this.submitted.emit(res))
    //   )
    //   .subscribe();
  }

}
