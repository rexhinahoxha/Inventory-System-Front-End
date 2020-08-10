import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'reportsTablePipe'})
export class ReportTablePipe implements PipeTransform {
  transform(value, args:string[]) : any {
    return Object.keys(value);
  }
}