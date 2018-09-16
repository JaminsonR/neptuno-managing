import { Big } from 'big.js';


import { Item } from './Item';

export class Sale {
     client_id  :  string ;
     date  : Date ;
     client_name  :  string  ;
     client_phone  :  string  ;
     client_address  :  string ;
     items  : Item[] ;
     subtotal  : Big ;
     tax  : Big ;
     total  : Big;
}