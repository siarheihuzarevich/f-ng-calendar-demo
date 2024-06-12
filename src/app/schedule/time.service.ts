import { Injectable } from '@angular/core';
import { IClient } from './domain/client/i-client';
import { GenerateClientsHandler } from './domain/client/generate-clients/generate-clients.handler';
import { GenerateClientsRequest } from './domain/client/generate-clients/generate-clients-request';
import { IIdName } from './domain/i-id-name';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  public interval: number = 60;
  public startTime: Date = new Date(0, 0, 0, 10, 0);
  public endTime: Date = new Date(0, 0, 0, 20, 0);

  constructor() {

  }

  public getList(): IIdName<Date>[] {
    return Array(this.endTime.getHours() - this.startTime.getHours()).fill(this.startTime).map((_, index) => {
      const date = new Date(0, 0, 0, this.startTime.getHours(), this.startTime.getMinutes());
      date.setMinutes(this.startTime.getMinutes() + index * this.interval);
      return {
        id: date,
        name: date.toLocaleTimeString()
      };
    });
  }

}
