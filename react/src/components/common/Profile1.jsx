import React from "react";
import UnknownUser from "../common/UnknownUser";
import ProfilePicture from "./ProfilePicture";

export const getUserName = (user) => {
  if (user?.last_name && user?.first_name)
    return `${user.last_name} ${user.first_name}`;
  else if (user?.last_name && !user?.first_name) return user.last_name;
  else if (!user?.last_name && user?.first_name) return user.first_name;
  else return "Anonymous user";
};

export default function Profile1({ user }) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <ProfilePicture user={user} />
        <div className="text-sm flex flex-col gap-0.5">
          <span className="leading-none font-semibold text-gray-600">
            {getUserName(user)}
          </span>
          <span className="leading-none text-[.8rem] text-gray-500 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ">
            {user?.email}
          </span>
        </div>
      </div>
    </div>
  );
}
