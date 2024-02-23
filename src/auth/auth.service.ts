import {
  BadRequestException,
  Get,
  HttpCode,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/database/entities/users.entity';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/logindto.dto';
import { RegisterDto } from 'src/users/dto/registerdt0.dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as handlebars from 'handlebars';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private readonly mailService: MailerService,
  ) {}

  async login(user: LoginDto) {
    const userFound = await this.usersService.geteUser(user.uid);

    if (!userFound) {
      throw new UnauthorizedException('Invalid uid');
    }

    const payload = { user: userFound.id };
    const token = this.jwtService.sign(payload);
    const data = {
      user: { userInfo: userFound },
      token,
    };

    return data;
  }

  async register(user: RegisterDto) {
    const userFound = await this.usersService.geteUser(user.uid);

    if (userFound) {
      throw new BadRequestException('uid already exists');
    }
    const us = await this.usersService.registerUser(user);
    const payload = { user: us.id };
    const token = this.jwtService.sign(payload);
    let html = `<!DOCTYPE html>
    <html lang="es">
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <title>Registration Confirmation</title>
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                background-color: #f6f9fc;
            }
    
            .wrapper {
                width: 100%;
                background-color: #f6f9fc;
            }
    
            .webkit {
                width: 100%;
                padding-top: 40px;
                padding-bottom: 40px;
                background-color: #388e3c0f;
            }
    
            .outer {
                Margin: 0 auto;
                width: 50%; /* Ajuste el ancho del contenedor exterior según sea necesario */
                border-spacing: 0;
            }
    
            .auth {
                display: block;
                margin-left: auto;
                margin-right: auto;
                max-width: 100%;
                height: auto;
            }
    
            .content {
                padding: 20px;
                text-align: center;
            }
    
            .cont-container {
        text-align: center;
    }
    
    .cont {
        text-decoration: none;
        color: #000000;
        display: inline-block;
        padding: 13px 10px;
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: #E6E4D7e0;
        border-radius: 4px;
        font-family: 'JakartaSans', sans-serif;
        width: 50%;
    }
    
    
            .resend-link {
                text-align: center;
                font-family: 'JakartaSans', sans-serif;
                margin-top: 20px;
                font-size: 14px;
                color: green;
            }
    
            @media screen and (max-width: 800px) {
                .outer {
                    width: 100%; /* Cambiar el ancho al 100% para dispositivos móviles */
                }
    
                .cont {
                    width: 50%; /* Recortar el ancho del botón al 100% para dispositivos móviles */
                }
            }
        </style>
        <!-- Agregamos el enlace para cargar la fuente JakartaSans -->
        <link href="https://fonts.googleapis.com/css2?family=Jakarta+Sans:wght@300&display=swap" rel="stylesheet">
    </head>
    
    <body>
        <div class="wrapper">
            <div class="webkit">
                <table class="outer" role="presentation" align="center">
                    <tr>
                        <td>
                            <img src="https://i.ibb.co/jWqcJS0/miimagen1.png" class="auth" width="50%">
                        </td>
                    </tr>
                    <tr>
                        <td class="content">
                            <h1>BIENVENIDO {{usuario}}</h1>
                            <h3 style="font-family: 'JakartaSans', sans-serif; text-align: center; margin-top: 30px;">¡Se ha registrado exitosamente!</h3>
                            <p style="font-family: 'JakartaSans', sans-serif; text-align: center; margin-top: 35px; padding-left: 20px; padding-right: 20px;">Registro finalizado, ya puedes iniciar sesion en tu movil!!.</p>
                        </td>
                    </tr>
                    <tr>
                       <td class="cont-container">
        <a href="#" class="cont">CONTINUAR</a>
    </td>
    
                    </tr>
                    <tr>
    
                        
    
                    </tr> 
                </table>
            </div>
        </div>
    </body>
    
    </html>
    `

    const compiledTemplate = handlebars.compile(html);
    const context = {
      usuario: user.nombre + ' ' + user.apellido,
   
      /* message: '¡Este es un mensaje de ejemplo!' */
    };
    html = compiledTemplate(context);
    await this.mailService.sendMail({
      to: user.email,
      from: 'BOTANICAL botanicalmovil@gmail.com',
      subject: 'Bienvenido!',
      html: html,
    });
    
    return {
      message: 'User created successfully',
      user: { userInfo: us },
      token,
    };
  }
}
