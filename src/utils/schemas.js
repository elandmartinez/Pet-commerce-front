import * as yup from "yup"

export const LOGIN_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("this field is required"),
  password: yup
    .string()
    .required("this field is required")
});

export const SIGN_UP_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .min(4, "Name must have at least 4 characters")
    .required("This field is required"),
  email: yup
    .string()
    .required("this field is required"),
  phoneNumber: yup
    .number("must be a number")
    .min(1000000000, "Phone number must have 10 digits")
    .max(9999999999,  "Phone number must have 10 digits")
    .required("This field is required"),
  nationalCode: yup
    .number("must be a number")
    .min(1, "Country code must have minimun 1")
    .max(200,  "Phone number must have maximum 200")
    .required("This field is required"),
  password: yup
    .string()
    .min(7, "password must have at least 7 characters")
    .required("this field is required"),
  repeat_password: yup
    .string()
    .min(7, "password must have at least 7 characters")
    .required("this field is required")
})

export const paymentFormSchema = yup.object().shape({
  addressStreet: yup.string().min(6, "minimum 6 characters at least").max(50, "can't have more than 50 characters").required(),
  addressCity: yup.string().min(4, "minimum 4 characters at least").max(50, "can't have more than 50 characters").required(),
  addressRegion: yup.string().min(6, "minimum 6 characters at least").max(50, "can't have more than 50 characters").required(),
  addressCountry: yup.string().max(50, "can't have more than 50 characters").required(),

  paymentCardNumber: yup.string().min(19, "can't have less than 16 numbers").max(19, "can't have more than 16 numbers").required(),
  paymentCardOwnerName: yup.string().max(50, "can't have more than 50 characters").required(),
  paymentCardCVV: yup.number().min(1).max(999).required(),
  paymentCardExpirationDate: yup.string().max(5, "can't have more than 5 characters").required(),
})
