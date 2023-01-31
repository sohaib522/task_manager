import * as Yup from "yup";
export const Sign_in_schema = Yup.object({
  
    email: Yup.string().email().required("Please Enter Your Email"),
    password: Yup.string().min(6).required("Please Enter Your Password"),

  });
  export const To_do_Schema = Yup.object({
  
    Title:Yup.string().min(3).max(30).required("Please Enter Title"),
    Description : Yup.string().min(3).max(60).required("Please Enter Description")

  });
  
