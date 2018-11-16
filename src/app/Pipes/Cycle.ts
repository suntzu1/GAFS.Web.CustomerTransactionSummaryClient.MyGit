import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cycle' })
export class Cycle implements PipeTransform {
    transform(value: string): string {
        if (value === null) { return ''; }
        let ret = '';
        switch (value) {
            case 'M':
                ret = 'Monthly';
                break;
            case 'Y':
                ret = 'Yearly';
                break;
            case 'W':
                ret = 'Weekly';
                break;
            case 'D':
                ret = 'Daily';
                break;
        }
        return ret;
    }
}
