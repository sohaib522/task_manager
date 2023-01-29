import * as Yup from "yup";
export const Sign_in_schema = Yup.object({
  
    email: Yup.string().email().required("Please Enter Your Email"),
    password: Yup.string().min(6).required("Please Enter Your Password")

  });
  export const To_do_Schema = Yup.object({
  
    title:Yup.string().min(3).max(20).required("Please Enter Title"),
    description : Yup.string().min(3).max(20).required("Please Enter Description")

  });
  
