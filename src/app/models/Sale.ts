import { Big } from 'big.js';
import * as moment from 'moment';

import { Item } from './Item';

export class Sale {
     client_id  :  string ;
     date  : moment.Moment ;
     client_name  :  string  ;
     client_phone  :  string  ;
     client_address  :  string ;
     items  : Item[] ;
     subtotal  : Big ;
     tax  : Big ;
     total  : Big;
}