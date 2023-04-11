import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import {
  SigninDTO,
  SignupDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
} from '@travel-tailor/types'

import { AuthService } from './auth.service'
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  public async signin(@Body() signinUserInputDTO: SigninDTO) {
    return this.authService.signin(signinUserInputDTO)
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleLoginCallback(@Req() req) {
    const { user } = req
    return this.authService.validateGoogleOAuth(user)
  }


  @Post('signup')
  public signup(@Body() signupUserInputDTO: SignupDTO) {
    return this.authService.signup(signupUserInputDTO)
  }

  @Post('forgot-password')
  public forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDTO) {
    return this.authService.forgotPassword(forgotPasswordDto)
  }

  @Post('reset-password/:token')
  public resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDTO
  ) {
    return this.authService.resetPassword(token, resetPasswordDto)
  }
}
