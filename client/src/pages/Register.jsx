import { Form, Link, redirect } from "react-router-dom";
import { SubmitButton } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { FormField } from "../components";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const resp = await customFetch.post("/user/register", data);
    toast.dismiss();
    toast.success(resp.data.msg);
    return redirect("/dashboard");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg ?? error.message);
    return error;
  }
};

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Form method="post" className="space-y-4 w-1/4">
        <h1 className="text-2xl font-semibold">Create an Account</h1>
        <FormField
          type="text"
          name="name"
          label="Your name"
          placeholder="Nikhil Kamath"
        />
        <FormField
          type="email"
          name="email"
          label="Your email"
          placeholder="nikhil.kamath@zerodha.com"
        />
        <FormField
          type="password"
          name="password"
          label="Your password"
          placeholder="secret123"
        />
        <SubmitButton />
        <p>
          Already registered? Go to{" "}
          <Link to="/login">
            <p className="inline text-orange-600 font-semibold">Login</p>
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
