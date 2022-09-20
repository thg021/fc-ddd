import EventInterface from "../event.interface";

export default class ProductCreatedEvent implements EventInterface{
  dataTimeOccured: Date;
  eventData: any;

  constructor(eventData: any){
    this.dataTimeOccured = new Date()
    this.eventData = eventData
  }

}