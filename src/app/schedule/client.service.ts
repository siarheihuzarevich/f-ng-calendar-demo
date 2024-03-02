import { Injectable } from '@angular/core';
import { IClient } from './domain/client/i-client';
import { GenerateClientsHandler } from './domain/client/generate-clients/generate-clients.handler';
import { GenerateClientsRequest } from './domain/client/generate-clients/generate-clients-request';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private entities: IClient[] = new GenerateClientsHandler().handle(
    new GenerateClientsRequest()
  );

  constructor() { }

  public getList(): IClient[] {
    return this.entities;
  }
}
