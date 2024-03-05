import { IHandler } from '@foblex/core';
import { GenerateServicesRequest } from './generate-services-request';
import { generateId } from '../../generate-id';
import { randomInt } from '../../random-int';
import { IService } from '../i-service';

export class GenerateServicesHandler implements IHandler<GenerateServicesRequest, IService[]> {
  public handle(request: GenerateServicesRequest): IService[] {
    const result = this.generateClients(randomInt(10, 20));
    return result;
  }

  private generateClients(count: number): IService[] {
    const result: IService[] = [];
    const colors = generateColors(count);

    for (let i = 0; i < count; i++) {
      result.push({
        id: generateId("service"),
        name: 'Service Name ' + (i + 1),
        color: colors[i]
      });
    }

    return result;
  }
}

function generateColors(count: number): string[] {
  const colors: string[] = [];
  const saturation: number = 40;
  const lightness: number = 50;

  for (let i = 0; i < count; i++) {
    const hue: number = (360 * i) / count;
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
}
