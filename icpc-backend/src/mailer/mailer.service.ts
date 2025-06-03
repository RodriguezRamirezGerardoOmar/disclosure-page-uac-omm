import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';

/*
Input:
  - sendMail: admins (boolean), cause ('report' | 'create' | 'update' | 'delete'), title (string), itemType ('noticia' | 'ejercicio' | 'apunte' | 'reporte')
Output: Sends email notifications to users
Return value: Promise<void>
Function: Handles the logic for sending email notifications to users or admins based on the action performed (report, create, update, delete) and the item type
Variables: mailerService, usersService
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Injectable()
export class MailerService {
  constructor(
    private readonly mailerService: NestMailerService,
    private readonly usersService: UsersService
  ) {}

  async sendMail(
    admins: boolean,
    cause: 'report' | 'create' | 'update' | 'delete',
    title: string,
    itemType: 'noticia' | 'ejercicio' | 'apunte' | 'reporte'
  ) {
    const addresses = await this.usersService.getMails(admins);
    switch (cause) {
      case 'report':
        try {
          for (const address of addresses) {
            await this.mailerService.sendMail({
              to: address,
              from: '"Sistema de divulgación para competencias académicas" <sistema.divulgacion.omm.uacam@gmail.com>',
              subject: 'Notificación',
              text: `Un alumno ha enviado un reporte de nombre "${title}".`,
              html: `<p>Un alumno ha enviado un reporte de nombre "${title}".</p>`
            });
          }
          console.log('Email sent successfully');
        } catch (error) {
          console.log(error);
        }
        break;
      case 'create':
        try {
          for (const address of addresses) {
            await this.mailerService.sendMail({
              to: address,
              from: '"Sistema de divulgación para competencias académicas" <sistema.divulgacion.omm.uacam@gmail.com>',
              subject: 'Notificación',
              text: `Un entrenador ha creado  ${
                itemType === 'noticia'
                  ? 'una nueva noticia'
                  : 'un nuevo ' + itemType
              } de nombre "${title}".`,
              html: `<p>Un entrenador ha creado  ${
                itemType === 'noticia'
                  ? 'una nueva noticia'
                  : 'un nuevo ' + itemType
              } de nombre "${title}".</p>`
            });
          }
          console.log('Email sent successfully');
        } catch (error) {
          console.log(error);
        }
        break;
      case 'update':
        try {
          for (const address of addresses) {
            await this.mailerService.sendMail({
              to: address,
              from: '"Sistema de divulgación para competencias académicas" <sistema.divulgacion.omm.uacam@gmail.com>',
              subject: 'Notificación',
              text: `Un entrenador ha modificado  ${
                itemType === 'noticia' ? 'una noticia' : 'un ' + itemType
              } de nombre "${title}".`,
              html: `<p>Un entrenador ha modificado  ${
                itemType === 'noticia' ? 'una noticia' : 'un ' + itemType
              } de nombre "${title}".</p>`
            });
          }
          console.log('Email sent successfully');
        } catch (error) {
          console.log(error);
        }
        break;
      case 'delete':
        try {
          for (const address of addresses) {
            await this.mailerService.sendMail({
              to: address,
              from: '"Sistema de divulgación para competencias académicas" <sistema.divulgacion.omm.uacam@gmail.com>',
              subject: 'Notificación',
              text: `Un entrenador ha eliminado  ${
                itemType === 'noticia' ? 'una noticia' : 'un ' + itemType
              } de nombre "${title}".`,
              html: `<p>Un entrenador ha eliminado  ${
                itemType === 'noticia' ? 'una noticia' : 'un ' + itemType
              } de nombre "${title}".</p>`
            });
          }
          console.log('Email sent successfully');
        } catch (error) {
          console.log(error);
        }
        break;
    }
  }
}
