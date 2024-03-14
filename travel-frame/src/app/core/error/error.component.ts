import { Component, OnInit, Pipe } from '@angular/core';
import { ErrorService } from './error.service';
import { pipe } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {
  apiError$ = this.errorService.apiError$$.asObservable();
  constructor(private errorService: ErrorService) { }
  errMsg = ''

  ngOnInit(): void {
    this.apiError$.subscribe((err: any) => {
      this.errMsg = err.message
    })
  }
}
