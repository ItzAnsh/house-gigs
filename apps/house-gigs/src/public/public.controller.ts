import { Controller, Get, Query } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
    constructor(private readonly publicService: PublicService) {}

    @Get("/home")
    async getHome(@Query("g") gigLimit, @Query("gi") packageLimit) {
        return await this.publicService.homepage(gigLimit, packageLimit);
    }
}
