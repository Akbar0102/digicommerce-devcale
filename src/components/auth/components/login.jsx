"use client";

import { Input, Button } from "@nextui-org/react";

export const Login = () => {
  function handleLogin(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
  }

  return (
    <div className="w-[360px] space-y-8">
      <div>
        <h3>Login</h3>
        <p>Welcome back!</p>
      </div>
      <form onSubmit={handleLogin}>
        <div className="space-y-2">
          <Input name="email" placeholder="Email" />
          <Input name="password" placeholder="Password" type="password" />
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};