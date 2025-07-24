import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('dashboard')
export class DashboardController {
  @UseGuards(JwtAuthGuard)
  @Get('data')
  getDashboardData() {
    return {
      message: 'Protected dashboard data',
      stats: {
        users: 100,
        revenue: 50000,
        growth: 20,
      },
    };
  }
}
