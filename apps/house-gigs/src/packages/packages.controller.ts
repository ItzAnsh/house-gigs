import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { PackagesService } from './packages.service';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get('/findAll')
  async getAllPackages() {
    return await this.packagesService.sendPackageMessage('packages.getAll', {});
  }

  @Post('/getById')
  async getPackageById(@Body() body: any) {
    return await this.packagesService.sendPackageMessage(
      'packages.getById',
      body,
    );
  }

  @Post('/delete')
  async deletePackage(@Body() body: any) {
    return await this.packagesService.sendPackageMessage(
      'packages.delete',
      body,
    );
  }

  @Post('/create')
  async createPackage(@Req() req, @Body() body: any): Promise<void> {
    console.log(body);
    await this.packagesService.sendPackageMessage('packages.create', {
      ...body,
      userId: req.user,
    });
    return;
  }

  @Post('/findByUserId')
  async findByUserId(@Body() body: any) {
    return await this.packagesService.sendPackageMessage(
      'packages.findByUserId',
      body,
    );
  }

  @Post('/findByGigId')
  async findByGigId(@Body() body: any) {
    return await this.packagesService.sendPackageMessage(
      'packages.findByGigId',
      body,
    );
  }

  @Post('/updateDescription')
  async updateDescription(@Req() req, @Body() body: any) {
    // console.log(req.user);
    return await this.packagesService.sendPackageMessage(
      'packages.updateDescription',
      { ...body, userId: req.user },
    );
  }
}
