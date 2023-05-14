import React from "react";
import { useAuth } from "./firebase/AuthContext"
import Avatar from '@material-ui/core/Avatar';


function UserIconWithName() {
    const { currentUser } = useAuth();
  
    return (
      <div>
        <Avatar>{currentUser.displayName && currentUser.displayName.charAt(0)}</Avatar>
        {currentUser && <span>{currentUser.displayName}</span>}
      </div>
    );
  }

  export default UserIconWithName;


