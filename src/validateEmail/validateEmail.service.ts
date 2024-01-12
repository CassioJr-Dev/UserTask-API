import { Injectable } from "@nestjs/common"
import { createTransport } from "nodemailer"

@Injectable()
export class ValidateEmail {
    public send(to: string, subject: string, body: string) {

        const transporter = createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
        
        })

        transporter.sendMail({
            from: process.env.MAIL_FROM,
            to,
            subject,
            html: body
        })
    }

    public generateVerificationCode() {
        const caracteresPermitidos = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let sequencia = '';
      
        for (let i = 0; i < 6; i++) {
          const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
          sequencia += caracteresPermitidos.charAt(indiceAleatorio);
        }
      
        return sequencia;
      }

      public emailContent(code: string) {
        return `<!doctype html>
        <html>
          <head>
            <meta http-equiv=3D"Content-Type" content=3D"text/html; charset=3DUTF-8">
          </head>
          <body style=3D"font-family: sans-serif;">
            <div style=3D"display: block; margin: auto; max-width: 600px;" class=3D"main">
              <h1 style=3D"font-size: 18px; font-weight: bold; margin-top: 20px">Código de verificação<br> <hr> ${code}</h1>
          </body>
        </html>`
    }
}
