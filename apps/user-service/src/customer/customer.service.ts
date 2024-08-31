import { Injectable } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gig } from '../entities/gig.entity';
import { Gigster } from '../entities/gigster.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Gig) private gigRepo: Repository<Gig>,
    @InjectRepository(Gigster) private  gigsterRepo: Repository<Gigster>
    
  ) {}

  async createCustomer(customerData: any): Promise<Customer> {
    try {
      const newCustomer = new Customer();
      Object.assign(newCustomer, {
        userId: customerData.userId,
        preferences: customerData.preferences,
      });
      return await this.customerRepository.save(newCustomer);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findCustomerById({id}): Promise<Customer> {
    try {
      return await this.customerRepository.findOne({where: {id}});
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getAllCustomers(): Promise<Customer[]> {
    try {
      return await this.customerRepository.find();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async removeAllCustomers(): Promise<void> {
    try {
      await this.customerRepository.clear();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async removeCustomerById({id}): Promise<void> {
    try {
      await this.customerRepository.delete(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async homepage() {
    try {
      const gigs = await this.gigRepo.find({
        take: 9,
      }) 

      const gigsters = await this.gigsterRepo.find({
        take: 9,
      })

      return {
        gigs,
        gigsters
      }
    } catch(e) {}

  }
}
