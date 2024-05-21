import * as yup from "yup"

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("this field is required"),
  password: yup.string().required("this field is required")
});

export const signUpSchema = yup.object().shape({
  name: yup.string().min(4, "name must have at least 4 characters").required("this field is required"),
  email: yup.string().email({tlds: {allow: false}}).required("this field is required"),
  password: yup.string().min(7, "password must have at least 7 characters").required("this field is required"),
  repeat_password: yup.string().min(7, "password must have at least 7 characters").required("this field is required")
});
