import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeCriticalsUpdate = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  onStatusChanged(data: string) {
    this.invokeCriticalsUpdate.emit(data);
  }
}

