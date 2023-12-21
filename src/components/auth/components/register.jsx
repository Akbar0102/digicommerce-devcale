"use client";

import { Input, Button } from "@nextui-org/react";

export const Register = () => {
  async function handleRegister(event) {
    event.preventDefault();
    const firstName = event.target.firstname.value;
    const lastName = event.target.lastname.value;
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const res = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, username, email, password }),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div className="w-[460px] space-y-8">
      <div>
        <h3>Register</h3>
        <p>Please create an account</p>
      </div>
      <form onSubmit={handleRegister}>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Input name="firstname" placeholder="First Name" />
            <Input name="lastname" placeholder="Last Name" />
          </div>
          <Input name="username" placeholder="Username" />
          <Input name="email" placeholder="Email" />
          <Input name="password" placeholder="Password" type="password" />
          <Button type="submit" color="primary" className="w-full">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};
