import { Injectable } from '@nestjs/common';
import { StripeService } from './stripe/stripe.service';

@Injectable()
export class AppService {
  constructor(private readonly stripeService: StripeService) {}
  async getHeartbeat(): Promise<string> {
    const session = await this.stripeService.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
    });
    console.log(session);

    return session.url;
  }
}
