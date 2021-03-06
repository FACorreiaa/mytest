import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'dateAgo',
  pure: true,
})
export class DateAgoPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000)
      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
      }

      if (seconds < 29) {
        return 'csa.review.published'
      } else {
        for (const i in intervals) {
          if (intervals.hasOwnProperty(i)) {
            const counter = Math.floor(seconds / intervals[i])
            if (counter > 0) {
              if (counter === 1) {
                return counter + ' ' + i
              } else {
                return counter + ' ' + i + 's '
              }
            }
          }
        }
      }
    }
    return value
  }
}
