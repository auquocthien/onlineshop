import Api from './Api';

export const logInUser = async (emailAndPassword) => {
  try {
    const res = await (await Api().post('/account/token/', emailAndPassword)).data;
    Api(res.access);
    // var user = await getUserInfor(JSON.parse(Buffer.from(res.access.split('.')[1], 'base64').toString()).user_id)
    var user = await getUserInfor(res.access)
    console.log(user)
    const data = {
      user: user,
      token: res.access,
    };
    return data;
  } catch (error) {
    console.log(error)
    return {
      status: "fail",
      error: "Incorrect email and password ",
    };
  }
};

export const signUpUser = async (credentials) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const res = await (await Api().post('/account/register/', credentials)).data;

    const user = await logInUser({
      "email": credentials.email,
      "password": credentials.password
    })
    Api(user.access);
    const data = {
      user: user.user,
      token: user.token,
    };
    return data;
  } catch (error) {
    return {
      status: "fail",
      error: "fail",
    };
  }
};


export const getUserInfor = async (token) => {
  return {
    "name": await JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).name,
    "email": await JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).email
  }
}