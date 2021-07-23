import Mailgun from 'mailgun-js';
import { Body, Controller, Get, Post, Route, Tags } from 'tsoa';
import { SignUpDTO } from './user.dto';
import { singUpUser, getAllUser } from './user.service';

@Tags('User Permission')
@Route('/api/users')
export class UserPermissionController extends Controller {


  @Post('/signUp/')
  public async signUp(@Body() body: SignUpDTO){
    singUpUser(body)
  }

  @Get('/get-all/')
  public async getAllUser() {
    return getAllUser()
  }
}

