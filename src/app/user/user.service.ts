import { User } from '@entity/user';

export const getAllUser = async () => {
  try {
    return await User.find();
  } catch (e) {
    console.error(e);
  }
}

export const createUser = async ({ email }: { email: string}) => {
  try {
    const _newUser = new User();
    _newUser['email'] = email;
    
    await _newUser.save();

    return await User.findOne({
      where: { email: email }
    });

  } catch (e) {
    console.error(e);
  }
}

export const updateUser = async ({ id, email }: { id: number, email: string }) => {
  try {
    const _updatedUser = await User.findOne({ where: { id }});
    if (!_updatedUser) return { message: "User is not found!" };
    _updatedUser['email'] = email;
    
    await _updatedUser.save();

    return await User.findOne({
      where: { email: email }      
    });

  } catch (e) {
    console.error(e);
  }
}

export const deleteUser = async ({ id }: { id: number }) => {
  try {
    const foundUser = await User.findOne({ id: id });
    return await foundUser?.remove();
  } catch (e) {
    console.error(e);
  }
}