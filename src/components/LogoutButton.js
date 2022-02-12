import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "semantic-ui-react";

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div>
        <Button
          primary
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout
        </Button>
      </div>
    )
  );
}

export default LogoutButton;
