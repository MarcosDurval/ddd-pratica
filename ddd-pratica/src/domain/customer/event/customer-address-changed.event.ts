import EventInterface from "../../@shared/event/event.interface";
import Address from "../entity/value-object/address";

type CustomerAddressChangedData = {
    id: string;
    name: string;
    address: Address;
  }

export default class CustomerAddressChangedEvent 
implements EventInterface {
  dateTimeOccurred: Date;
  eventData: CustomerAddressChangedData;

  constructor(eventData: CustomerAddressChangedData) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}