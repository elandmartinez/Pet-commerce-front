'use client'

import { Formik, ErrorMessage, Form } from "formik"
import { ROUTES, SIGN_UP_FORM_INITIAL_VALUES } from "../../utils/constants";
import { SIGN_UP_SCHEMA } from "@/utils/schemas";
import Link from "next/link"
import TextField from '@mui/material/TextField';
import NonAuthPageNavbar from "../components/NonAuthPageNavbar/NonAuthPageNavbar";
import { postClient } from "@/services/clientService";
import { authUser } from "@/services/userService";
import { useDispatch } from "react-redux";
import { updateUser } from "@/lib/store/slices/userSlice";
import { useRouter } from "next/navigation";


function SignUp () {
  const dispatch = useDispatch()
  const router = useRouter()
  //creating a user is successful, now dispatch the data to the store and make a push in github

  async function createClient (bodyRequest) {
    try {
      const res = await postClient(bodyRequest)

      return res
    } catch (error) {
      return new Error(error)      
    }
  }

  return (
    <>
      <NonAuthPageNavbar />
      <div className="relative top-0 z-20 login-page w-full h-[78%] lg:h-[70%] flex items-center lg:text-lg">
        <Formik
          initialValues={SIGN_UP_FORM_INITIAL_VALUES}
          validationSchema={SIGN_UP_SCHEMA}
          onSubmit={async (values, {setSubmitting}) => {
            console.log({values})
            debugger
            delete values.repeat_password
            await createClient(values)

            const userCredential = {username: values.email, password: values.password}
            const userToken = await authUser(userCredential)

            dispatch(updateUser({...values, ...userToken}))
            console.log({userToken})

            router.push(ROUTES.DASHBOARD)

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
              {/* TITLE */}
              <h2 className="mb-6 text-3xl text-thirdColor">Sign up</h2>

              {/* NAME INPUT */}
              <div className="my-1 w-full">
                <TextField className="w-full" name="name" type="name" label="name" variant="standard"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setValues({...values, name: newValue})
                  }}
                />
                <ErrorMessage name="name" component="div" className="mt-1 text-warningColor"/>
              </div>

              {/* EMAIL INPUT */}
              <div className="my-1 w-full">
                <TextField className="w-full" name="email" type="email" label="email" variant="standard"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setValues({...values, email: newValue})
                  }}
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-warningColor"/>
              </div>

              {/* PHONE NUMBER AND COUNTRY CODE INPUTS */}

              <div className="w-full flex justify-between">
                <div className="my-1 w-[70%]">
                  <TextField className="w-full" name="phoneNumber" type="number" label="Phone number" variant="standard" inputProps={{type: "number"}}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      console.log(newValue)
                      setValues({...values, phoneNumber: newValue})
                    }}
                  />
                  <ErrorMessage name="phoneNumber" component="div" className="mt-1 text-warningColor"/>
                </div>
                <div className="my-1 w-[25%]">
                  <TextField className="w-full" name="nationalCode" type="number" label="code" variant="standard" inputProps={{type: "number"}}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      console.log({e})
                      setValues({...values, nationalCode: newValue})
                    }}
                  />
                  <ErrorMessage name="nationalCode" component="div" className="bg-white z-10 mt-1 text-warningColor absolute p-2 border border-shadowColor rounded-lg"/>
                </div>
              </div>

              {/* PASSWORD INPUT */}

              <div className="my-1 w-full">
                <TextField className="w-full" name="password" type="password" label="password" variant="standard"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setValues({...values, password: newValue})
                  }}
                />
                <ErrorMessage name="password" component="div" className="mt-1 text-warningColor"/>
              </div>
              
              {/* REPEAT PASSWORD INPUT */}

              <div className="my-1 w-full">
                <TextField className="w-full" name="repeat_password" type="password" label="Repeat password" variant="standard"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setValues({...values, repeat_password: newValue})
                  }}
                />
                <ErrorMessage name="repeat_password" component="div" className="mt-1 text-warningColor"/>
              </div>

              {/* LOGIN LINK */}
              <div className="w-full justify-start pl-1 mt-4 mb-1">
                <Link href={"/login"}>
                  <p className="">
                  ¿Ya tienes una cuenta?
                    <strong className=" text-secondaryBgColor underline"> Ingresar con mi cuenta</strong>
                  </p>
                </Link>
              </div>


              {/* SUBMIT BUTTON */}
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