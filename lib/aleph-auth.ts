import {
  AuthApi,
  Configuration,
  type AuthResponseDto,
  type LoginEmailDto,
  type LoginGoogleDto,
  type SignupEmailDto,
  type SignupGoogleDto,
  SignupEmailDtoRoleEnum,
  SignupGoogleDtoRoleEnum,
} from "@/generated/aleph-be";

export type UserRole = "retailer" | "supplier";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_ALEPH_API_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost";

function getAuthApi(accessToken?: string) {
  return new AuthApi(
    new Configuration({
      basePath: API_BASE_URL,
      accessToken,
    }),
  );
}

function toSignupRole(role: UserRole) {
  return role === "supplier"
    ? SignupEmailDtoRoleEnum.Supplier
    : SignupEmailDtoRoleEnum.Retailer;
}

function toSignupGoogleRole(role: UserRole) {
  return role === "supplier"
    ? SignupGoogleDtoRoleEnum.Supplier
    : SignupGoogleDtoRoleEnum.Retailer;
}

export async function signupWithEmail(input: {
  email: string;
  fullName: string;
  password: string;
  role: UserRole;
}): Promise<AuthResponseDto> {
  const payload: SignupEmailDto = {
    email: input.email,
    fullName: input.fullName,
    password: input.password,
    role: toSignupRole(input.role),
  };

  const api = getAuthApi();
  const { data } = await api.authControllerSignupEmail(payload);
  return data;
}

export async function loginWithEmail(input: {
  email: string;
  password: string;
}): Promise<AuthResponseDto> {
  const payload: LoginEmailDto = {
    email: input.email,
    password: input.password,
  };

  const api = getAuthApi();
  const { data } = await api.authControllerLoginEmail(payload);
  return data;
}

export async function signupWithGoogle(input: {
  idToken: string;
  role: UserRole;
}): Promise<AuthResponseDto> {
  const payload: SignupGoogleDto = {
    idToken: input.idToken,
    role: toSignupGoogleRole(input.role),
  };

  const api = getAuthApi();
  const { data } = await api.authControllerSignupGoogle(payload);
  return data;
}

export async function loginWithGoogle(
  idToken: string,
): Promise<AuthResponseDto> {
  const payload: LoginGoogleDto = { idToken };

  const api = getAuthApi();
  const { data } = await api.authControllerLoginGoogle(payload);
  return data;
}

export async function getCurrentUser(accessToken: string) {
  const api = getAuthApi(accessToken);
  const { data } = await api.authControllerMe();
  return data;
}
