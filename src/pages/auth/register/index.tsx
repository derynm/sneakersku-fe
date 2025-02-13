import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

import schemaRegister from "../../../schema/auth/register"
import useAuth from "../../../hooks/useAuth";

function Register() {

  const { register } = useAuth();

  const validate = (values: typeof schemaRegister._type) => {
    const result = schemaRegister.safeParse(values);
    if (!result.success) {
      return Object.fromEntries(
        Object.entries(result.error.format()).map(([key, value]) => [
          key,
          Array.isArray(value) ? value.join(", ") : value?._errors?.join(", "),
        ])
      );
    }
    return {};
  };

  const handleSubmitRegister = async (values: typeof schemaRegister._type) => {
    await register(values.name,values.email, values.password);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Formik
        initialValues={{ name: "",email: "", password: "" }}
        validate={validate}
        onSubmit={handleSubmitRegister}
      >
        <Form className="bg-white p-8 rounded-lg shadow-lg border border-slate-100 space-y-6 w-full mx-4 max-w-[420px]">
          <h1 className="font-semibold text-2xl">Register</h1>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="name">Name</label>
            <Field id="name" type="text" name="name" className="border border-slate-300 rounded-lg p-2" />
            <ErrorMessage name="name">
              {(msg) => <div className="text-red-500">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email">Email</label>
            <Field id="email" type="email" name="email" className="border border-slate-300 rounded-lg p-2" />
            <ErrorMessage name="email">
              {(msg) => <div className="text-red-500">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password">Password</label>
            <Field id="password" type="password" name="password" className="border border-slate-300 rounded-lg p-2" />
            <ErrorMessage name="password">
              {(msg) => <div className="text-red-500">{msg}</div>}
            </ErrorMessage>
          </div>

          <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 w-full">Register</button>

          <Link to="/login" className="text-blue-500 text-center w-full block">
            Login
          </Link>
        </Form>
      </Formik>
    </div>
  )
}

export default Register