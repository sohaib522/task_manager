import  {database}  from "./Firebase_setup";
import React from 'react'
import { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";

export default function Write() {
   const [values,setvalues]=useState(
        {
            name : " ",
            email : " "
        }
)
const handlechange=(event)=>{
    let name,value;

    name=event.target.name
    value=event.target.value
    setvalues({...values,[name] : value})
    set(ref(database, 'Users/Ali/4' ), {
    username: values.name,
    email: values.email
  });
}
return(
    <div>
        <input type= "text" value={values.name} name="name" placeholder="name" onChange={handlechange} ></input>
        <input type= "text" value={values.email}  name="email" placeholder="email" onChange={handlechange}></input>
    </div>
)
 
  }
