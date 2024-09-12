export interface RegisterForm {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
  profile_pic: File;
}

export interface IRegisterStepsReducer extends RegisterForm {
  currentStep: number;
  userCreated: boolean;
  isFinish: boolean;
  error: string;
}
