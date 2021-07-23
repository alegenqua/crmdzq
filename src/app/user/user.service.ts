import { User } from '@entity/user';
import Mailgun from 'mailgun-js';
import { SignUpDTO } from './user.dto';
import { v4 as uuidv4 } from 'uuid';


export const getAllUser = async () => {
  try {
    return await User.find();
  } catch (e) {
    console.error(e);
  }
}

export const singUpUser = async (body:SignUpDTO) => {
  const _newUser = new User();
  _newUser.activated = false;
  _newUser.email = body.email;
  _newUser.name = body.name;
  _newUser.surname = body.surname;
  _newUser.refreshToken = uuidv4();
  
  const mailgun = new Mailgun({apiKey: process.env.MAILGUN_API_KEY!, 
    domain:"sandbox9115bd93ad154fbc87f655ec4eaad651.mailgun.org"});

  const data = {
      from: "admin@crmdzq.it",
      to: body.email,
      subject: "Registrazione CRMDZQ",
      text:`Benvenuto in CRMDZQ, il tuo token è ${_newUser.refreshToken}`
  }
  
  await mailgun.messages().send(data);
  _newUser.save();
}
