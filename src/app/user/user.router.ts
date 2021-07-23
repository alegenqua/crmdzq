import Mailgun from 'mailgun-js';
import { Body, Controller, Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa';
import { getAllUser, createUser, updateUser, deleteUser } from './user.service';

@Tags('User Permission')
@Route('/api/users')
export class UserPermissionController extends Controller {


  @Post('/signUp/')
  public async signUp(@Body() body: {email: string, password:string, username: string}){
    
    const mailgun = new Mailgun({apiKey: process.env.MAILGUN_API_KEY!, 
      domain:"sandbox9115bd93ad154fbc87f655ec4eaad651.mailgun.org"});

    const data = {
        from: "admin@crmdzq.it",
        to: body.email,
        subject: "Registrazione CRMDZQ",
        text:"Benvenuto in CRMDZQ, il tuo token è TODO"
    }
    const result = await mailgun.messages().send(data);

    return result
  }



  @Get('/get-all/')
  public async getAllUser() {
    return getAllUser()
  }

  @Post('/create/')
  public async createUser(@Body() body: { email: string, roles: string[] }) {
    return createUser({ email: body.email });
  }

  @Put('/update/{id}/')
  public async updateUser(@Query('id') id: string, @Body() body: { email: string, roles: string[] }) {
    return updateUser({ id: Number(id), email: body.email});
  }

  @Delete('/delete/{id}/')
  public async deleteUser(@Query('id') id: string) {
    return deleteUser({ id: Number(id) });
  }



}

