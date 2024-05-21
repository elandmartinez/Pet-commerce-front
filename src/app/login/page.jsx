'use client'

import { Formik, Form, ErrorMessage } from "formik"
import { loginFormInitialValues } from "../../utils/constants";
import { loginSchema } from "@/utils/schemas";
import Link from "next/link"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Login () {
  return (
    <div className="relative top-0 z-20 login-page h-[78%] lg:h-[70%] w-full flex items-start lg: pt-28 lg:text-lg">
      <Formik
        initialValues={loginFormInitialValues}
        validationSchema={loginSchema}
        onSubmit={(values, {setSubmitting}) => {
          console.log({values})
          setSubmitting(false)
        }}
      >
        {({
          isSubmitting,
          setValues,
          values
        }) => (
          <Form
            className="relative bg-white flex flex-col items-center justify-evenly text-thirdColor mx-auto py-4 px-8 min-h-[400px] lg:min-h-[450px] w-[85%] max-w-[350px] lg:max-w-[380px] shadow-2xl border border-secondaryBgColor shadow-shadowColor rounded-2xl"
          >
            <h2 className="mb-6 text-3xl text-thirdColor">Login</h2>
            <div className="my-1 w-full">
              <TextField
                className="w-full"
                name="email" type="email" label="email" variant="standard"
                onChange={(e) => {
                  const newValue = e.target.value;
                  setValues({...values, email: newValue})
                }}
              />
              <ErrorMessage className="mt-1 text-warningColor" name="email" component="div" />
            </div>
            <div className="my-1 w-full">
              <TextField
                className="w-full"
                id="password"
                name="password" type="password" label="password" variant="standard"
                onChange={(e) => {
                  const newValue = e.target.value;
                  setValues({...values, password: newValue})
                }}
                value={values.password}
              />
              <ErrorMessage className="mt-1 text-warningColor" name="password" component="div" />
            </div>
            <div className="w-full justify-start pl-1 mt-4 mb-1">
              <Link href={"/sign-up"}>
                <p>
                ¿No tienes una cuenta?
                  <strong className=" text-secondaryBgColor underline"> Crear cuenta</strong>
                </p>
              </Link>
            </div>

            <button
              variant="contained"
              type="submit"
              className="w-24 p-2 mt-2 bg-secondaryBgColor rounded-lg text-thirdColor font-bold text-lg
              hover:bg-thirdColor hover:text-secondaryBgColor transition-all"
              disabled={isSubmitting}
            >
              Log in
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login;