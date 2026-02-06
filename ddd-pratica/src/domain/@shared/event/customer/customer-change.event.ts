import EventInterface from "../../event.interface";
import Address from "../../../entity/address";
  type ChangeAddress = {
    id: string;
    name: string;
    address: Address;
  }

export default class CustomerChangeAddressEvent 
implements EventInterface {
  dateTimeOccurred: Date;
  eventData: ChangeAddress;

  constructor(eventData: ChangeAddress) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}