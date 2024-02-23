import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bills } from 'src/database/entities/bills.entity';
import { Repository } from 'typeorm';
import { CreateBillsDto } from './dto/createbillsdto.dto';
import { Users } from 'src/database/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { InvernaderosService } from 'src/invernaderos/invernaderos.service';
import { Pplants } from 'src/database/entities/ppants.entity';
import { MailerService } from '@nestjs-modules/mailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import { PlantasService } from 'src/plantas/plantas.service';
@Injectable()
export class PagosService {
  
  constructor(
    @InjectRepository(Bills) private billsRepository: Repository<Bills>,
    private userRepository: UsersService,
    private pplantRepository: InvernaderosService,
    private readonly mailService: MailerService,
    private readonly plantService: PlantasService,
  ) {}
  
  async createBill(bill: CreateBillsDto) {
    
    bill.total = bill.precio - bill.descuento;
    bill.plansId = (
      await this.userRepository.geteUserById(bill.usersId)
    ).plansId;
    const newPplnat = new Pplants();
    newPplnat.apodo = bill.apodo;
    newPplnat.usersId = bill.usersId;
    newPplnat.plantsId = bill.plantsId;
    newPplnat.zonesId = bill.zonesId;

    newPplnat.managersId = Math.floor(Math.random() * 3) + 1;

    console.log(newPplnat);
    console.log(bill);

    await this.pplantRepository.createPlantar(newPplnat);

    const newbill = this.billsRepository.create(bill);

    const result = await this.billsRepository.save(newbill);
    const plantFound = await this.plantService.geteplantId(bill.plantsId);

    const user = await this.userRepository.geteUserById(bill.usersId);
      console.log(user.email);
      var html = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Factura</title>
          <style>
              body {
                  font-family: 'JakartaSans', 'Arial', sans-serif;
                  background-color: #f6f9fc;
                  margin: 0;
                  padding: 20px;
                  box-sizing: border-box;
              }
      
              .invoice-box {
                  max-width: 100%;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #5D637A;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                  font-size: 16px;
                  line-height: 24px;
                  color: #555;
              }
      
              .invoice-box table {
                  width: 100%;
                  line-height: inherit;
                  text-align: left;
              }
      
              .invoice-box table td {
                  padding: 5px;
                  vertical-align: top;
              }
      
              .invoice-box table tr td:nth-child(2) {
                  text-align: right;
              }
      
              .invoice-box table tr.top table td {
                  padding-bottom: 20px;
              }
      
              .invoice-box table tr.top table td.title {
                  font-size: 24px;
                  line-height: 28px;
                  color: #5D637A;
              }
      
              .invoice-box table tr.information table td {
                  padding-bottom: 20px;
              }
      
              .invoice-box table tr.heading td {
                  background: #E6E4D7e0;
                  border-bottom: 1px solid #ddd;
                  font-weight: bold;
              }
      
              .invoice-box table tr.details td {
                  padding-bottom: 20px;
              }
      
              .invoice-box table tr.item td {
                  border-bottom: 1px solid #5BB161;
              }
      
              .invoice-box table tr.item.last td {
                  border-bottom: none;
              }
      
              @media only screen and (max-width: 600px) {
                  .invoice-box table tr.top table td {
                      width: 100%;
                      display: block;
                      text-align: center;
                  }
      
                  .invoice-box table tr.information table td {
                      width: 100%;
                      display: block;
                      text-align: center;
                  }
              }
          </style>
      </head>
      <body>
          <div class="invoice-box">
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
      
                      <td>
                        Factura #: {{num_factura}}<br />
                        Creada: {{f_factura}}<br />
                        
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
                        Gaato Sobral y Gaspar de Carvajal<br />
                        Quito, Ecuador
                      </td>
      
                      <td>
                        {{usuario}}<br />
                        {{correo}}<br />
                        
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
      
              <tr class="heading">
                <td>Detalles</td>
      
                <td></td>
              </tr>
      
              <tr class="details">
                <td>{{tipo_pedido}}</td>
      
                <td></td>
              </tr>
      
              <tr class="heading">
                <td>Item</td>
      
                <td>Precio</td>
              </tr>
      
              <tr class="item">
                <td>{{nombre_planta}}</td>
      
                <td>$ {{precio}}</td>
              </tr>
      
               <tr class="item">
                <td>Descuento</td>
      
                <td>$ {{descuento}}</td>
              </tr> 
      
              
      
              <tr class="total">
                <td></td>
      
                <td>Total: $ {{total}}</td>
              </tr>
              </table>
          </div>
      </body>
      </html>
      
      `
     
        const compiledTemplate = handlebars.compile(html);
       
        const context = {
          usuario: user.nombre + ' ' + user.apellido,
          correo: user.email,
          num_factura: result.id,
          f_factura: result.f_compra,
          tipo_pedido: "Usted ha comprado una planta!",
          nombre_planta: newPplnat.apodo + ' | ' + plantFound[0].nombre_c,
          precio: bill.precio,
          total: result.total,
          descuento: bill.descuento,
          /* message: '¡Este es un mensaje de ejemplo!' */
        };
        html = compiledTemplate(context);
      
    await this.mailService.sendMail({
      to: user.email,
      from: 'BOTANICAL botanicalmovil@gmail.com',
      subject: 'Info de tu compra',
      html: html,
    });
    
    return result;
  }

  async buildPlan(bill: CreateBillsDto) {
    var htmlPlan=`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Factura</title>
        <style>
            body {
                font-family: 'JakartaSans', 'Arial', sans-serif;
                background-color: #f6f9fc;
                margin: 0;
                padding: 20px;
                box-sizing: border-box;
            }
    
            .invoice-box {
                max-width: 100%;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #5D637A;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                font-size: 16px;
                line-height: 24px;
                color: #555;
            }
    
            .invoice-box table {
                width: 100%;
                line-height: inherit;
                text-align: left;
            }
    
            .invoice-box table td {
                padding: 5px;
                vertical-align: top;
            }
    
            .invoice-box table tr td:nth-child(2) {
                text-align: right;
            }
    
            .invoice-box table tr.top table td {
                padding-bottom: 20px;
            }
    
            .invoice-box table tr.top table td.title {
                font-size: 24px;
                line-height: 28px;
                color: #5D637A;
            }
    
            .invoice-box table tr.information table td {
                padding-bottom: 20px;
            }
    
            .invoice-box table tr.heading td {
                background: #E6E4D7e0;
                border-bottom: 1px solid #ddd;
                font-weight: bold;
            }
    
            .invoice-box table tr.details td {
                padding-bottom: 20px;
            }
    
            .invoice-box table tr.item td {
                border-bottom: 1px solid #5BB161;
            }
    
            .invoice-box table tr.item.last td {
                border-bottom: none;
            }
    
            @media only screen and (max-width: 600px) {
                .invoice-box table tr.top table td {
                    width: 100%;
                    display: block;
                    text-align: center;
                }
    
                .invoice-box table tr.information table td {
                    width: 100%;
                    display: block;
                    text-align: center;
                }
            }
        </style>
    </head>
    <body>
        <div class="invoice-box">
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
    
                    <td>
                      Factura #: {{num_factura}}<br />
                      Creada: {{f_factura}}<br />
                      
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
                      Gaato Sobral y Gaspar de Carvajal<br />
                      Quito, Ecuador
                    </td>
    
                    <td>
                      {{usuario}}<br />
                      {{correo}}<br />
                      
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
    
            <tr class="heading">
              <td>Detalles</td>
    
              <td></td>
            </tr>
    
            <tr class="details">
              <td>{{tipo_pedido}}</td>
    
              <td></td>
            </tr>
    
            <tr class="heading">
              <td>Item</td>
    
              <td>Precio</td>
            </tr>
    
            <tr class="item">
              <td>{{nombre_planta}}</td>
    
              <td>$ {{precio}}</td>
            </tr>
    
            <!-- <tr class="item">
              <td>Iva</td>
    
              <td>$0.36</td>
            </tr> -->
    
            
    
            <tr class="total">
              <td></td>
    
              <td>Total: $ {{total}}</td>
            </tr>
            </table>
        </div>
    </body>
    </html>
    `
    
    bill.total = bill.precio;
    /* const userFound =  await this.userRepository.geteUserById(bill.usersId) */
    const a = this.userRepository.updatePlanUser(bill.usersId, bill.plansId);
    const newbill = this.billsRepository.create(bill);
    const result =  await this.billsRepository.save(newbill);

    const user = await this.userRepository.geteUserById(bill.usersId);
    const compiledTemplate = handlebars.compile(htmlPlan);
    var pla ="Plan Basico | Semilla"
    
   
    
    if(bill.plansId == 2){
     pla = "Plan Estandar | Jardin"
    }
    if(bill.plansId == 3){
     pla = "Plan Premium | Botanical"
   }
   
    const context = {
      usuario: user.nombre + ' ' + user.apellido,
      correo: user.email,
      num_factura: result.id,
      f_factura: result.f_compra,
      tipo_pedido: "Usted ha comprado un Plan!",
      nombre_planta: pla,
      precio: bill.precio,
      total: result.total,
      descuento: bill.descuento,
    
    };
  

    htmlPlan = compiledTemplate(context);
    await this.mailService.sendMail({
      to: user.email,
      from: 'BOTANICAL botanicalmovil@gmail.com',
      subject: 'Info de tu compra',
      html: htmlPlan,
    });

    return result;
  }
  getBills(id: number) {
    return this.billsRepository.find({ where: { usersId: id }, relations: ['plants'] });
  }
}