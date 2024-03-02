import { IHandler } from '@foblex/core';
import { GenerateEmployeesRequest } from './generate-employees-request';
import { generateId } from '../../generate-id';
import { randomInt } from '../../random-int';
import { IEmployee } from '../i-employee';
import { generateName } from '@foblex/test-resources';

export class GenerateEmployeesHandler implements IHandler<GenerateEmployeesRequest, IEmployee[]> {
  public handle(request: GenerateEmployeesRequest): IEmployee[] {
    const result = this.generate(randomInt(10, 20));
    return result;
  }

  private generate(count: number): IEmployee[] {
    const result: IEmployee[] = [];

    for (let i = 0; i < count; i++) {
      const fullName = generateName();
      result.push({
        id: generateId("employee"),
        name: fullName,
      });
    }

    return result;
  }
}
