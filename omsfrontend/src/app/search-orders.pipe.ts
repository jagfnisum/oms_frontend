import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchOrders'
})
export class SearchOrdersPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return null;
    if(!args) return value;

    args=args.toLowerCase();
    return value.filter(function(item:string){
      return JSON.stringify(item)
      .toLowerCase()
      .includes(args);
      
    });
    
    
  }

}
