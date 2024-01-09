import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload, sign } from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/users/userEntity/user.entity';
import * as jwt from 'jsonwebtoken'
import { JwtPayLoad } from './models/jwt.payload.model';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService){}

    public async createAccessToken(userId: string): Promise<string> {
        return sign({ userId }, process.env.JWT_SECRET, { // usado para criar e indentificar o usuario do token
            expiresIn: process.env.JWT_EXPIRATION
        })
    }

    public jwtExtractor(headerAuthorization: string): string {
        const authHeader = headerAuthorization

        if(!authHeader) {
            throw new BadRequestException('Bad request')
        }

        const [, token] = authHeader.split(' ')

        return token
    }

    extrairIdDoUsuario(token: string): string | null {
        try {
            const decodedToken:JwtPayLoad = jwt.verify(token, process.env.JWT_SECRET) as JwtPayLoad;
    
            // Recupera o ID do usuário do corpo (payload)
            const userId = decodedToken.userId;
    
            return userId;

        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                // Tratamento para token expirado, se necessário
                throw new UnauthorizedException('Expired token!')
            } else if (error instanceof jwt.JsonWebTokenError) {
                // Tratamento para token inválido, se necessário
                throw new UnauthorizedException('Invalid token!')
            }
    
            return null;
        }
    }
}
