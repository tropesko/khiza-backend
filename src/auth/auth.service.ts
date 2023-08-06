import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto/auth.dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    // save the user in the database
    try{
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        }
      })
      this.signToken(user.id, user.email);
      return { msg: 'User created!' }
    } catch(error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists')
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if not found, throw an error
    if (!user) throw new ForbiddenException('Wrong email or password');

    // compare the password hash with the password
    const pwMatches = await argon.verify(user.hash, dto.password);

    // if not match, throw an error
    if (!pwMatches) throw new ForbiddenException('Wrong email or password');

    // return the user
    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{access_token: string}> {
    const payload = { sub: userId, email, };

    const secret = process.env.JWT_SECRET;

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '4h',
        secret: secret,
      },
    );

    return { access_token: token };
  }
}
