import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hitos } from 'src/database/entities/hitos.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateHitoDto } from './dto/create-hito.dto';
import { Pplants } from 'src/database/entities/ppants.entity';
import * as handlebars from 'handlebars';
import { Plants } from 'src/database/entities/plants.entity';
import { PlantasService } from 'src/plantas/plantas.service';
import { InvernaderosService } from 'src/invernaderos/invernaderos.service';
import { UsersService } from 'src/users/users.service';
import { NotificacionesService } from 'src/notificaciones/notificaciones.service';


@Injectable()
export class HitosService {
  constructor(
    @InjectRepository(Hitos) private readonly hitoRepository: Repository<Hitos>,
    private pplantsService: InvernaderosService,
    private plantService: PlantasService,
    private invernaderoService: InvernaderosService,
    private readonly mailService: MailerService,
    private readonly usersService: UsersService,
    private readonly notiService: NotificacionesService,

  ) {}
  
 //si se daña lo de hitos es aki
  async createHito(hito: CreateHitoDto) {
    /* const plantFound =  await this.plantService.geteplantId(hito.pplantsId); */
    const pplantFound =  await this.invernaderoService.getePplnatByid(hito.pplantsId); 
    const user = await this.usersService.geteUserById(pplantFound.usersId);
   var htmlPlan = `<!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Notificación</title>
       <style>
           body {
               font-family: 'JakartaSans', 'Arial', sans-serif;
               background-color: #f6f9fc;
               margin: 0;
               padding: 20px;
               box-sizing: border-box;
           }
   
           .notification-box {
               max-width: 100%;
               margin: 0 auto;
               padding: 50px;
               border: 1px solid #5D637A;
               box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
               font-size: 13px;
               line-height: 24px;
               color: #555;
           }
   
           .notification-box table {
               width: 100%;
               line-height: inherit;
               text-align: left;
           }
   
           .notification-box table td {
               padding: 5px;
               vertical-align: top;
           }
   
           .notification-box table tr td:nth-child(2) {
               text-align: right;
           }
   
           .notification-box table tr.top table td {
               padding-bottom: 14px;
           }
   
           .notification-box table tr.top table td.title {
               font-size: 20px;
               line-height: 28px;
               color: #5D637A;
           }
   
           .notification-box table tr.information table td {
               padding-bottom: 20px;
           }
   
           .notification-box table tr.heading td {
               background: #E6E4D7e0;
               border-bottom: 1px solid #ddd;
               font-weight: bold;
           }
   
           .notification-box table tr.details td {
               padding-bottom: 20px;
           }
   
           .notification-box table tr.item td {
               border-bottom: 1px solid #5BB161;
           }
   
           .notification-box table tr.item.last td {
               border-bottom: none;
           }
   
           @media only screen and (max-width: 600px) {
               .notification-box table tr.top table td {
                   width: 100%;
                   display: block;
                   text-align: center;
               }
   
               .notification-box table tr.information table td {
                   width: 100%;
                   display: block;
                   text-align: center;
               }
           }
       </style>
   </head>
   <body>
       <div class="notification-box">
           <table cellpadding="0" cellspacing="0">
               <tr class="top">
                   <td colspan="2">
                       <table>
                           <tr>
                               <td class="title">
                                   <img
                                       src="https://i.ibb.co/hdYVNk6/miimagen2.png"
                                       style="width: 100%; max-width: 300px"
                                   />
                               </td>
                               <td class="heading">
                                   HITOS<br />
                                   Emitida: {{f_hito}}<br />
                               </td>
                           </tr>
                       </table>
                   </td>
               </tr>
               <tr class="information">
                   <td colspan="2">
                       <table>
                           <tr>
                               <td>
                                   Botanical<br />
                                   Gato Sobral y Gaspar de Carvajal<br />
                                   Quito, Ecuador
                               </td>
                               <td>
                                   Usuario<br />
                                   {{usuario}}<br />
                                   {{correo}}<br />
                   
                               </td>
                           </tr>
                       </table>
                   </td>
                   
                   
               </tr>
               <tr><td><h4>Información de su planta: {{apodo_p}}</h4></td></tr>
               <tr class="heading">
                   <td>Hito(s)</td>
                   <td>Detalle</td>
               </tr>
               <tr class="details">
                   <td>{{desc_corta}}</td>
                   <td>{{desc_larga}}</td>
               </tr>
           </table>
       </div>
   </body>
   </html>
   
`
    const newHito = this.hitoRepository.create(hito);
    const hitoNew =  this.hitoRepository.save(newHito)
   const compiledTemplate = handlebars.compile(htmlPlan);
    
    const context = {
        usuario: user.nombre + ' ' + user.apellido,  
        correo: user.email,
      apodo_p: pplantFound.apodo,
      f_hito: hito.f_hito,
      desc_corta: hito.des_corta,
      desc_larga: hito.descripcion,
   
    
    };

    htmlPlan = compiledTemplate(context);
    await this.mailService.sendMail({
      to: user.email,
      from: 'BOTANICAL botanicalmovil@gmail.com',
      subject: 'Tenemos noticias de: ' + pplantFound.apodo,
      html: htmlPlan,
    });
    
       
      user.token_not &&  await this.notiService.sendNotification("Hito nuevo de: "+ pplantFound.apodo+" !!!", hito.des_corta, user.token_not);
        
   
   
    return hitoNew;
  }
  geteHitosByPplant(id: number) {
    return this.hitoRepository.find({
      where: { pplants: { id: id } }/* ,
      relations: ['pplants'] */,
    });
  }
  getPlantsByManager(id: number) {
    return this.pplantsService.getePplnatAgri(id);
  }
  /* getDetallePlantaconHitos(id: number) {
    return this.pplantsService.getePplantwithHitos(id);
  } */
}
