import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Scopes } from 'nest-keycloak-connect';
import { Product } from './product';
import { ProductService } from './product.service';
import { Attributes } from 'src/utils/decorator';
import { AttributeGuard } from 'src/auth/guard/AttributeGuard.service';

@Controller('product')
//@Resource(Product.name)
export class ProductController {
  constructor(private service: ProductService) {}

  @Get()
  @Scopes('product.view')
  @UseGuards(AttributeGuard)
  @Attributes({ dep: 'general', role: 'admin' })
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':code')
  @Scopes('product.view')
  @UseGuards(AttributeGuard)
  @Attributes({ dep: 'general', role: 'admin' })
  async findByCode(@Param('code') code: string) {
    return await this.service.findByCode(code);
  }

  @Post()
  @Scopes('Create')
  @Get('secure')
  @UseGuards(AttributeGuard)
  @Attributes({ dep: 'finance', role: 'admin' })
  async create(@Body() product: Product) {
    return await this.service.create(product);
  }

  @Delete(':code')
  @Scopes('Delete')
  @UseGuards(AttributeGuard)
  @Attributes({ dep: 'HR', role: 'admin' })
  async deleteByCode(@Param('code') code: string) {
    return await this.service.deleteByCode(code);
  }

  @Put(':code')
  @Scopes('Edit')
  @UseGuards(AttributeGuard)
  @Attributes({ dep: 'HR', role: 'admin' })
  async update(@Param('code') code: string, @Body() product: Product) {
    return await this.service.update(code, product);
  }
}
