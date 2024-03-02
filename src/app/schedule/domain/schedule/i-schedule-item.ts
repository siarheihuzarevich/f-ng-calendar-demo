import { IClient } from '../client/i-client';
import { IService } from '../service/i-service';
import { IEmployee } from '../employee/i-employee';

export interface IScheduleItem {

  id: string;

  client: IClient;

  service: IService;

  employee: IEmployee;
}
