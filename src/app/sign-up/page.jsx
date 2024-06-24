'use client'

import { Formik, ErrorMessage, Form } from "formik"
import { SIGN_UP_FORM_INITIAL_VALUES } from "../../utils/constants";
import { SIGN_UP_SCHEMA } from "@/utils/schemas";
import Link from "next/link"
import TextField from '@mui/material/TextField';
import NonAuthPageNavbar from "../components/NonAuthPageNavbar/NonAuthPageNavbar";

//implement a way to store data locally, could be redux or something else, check possible libraries
//make the log user function happen when sending valid credentials
//update the local user.authenticated to true and user.role
//then app should only allow user to stay on authenticated pages until user signs out. 
//implement a way to store data locally, could be redux or something else, check possible libraries
//make the log user function happen when sending valid credentials
//update the local user.authenticated to true and user.role
//then app should only allow user to stay on authenticated pages until user signs out. 
function SignUp () {




  return (
    <>
      <NonAuthPageNavbar />
      <div className="relative top-0 z-20 login-page w-full h-[78%] lg:h-[70%] flex items-center lg:text-lg">
        <Formik
          initialValues={SIGN_UP_FORM_INITIAL_VALUES}
          validationSchema={SIGN_UP_SCHEMA}
          onSubmit={(values, {setSubmitting}) => {
            console.log({values})
            setSubmitting(false)
          }}
        >
          {({
            values,
            setValues,
            isSubmitting,
          }) => (

            <Form
              className="relative top-[10%] lg:top-[5%] bg-white flex flex-col items-center justify-evenly text-thirdColor mx-auto py-8 px-8 min-h-[350px] w-[85%] max-w-[350px] lg:max-w-[400px] shadow-2xl shadow-shadowColor border border-secondaryBgColor rounded-2xl"
            >
              <h2 className="mb-6 text-3xl text-thirdColor">Sign up</h2>

              <div className="my-1 w-full">
                <TextField className="w-full" name="name" type="name" label="name" variant="standard"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setValues({...values, name: newValue})
                  }}
                />
                <ErrorMessage name="name" component="div" className="mt-1 text-warningColor"/>
              </div>

              <div className="my-1 w-full">
                <TextField className="w-full" name="email" type="email" label="email" variant="standard"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setValues({...values, email: newValue})
                  }}
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-warningColor"/>
              </div>

              <div className="my-1 w-full">
                <TextField className="w-full" name="password" type="password" label="password" variant="standard"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setValues({...values, password: newValue})
                  }}
                />
                <ErrorMessage name="password" component="div" className="mt-1 text-warningColor"/>
              </div>
              
              <div className="my-1 w-full">
                <TextField className="w-full" name="repeat_password" type="repeat_password" label="Repeat password" variant="standard"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setValues({...values, repeat_password: newValue})
                  }}
                />
                <ErrorMessage name="repeat_password" component="div" className="mt-1 text-warningColor"/>
              </div>
              <div className="w-full justify-start pl-1 mt-4 mb-1">
                <Link href={"/login"}>
                  <p className="">
                  ¿Ya tienes una cuenta?
                    <strong className=" text-secondaryBgColor underline"> Ingresar con mi cuenta</strong>
                  </p>
                </Link>
              </div>

              <button
                type="submit"
                className="w-24 p-2 mt-2 bg-secondaryBgColor rounded-lg text-thirdColor font-bold text-lg
                  hover:bg-thirdColor hover:text-secondaryBgColor transition-all"
                disabled={isSubmitting}
              >
                Sign up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default SignUp;