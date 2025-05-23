import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendMail(
    address: string,
    cause: 'report' | 'create' | 'update' | 'delete',
    title: string,
    itemType: 'noticia' | 'ejercicio' | 'apunte' | 'reporte'
  ) {
    switch (cause) {
      case 'report':
        try {
          await this.mailerService.sendMail({
            to: address,
            from: '"Sistema de divulgación para competencias académicas" <helplessnerd.1d0lat0r@gmail.com>',
            subject: 'Notificación',
            text: `Un alumno ha enviado un reporte de nombre "${title}".`,
            html: `<p>Un alumno ha enviado un reporte de nombre "${title}".</p>`
          });
          console.log('Email sent successfully');
        } catch (error) {
          console.log(error);
        }
        break;
      case 'create':
        try {
          await this.mailerService.sendMail({
            to: address,
            from: '"Sistema de divulgación para competencias académicas" <helplessnerd.1d0lat0r@gmail.com>',
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
          console.log('Email sent successfully');
        } catch (error) {
          console.log(error);
        }
        break;
      case 'update':
        try {
          await this.mailerService.sendMail({
            to: address,
            from: '"Sistema de divulgación para competencias académicas" <helplessnerd.1d0lat0r@gmail.com>',
            subject: 'Notificación',
            text: `Un entrenador ha modificado  ${
              itemType === 'noticia' ? 'una noticia' : 'un ' + itemType
            } de nombre "${title}".`,
            html: `<p>Un entrenador ha modificado  ${
              itemType === 'noticia' ? 'una noticia' : 'un ' + itemType
            } de nombre "${title}".</p>`
          });
          console.log('Email sent successfully');
        } catch (error) {
          console.log(error);
        }
        break;
      case 'delete':
        try {
          await this.mailerService.sendMail({
            to: address,
            from: '"Sistema de divulgación para competencias académicas" <helplessnerd.1d0lat0r@gmail.com>',
            subject: 'Notificación',
            text: `Un entrenador ha eliminado  ${
              itemType === 'noticia' ? 'una noticia' : 'un ' + itemType
            } de nombre "${title}".`,
            html: `<p>Un entrenador ha eliminado  ${
              itemType === 'noticia' ? 'una noticia' : 'un ' + itemType
            } de nombre "${title}".</p>`
          });
          console.log('Email sent successfully');
        } catch (error) {
          console.log(error);
        }
        break;
    }
  }
}
