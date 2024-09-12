export interface IRegisterStepsReducer {
  currentStep: number;
  userCreated: boolean;
  isFinish: boolean;
  error: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
  profile_pic: File;
}
