export type ValidatorType = {
  fieldName: string;
  validationFunction: () => boolean;
};

export type SignUpValidators = {
  fullName: ValidatorType;
  loginEmail: ValidatorType;
  zipCode: ValidatorType;
  phone: ValidatorType;
  loginPassword: ValidatorType;
  confirmPassword: ValidatorType;
  dateOfBirth: ValidatorType;
};

export type SignInValidators = {
  loginEmail: ValidatorType;
  loginPassword: ValidatorType;
};

export type RoomValidators = {
  roomName: ValidatorType;
  roomPrice: ValidatorType;
  roomSize: ValidatorType;
  roomDescription: ValidatorType;
  roomImage: ValidatorType;
};
