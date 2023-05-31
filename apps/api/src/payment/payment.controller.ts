import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import { PaymentService } from './payment.service'
import { OpencageService } from '../opencage/opencage.service';
import { Roles } from '../config/decorators/roles.decorator';
import { Role } from '../config/enum/role.enum';
import { StripeWebhookService } from './stripe-webhook.service';

@Controller('payment')
@UseGuards(ThrottlerGuard)
export class PaymentController {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly paymentService: PaymentService,
    private opencageService: OpencageService,
    private stripeWebhookService: StripeWebhookService,
  ) { }


  @Post('checkout')
  @Throttle(100, 60)
  @Roles(Role.Advertiser, Role.Admin)
  async createCheckoutSession(@Body() { amount }: { amount: number }): Promise<{ sessionId: string }> {
    // const currency = await this.opencageService.getCurrency({ location });
    const createCheckoutDto: { currency: string, amount: number } = {
      currency: 'eur',
      amount,
    };
    const sessionId = await this.paymentService.createCheckoutSession(createCheckoutDto);
    return { sessionId };
  }
  
  @Post('webhook')
  @Throttle(100, 60)
  @Roles(Role.Advertiser, Role.Admin)
  async webhook(@Body() body) {
    return await this.stripeWebhookService.handleStripeWebhook(body);
  }
}
