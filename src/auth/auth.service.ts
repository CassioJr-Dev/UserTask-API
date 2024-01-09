import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError, sign, verify } from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';
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
            throw new BadRequestException('JWT token missing from request!')
        }

        const [, token] = authHeader.split(' ')

        return token
    }

    public extractUserIdFromToken(token: string): string | null {
        try {
            const decodedToken:JwtPayLoad = verify(token, process.env.JWT_SECRET) as JwtPayLoad;
    
            // Recupera o ID do usuário do corpo (payload)
            const userId = decodedToken.userId;
    
            return userId;

        } catch (error) {
            if (error instanceof TokenExpiredError) {
                // Tratamento para token expirado, se necessário
                throw new UnauthorizedException('Expired token!')
            } else if (error instanceof JsonWebTokenError) {
                // Tratamento para token inválido, se necessário
                throw new UnauthorizedException('Invalid token!')
            }
    
            return null;
        }
    }
}
