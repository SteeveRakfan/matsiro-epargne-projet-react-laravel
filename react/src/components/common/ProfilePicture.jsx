import React from "react";
import UnknownUser from "./UnknownUser";

export default function ProfilePicture({user}) {
  return (
    <div className="rounded-full overflow-hidden w-8 aspect-square ring ring-slate-200">
      {user?.profile?.picture_path ? (
        <img src={user?.profile?.picture_path} alt="User picture" />
      ) : (
        <UnknownUser />
      )}
    </div>
  );
}
