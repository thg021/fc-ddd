import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEventLog from "../customer-created-log.event";

export default class SendConsoleLog2WhenCustomerCreated implements EventHandlerInterface<CustomerCreatedEventLog>{
  handle(event: CustomerCreatedEventLog): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated")
  }
}