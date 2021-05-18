import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductDto, EditProductDto } from './dtos';

@ApiTags('Product')
@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ){}

    @Get('list')
    findAll(): Promise<Product[]>{
        return this.productService.findAll();
    }

    @Get('find/:id')
    findById(@Param('id') id: string): Promise<Product>{
        return this.productService.findOne(id);
    }

    @Post('create')
    create(@Body() dto: CreateProductDto){
        return this.productService.create(dto);
    }

    @Put('update/:id')
    update(@Param('id') id: string, @Body() dto: EditProductDto){
        return this.productService.editOne(id, dto);
    }

    @Delete('remove/id')
    delete(@Param('id') id: string){
        return this.productService.deleteOne(id)
    }

}
