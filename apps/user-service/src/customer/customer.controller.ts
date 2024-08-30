import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @MessagePattern('user.createCustomer')
  async createCustomer(data: any) {
    return this.customerService.createCustomer(data);
  }

  @MessagePattern('user.findCustomerById')
  async findCustomerById(data: any) {
    return this.customerService.findCustomerById(data);
  }

  @MessagePattern('user.getAllCustomers')
  async getAllCustomers() {
    return this.customerService.getAllCustomers();
  }

  @MessagePattern('user.removeAllCustomers')
  async removeAllCustomers() {
    return this.customerService.removeAllCustomers();
  }

  @MessagePattern('user.removeCustomerById')
  async removeCustomerById(data: any) {
    return this.customerService.removeCustomerById(data);
  }
}
