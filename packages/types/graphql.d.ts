/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: health
// ====================================================

export interface health_health {
  __typename: "Health";
  ok: number;
}

export interface health {
  health: health_health;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signUp
// ====================================================

export interface signUp_signUp {
  __typename: "User";
  id: string;
  emailAddress: string;
  jwt: string | null;
}

export interface signUp {
  signUp: signUp_signUp;
}

export interface signUpVariables {
  input: UserAuthInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface UserAuthInput {
  emailAddress: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
