export interface RegisterForm {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
  profilePic?: File;
}

export interface ICreationUserStatus {
  currentStep: number;
  userCreated: boolean;
  error: string;
}

export interface IRegisterStepsReducer
  extends RegisterForm,
    ICreationUserStatus {}

export interface LoadingIndicatorProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}
