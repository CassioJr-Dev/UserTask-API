import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JsonWebTokenError, TokenExpiredError, sign, verify } from 'jsonwebtoken'
import { JwtPayLoad } from './models/jwt.payload.model'

@Injectable()
export class AuthService {

    public createAccessToken(userId: string): string {
        return sign({ userId }, process.env.JWT_SECRET, {
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
    
            const userId = decodedToken.userId;
    
            return userId;

        } catch (error) {
            if (error instanceof TokenExpiredError) {

                throw new UnauthorizedException('Expired token!')

            } else if (error instanceof JsonWebTokenError) {
                
                throw new UnauthorizedException('Invalid token!')
            }
    
            return null
        }
    }
}
