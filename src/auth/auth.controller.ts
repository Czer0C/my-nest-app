import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password
    )

    if (!user) return { message: 'Invalid credentials' }
    return this.authService.login(user)
  }

  @Get('validate')
  async validateToken(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return { message: 'No token provided' }

    try {
      const decoded = this.jwtService.verify(token)
      return { valid: true, user: decoded }
    } catch (error) {
      return { valid: false, message: 'Invalid token' }
    }
  }
}
