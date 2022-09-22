
import EventDispatcher from "../../@shared/event/event-dispatcher";
import { Customer } from "../entity/customer";
import Address from "../value-objects/address";
import CustomerChangedAddressEvent from "./customer-changed-event.event";
import CustomerCreatedEventLog from "./customer-created-log.event";
import CustomerCreatedEvent from "./customer-created.event";

import SendConsoleLog2WhenCustomerCreated from "./handlers/send-console-log-2-when-customer-created.handler";
import SendConsoleLogWhenCustomerAddressChanged from "./handlers/send-console-log-when-customer-address-changed-handler.ts";
import SendConsoleLogWhenCustomerCreated from "./handlers/send-console-log-when-customer-created.handler";

describe('Customer created event unit test', () => {
  const spyOnConsole = jest.spyOn(console, 'log')
  const customer = new Customer('1', 'customer 1')
  const eventDispatcher = new EventDispatcher()
  it("should notify all event handlers", () => {
    
    const eventHandler = new SendConsoleLogWhenCustomerCreated()
    const eventHandler2 = new SendConsoleLog2WhenCustomerCreated()
    
    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2)

    const handle1 = new CustomerCreatedEvent(customer)
    eventDispatcher.notify(handle1)
    expect(spyOnConsole).toBeCalledWith("Esse é o primeiro console.log do evento: CustomerCreated")

    const handle2 = new CustomerCreatedEventLog(customer)
    eventDispatcher.notify(handle2)
    expect(spyOnConsole).toBeCalledWith("Esse é o primeiro console.log do evento: CustomerCreated")
  
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toHaveLength(2)

  })

  it('should notify when customer address changed', () => {
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.changeAddress(address)
    const eventHandlerChanged = new SendConsoleLogWhenCustomerAddressChanged()
    eventDispatcher.register("CustomerChangedAddressEvent", eventHandlerChanged);

    const changedEventHandler = new CustomerChangedAddressEvent({
      id: customer.id,
      name: customer.name,
      address: customer.Address.toString(),
    })

    eventDispatcher.notify(changedEventHandler)

    expect(spyOnConsole).toBeCalledWith(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.Address.toString()}`)
  });
});