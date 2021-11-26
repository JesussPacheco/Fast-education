import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
<<<<<<< HEAD
import { TransactionsModule } from './transactions/transactions.module';
import { FeedbackModule } from './feedback/feedback.module';
=======
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { RoutesModule } from './routes/routes.module';
>>>>>>> ba1bc4c37c9f82352e93408df0242cd83c78587d

@Module({
  imports: [
    UsersModule,
    AccountsModule,
<<<<<<< HEAD
    TransactionsModule,
	FeedbackModule,
=======
    SubscriptionsModule,
    RoutesModule,
>>>>>>> ba1bc4c37c9f82352e93408df0242cd83c78587d
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
