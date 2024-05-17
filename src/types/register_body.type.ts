interface IRegisterBody {
  name: string;
  email: string;
  password: string;
  role: string;
  photo?: string;
  gender?: string;
}

export default IRegisterBody;