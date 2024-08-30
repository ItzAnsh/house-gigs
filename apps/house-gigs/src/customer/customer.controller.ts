import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}
    
    @Post("create")
    async createCustomer(@Request() req, @Body() body) {
        return this.customerService.sendUserService("user.createCustomer", {userId: req.user, preferences: []});
    }

    @Get("findUser/:id")
    async findCustomerById(@Param("id") id: string) {
        return this.customerService.sendUserService("user.findCustomerById", {id});
    }

    @Get("all")
    async getAllCustomers() {
        return this.customerService.sendUserService("user.getAllCustomers", {});
    }

    @Post("remove/:id")
    async removeCustomerById(@Param("id") id: string) {
        return this.customerService.sendUserService("user.removeCustomerById", {id});
    }

    @Post("removeAll")
    async removeAllCustomers() {
        return this.customerService.sendUserService("user.removeAllCustomers", {});
    }

    @Get("/getBookingsByUserId")
    async getBookingsByUserId(@Request() req) {
        return this.customerService.sendBookingService("bookings.showUserBookings", {userId: req.user});
    }

    @Post("/createBooking")
    async createBooking(@Request() req, @Body() body) {
        return this.customerService.sendBookingService(body, "booking.create");
    }

    @Post("/updateBookingStatus/:id")
    async updateBookingStatus(@Request() req, @Param() param, @Body() body) {
        return this.customerService.sendBookingService("booking.updateStatus", {id: param.id, status: body.status});
    }

}
// Implement middleware
