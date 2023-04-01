import { Controller, Post, Body } from '@nestjs/common'

import { PaymentService } from './payment.service'
import { CreatePaymentDto } from './dto/create-payment.dto'

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-customer')
  async createStripeCustomer() {
    const customer = await this.paymentService.createStripeCustomer()
    return customer
  }

  @Post()
  async createPaymentIntent(@Body() createPaymentDto: CreatePaymentDto) {
    const paymentIntent = await this.paymentService.createPaymentIntent(
      createPaymentDto
    )
    return paymentIntent
  }

  @Post('/confirm')
  async confirmPaymentIntent(@Body('paymentIntentId') paymentIntentId: string, @Body('userId') customer: string) {
    const paymentIntent = await this.paymentService.confirmPaymentIntent(
      paymentIntentId,
      customer
    )
    return paymentIntent
  }
}