import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

const findResponse = [
  new User({
    id: 1,
    name: 'test-1',
    birthdate: new Date('2000-03-30'),
    phone: '48 9 9999 9999',
    taxId: '999.999.999-99',
    email: 'teste1@email.com',
    password: 'teste1',
    securityCode: '123456',
    addressId: 1,
  }),
];

describe('AuthController', () => {
  let authController: AuthController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            find: jest.fn().mockResolvedValue(findResponse),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue(findResponse),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(usersService).toBeDefined();
  });
});
