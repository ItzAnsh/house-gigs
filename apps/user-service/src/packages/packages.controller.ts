import { Controller } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { MessagePattern } from '@nestjs/microservices';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @MessagePattern('packages.getAll')
  async getAllPackages() {
    return await this.packagesService.findAll();
  }

  @MessagePattern('packages.getById')
  async getPackageById(body: any) {
    return await this.packagesService.findAllPackagesFromGig(body.id);
  }

  @MessagePattern('packages.delete')
  async deletePackage(body: any) {
    return await this.packagesService.deletePackage(body.id);
  }

  @MessagePattern('packages.create')
  async createPackage(body: any) {
    console.log(body);
    return await this.packagesService.createPackage(body);
  }

  @MessagePattern('packages.findById')
  async findById(body: any) {
    return await this.packagesService.findById(body.id);
  }

  @MessagePattern('packages.findByUserId')
  async findByUserId(body: any) {
    try {
      return await this.packagesService.findByUserId(body.id);
    } catch (e) {}
  }

  @MessagePattern('packages.findByGigId')
  async findByGigId(body: any) {
    return await this.packagesService.findByGigId(body.id);
  }

  @MessagePattern('packages.updateDescription')
  async updateDescription(body: any) {
    // console.log(body);
    try {
      return await this.packagesService.updateDescription(body);
    } catch (e) {
      throw new HttpErrorByCode[400]('Error updating description');
    }
  }
}
