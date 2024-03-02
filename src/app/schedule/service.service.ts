import { Injectable } from '@angular/core';
import { IService } from './domain/service/i-service';
import { GenerateServicesHandler } from './domain/service/generate-services/generate-services.handler';
import { GenerateServicesRequest } from './domain/service/generate-services/generate-services-request';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private entities: IService[] = new GenerateServicesHandler().handle(
    new GenerateServicesRequest()
  );

  constructor() { }

  public getList(): IService[] {
    return this.entities;
  }
}
