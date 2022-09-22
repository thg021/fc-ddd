import EventInterface from "../../@shared/event/event.interface";

export default class CustomerChangedAddressEvent implements EventInterface{
  dataTimeOccured: Date;
  eventData: any;

  constructor(eventData: any){
    this.eventData = eventData
    this.dataTimeOccured = new Date()
  }

}