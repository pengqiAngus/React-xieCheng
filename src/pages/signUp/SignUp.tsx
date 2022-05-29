import React from "react";
import { UserLayout } from "../../layouts";
import { SignUpForm } from "./signUpForm";
export const SignUp: React.FC = () => {
  return (
    <UserLayout>
      <SignUpForm />
    </UserLayout>
  );
};
