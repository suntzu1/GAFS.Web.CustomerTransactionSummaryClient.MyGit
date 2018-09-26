import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'yesNo'})
export class YesNo implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Yes' : 'No';
  }
}
