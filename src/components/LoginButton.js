import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "semantic-ui-react";

function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <div>
        <Button primary onClick={() => loginWithRedirect()}>
          Log In
        </Button>
      </div>
    )
  );
}

export default LoginButton;
