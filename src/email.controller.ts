import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { join } from 'path';

@Controller('email')
export class EmailController {
  constructor(private mailService: MailerService) {}

  @Get('plain-text-email')
  async plainTextEmail(@Query('toemail') toEmail) {
    var response = await this.mailService.sendMail({
      to:toEmail,
      from:"CONFIGURE AQUI",
      subject: 'Plain Text Email ✔',
      text: 'Welcome NestJS Email Sending Tutorial', 
    });
    return response;
  }

  @Post('html-email')
  async postHTMLEmail(@Body() superHero: any) {
    var response = await this.mailService.sendMail({
      to: 'CONFIGURE O ENVIO AQUI',
      from: 'CONFIGURE A ORIGEM AQUI',
      subject: 'HTML Dynamic Template',
      template: 'superhero',
      context: {
        superHero:superHero
      },
      
    });
    return 'success';
  }

  @Get('file-attachment')
  async fileAttachement(@Query('toemail') toemail){
    var response = await this.mailService.sendMail({
      to: toemail,
      from: 'CONFIGURE A ORIGEM AQUI',
      subject: 'File Attachment',
      html: "<h1>File Attachment</h1>",
      attachments:[{
        path:    join(__dirname,'mails','bike-1.webp'),
        filename:'1.webp',
        contentDisposition:"attachment"
      }]
    });
    return 'success';
  }
}
