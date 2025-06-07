import { Pipe, PipeTransform } from '@angular/core';
import { redactString } from '../lib/utils';

@Pipe({
  name: 'redactString',
  standalone: true,
})
export class RedactStringPipe implements PipeTransform {
  transform(value: string, start: number, end: number): string {
    return redactString(value, start, end);
  }
}
