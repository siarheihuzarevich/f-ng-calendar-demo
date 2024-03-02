import { IHandler } from '@foblex/core';
import { GenerateClientsRequest } from './generate-clients-request';
import { IClient } from '../i-client';
import { generateId } from '../../generate-id';
import { randomInt } from '../../random-int';
import { generateEmail, generateName, generatePhoneNumber } from '@foblex/test-resources';

export class GenerateClientsHandler implements IHandler<GenerateClientsRequest, IClient[]> {
  public handle(request: GenerateClientsRequest): IClient[] {
    const result = this.generate(randomInt(10, 20));
    return result;
  }

  private generate(count: number): IClient[] {
    const result: IClient[] = [];

    for (let i = 0; i < count; i++) {
      const fullName = generateName();
      result.push({
        id: generateId("client"),
        name: fullName,
        phoneNumber: generatePhoneNumber(),
        emailAddress: generateEmail(fullName, "example.com")
      });
    }

    return result;
  }
}
