import { Pipe, PipeTransform } from '@angular/core';
import { formatStringSpacing } from '../lib/utils';

@Pipe({
  name: 'formatStringSpacing',
  standalone: true,
})
export class FormatStringSpacingPipe implements PipeTransform {
  transform(value: string, space: number, spacer: string): string {
    return formatStringSpacing(value as string, space, spacer);
  }
}
