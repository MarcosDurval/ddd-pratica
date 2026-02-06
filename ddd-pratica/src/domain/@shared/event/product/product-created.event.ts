import EventInterface from  "../../event.interface";

export default class ProductCreatedEvent implements EventInterface {
  public dateTimeOccurred: Date;
  public eventData: any;

  constructor(eventData: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
