import React from "react";
import { UserLayout } from "../../layouts";
import { LogInForm } from "./LogInForm";
export const LogIn: React.FC = (props) => {
  return (
    <UserLayout>
      <LogInForm />
    </UserLayout>
  );
};
