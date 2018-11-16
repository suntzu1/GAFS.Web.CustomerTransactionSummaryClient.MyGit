import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'yesNo'})
export class YesNo implements PipeTransform {
  transform(value: any): string {
    if (value === null) {return ''; }
    switch (value) {
      case 1:
      case '1':
      case 'true':
      case true:
        return 'Yes';
      case 0:
      case '0':
      case 'false':
      case false:
        return 'No';
    }
    return '';
  }
}
