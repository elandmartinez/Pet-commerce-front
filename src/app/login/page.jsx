'use client'

import { Formik, Form, ErrorMessage } from "formik"
import { LOGIN_SCHEMA } from "@/utils/schemas";
import { LOGIN_FORM_INITAL_VALUES, ROUTES } from "../../utils/constants";
import Link from "next/link"
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import { updateUser } from "../../lib/store/slices/userSlice";
import { useRouter } from "next/navigation";
import NonAuthPageNavbar from "../components/NonAuthPageNavbar/NonAuthPageNavbar";
import { authUser } from "@/lib/services";
import { ToastContainer, toast } from "react-toastify";
import AuthPageManager from "../middlewareComponents/AuthPageManager";

function Login () {
  const router = useRouter()
  const dispatch = useDispatch()

  const logUser = async (credentials) => {
    try {
      const res = await authUser(credentials)

      return res

    } catch (error) {
      toast.error("Couldn't find a user with those credentials :(")
      throw new Error("Returned error when trying to authenticate user")
    }
  }

  return (
    <AuthPageManager>
      <ToastContainer />
      <div className="w-full h-full pb-10 overflow-y-scroll">
        <NonAuthPageNavbar /> 
        <div className="relative z-20 mt-20 lg:mt-20 login-page w-full flex items-start lg:text-lg">

          {/* formik form cont where whe handle several aspects of the form like validation of the fields
          initial values, y the onSubmit function */}
          <Formik
            initialValues={LOGIN_FORM_INITAL_VALUES}
            validationSchema={LOGIN_SCHEMA}
            onSubmit={async (values, {setSubmitting}) => {
              setSubmitting(false)
              debugger
              //for java backend app is username and password
              //for node.js backend app is email and password
              const credentials = {username: values.email, password: values.password}
              const data = await logUser(credentials)
              //java server app depuratedUserData
              const depuratedUserData = {
                token: data.token,
                role: data.userData.role,
                ...data.userData.client
              }

              //node.js server app depuratedData
              /* const depuratedUserData = {...data.body} */

              dispatch(updateUser(depuratedUserData))
              router.push(ROUTES.DASHBOARD)
            }}
          >
            {({
              isSubmitting,
              setValues,
              values
            }) => (
              /* form built in component of formik */
              <Form
                className="relative bg-white flex flex-col items-center justify-evenly text-thirdColor mx-auto py-4 px-8 min-h-[400px] lg:min-h-[450px] w-[85%] max-w-[350px] lg:max-w-[380px] shadow-2xl border border-secondaryBgColor shadow-shadowColor rounded-2xl"
              >
                {/* title of the form */}
                <h2 className="mb-6 text-3xl text-thirdColor">Login</h2>

                <div className="my-1 w-full">
                  {/* input built-in component of mui */}
                  <TextField
                    className="w-full"
                    name="email" type="email" label="email" variant="standard"
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setValues({...values, email: newValue})
                    }}
                  />
                  {/* error message component of formik*/}
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

                {/* text with link that redirects to sign-up page */}
                <div className="w-full justify-start pl-1 mt-4 mb-1">
                  <Link href={"/sign-up"} className="link">
                    <p>
                    ¿No tienes una cuenta?
                      <strong className=" text-secondaryBgColor underline"> Crear cuenta</strong>
                    </p>
                  </Link>
                </div>

                {/* submit button */}
                <button
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
      </div>
    </AuthPageManager>
  )
}

export default Login;