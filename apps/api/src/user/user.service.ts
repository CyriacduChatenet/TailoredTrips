import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiLimitResourceQuery } from '@travel-tailor/types'
import { DeleteResult } from 'typeorm'

import { SignupUserInputDTO } from './dto/signup-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { testEmailUtil } from '../config/utils/regex-test-email.util'
import { UserRepository } from './user.repository'
import { Role } from '../config/enum/role.enum'
import { Traveler } from './traveler/entities/traveler.entity'
import { TravelerService } from './traveler/traveler.service'
import { CustomerService } from '../payment/customer/customer.service'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private travelerService: TravelerService, private customerService: CustomerService) { }

  async create(signupUserDto: SignupUserInputDTO, roles: Role): Promise<User> {
    try {
      if (testEmailUtil(signupUserDto.email)) {
        const customer = await this.customerService.createCustomer({ email: signupUserDto.email, name: signupUserDto.username })

        const user = new User()
        user.username = signupUserDto.username
        user.email = signupUserDto.email
        user.password = signupUserDto.password
        user.roles = roles
        user.customer = customer

        switch (roles) {
          case Role.Traveler: {
            const traveler = new Traveler()
            user.traveler = traveler
            await this.travelerService.save(traveler)
            return await this.userRepository.save(user)
          }
            break;
      }

      return await this.userRepository.save(user)
      } else {
        throw new BadRequestException('email must contain ***@***.***')
      }
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Unauthorized to create user',
        error
      })
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      return await this.userRepository.findAllUser(queries)
    } catch (error) {
      throw new NotFoundException({
        message: 'List of users not found',
        error
      })
    }
  }

  public async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneUserByEmail(email)
    } catch (error) {
      throw new NotFoundException({
        message: `User not found with email: ${email}`,
        error
      })
    }
  }

  async update(id: string, signupUserDto: UpdateUserDTO | unknown) {
    try {
      return await this.userRepository.updateUser(id, signupUserDto)
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to update user with id: ${id}`,
        error
      })
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.userRepository.removeUser(id)
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to delete user with id: ${id}`,
        error
      })
    }
  }
}
