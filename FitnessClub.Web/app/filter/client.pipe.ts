import { PipeTransform, Pipe } from '@angular/core';
import { IClient } from '../Model/client';

@Pipe({
    name: 'clientFilter'
})
export class ClientFilterPipe implements PipeTransform {
    transform(value: IClient[], filter: string): IClient[] {
        filter = filter ? filter.toLocaleLowerCase() : null;

        return filter ? value.filter((app: IClient) =>
            app.FirstName != null && app.FirstName.toLocaleLowerCase().indexOf(filter) != -1
            || app.LastName != null && app.LastName.toLocaleLowerCase().indexOf(filter) != -1            
        ) : value;
    }

}