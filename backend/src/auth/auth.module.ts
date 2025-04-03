import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({ secret: 'secretKey', signOptions: { expiresIn: '1h' } })],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
