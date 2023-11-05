import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(20).required("Please Enter you Name"),
  email: Yup.string().min(2).required("Please Enter your Email"),
  password: Yup.string().min(6).required("Please Enter youe password"),
});
