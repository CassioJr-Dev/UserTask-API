import { 
  ConflictException, Injectable, 
  NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersRepository } from './repository/users.repository'
import { UserEntity } from './userEntity/user.entity'
import { hash } from 'bcryptjs'
import { AuthService } from 'src/auth/auth.service'
import { DataUser } from './model/dataUser'
import { ValidateEmail } from 'src/validateEmail/validateEmail.service'
import { CodeUserDto } from './dto/code-user.dto'


@Injectable()
export class UsersService {
  arrayData: DataUser[] = []

  constructor(
    private readonly repository: UsersRepository,
    private readonly authService: AuthService,
    private readonly validateEmailService: ValidateEmail
    ){}

  async create({ name, email, password }: CreateUserDto): Promise<void> {
    const emailExists = await this.repository.emailExists(email)

    if(emailExists) {
      throw new ConflictException('Previous existence of the user with the same email!')
    }

    const subject = process.env.SUBJECT
    const code = this.validateEmailService.generateVerificationCode()
    const html = this.validateEmailService.emailContent(code)
    this.validateEmailService.send(email, subject, html)

    const teste: DataUser = {
      code,
      name,
      email,
      password
    }

    this.arrayData.push(teste)

    return
  
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.repository.findAll()
    
    if (users.length < 1) {
      throw new NotFoundException('Users not found!')
    }
    
    users.forEach(element => {
      delete element.password
    });

    return users
  }

  async findOne(id: string): Promise<UserEntity> {
    const userExists = await this.repository.findOne(id)

    if(!userExists) {
      throw new NotFoundException('User not found!')
    }

    delete userExists.password

    return userExists
  }

  async update(headerAuthorization: string, { name, email, password }: UpdateUserDto): Promise<UserEntity> {

    const extractUserId = await this.verifyExtractIDFromToken(headerAuthorization)
    
    let hashedPassword: string | undefined

    if(password){
      hashedPassword = await hash(password, 10)
    }

    const updateUser = await this.repository.update(extractUserId, {
      name,
      email,
      password: hashedPassword 
    });

    delete updateUser.password

    return updateUser
  }

  async remove(headerAuthorization: string): Promise<UserEntity> {

    const extractUserId = await this.verifyExtractIDFromToken(headerAuthorization)

    return this.repository.remove(extractUserId)
  }

  private async verifyExtractIDFromToken(headerAuthorization: string) {
    const jwtExtractor = this.authService.jwtExtractor(headerAuthorization)

    const extractUserId = this.authService.extractUserIdFromToken(jwtExtractor)

    const userExists = await this.repository.findOne(extractUserId)

    if(!userExists) {
      throw new UnauthorizedException('User not authorized!')
    }

    return extractUserId
  }

  async confirmCode({ code } : CodeUserDto): Promise<UserEntity>{
    const findUser = this.arrayData.find((user) => user.code === code)

    if(!findUser) {
      throw new UnauthorizedException('Incorrect verification code!')
    }

    const teste = this.arrayData.findIndex((item, index, array) => {
      if (item.code === code) {
        array.splice(index, 1)
      }
    })

    const hashedPassword = await hash(findUser.password, 10)

    const createUser = await this.repository.create({
      name: findUser.name,
      email: findUser.email,
      password: hashedPassword
    });

    delete createUser.password

    const jwtToken = this.authService.createAccessToken(createUser.id)
   
    const userReturn = {
      ...createUser,
      jwtToken
    }
    
    return userReturn
  }
}
