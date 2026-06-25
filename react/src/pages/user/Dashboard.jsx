import React, { useContext } from "react";
import { STitle } from "../../components/layout/authentified/AuthApp";
import UserContext from "../../contexts/UserContext";
import ProfilePicture from "../../components/common/ProfilePicture";
import { getUserName } from "../../components/common/Profile1";
import AuthNav from "../../components/common/AuthNav";
import AuthContainer from "../../components/common/AuthContainer";

const NOTIFICATIONS = [
  {
    title: "Product updated recently",
    author: {
      user_id: 8,
      first_name: "Steeve",
      last_name: "Rakfan",
      email: "steeverakfan@gmail.com",
      role: "admin",
      profile: { picture_path: "/img/faq-boy-with-logos.png" },
    },
  },
  {
    title: "Product updated recently",
    author: {
      user_id: 8,
      first_name: "Steeve",
      last_name: "Rakfan",
      email: "steeverakfan@gmail.com",
      role: "admin",
      profile: { picture_path: "/img/faq-boy-with-logos.png" },
    },
  },
  {
    title: "Product updated recently",
    author: {
      user_id: 8,
      first_name: "Steeve",
      last_name: "Rakfan",
      email: "steeverakfan@gmail.com",
      role: "admin",
      profile: { picture_path: "/img/faq-boy-with-logos.png" },
    },
  },
  {
    title: "Product updated recently",
    author: {
      user_id: 8,
      first_name: "Steeve",
      last_name: "Rakfan",
      email: "steeverakfan@gmail.com",
      role: "admin",
      profile: { picture_path: "/img/faq-boy-with-logos.png" },
    },
  },
];

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const rightSections = [
    { title: "NOTIFICATIONS", data: NOTIFICATIONS },
    { title: "RECENT ACTIVITIES", data: NOTIFICATIONS },
    { title: "RECENT CONTACTS", data: NOTIFICATIONS },
  ];
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-9 h-screen overflow-y-auto">
        <AuthNav />
        <AuthContainer>Dashboard</AuthContainer>
      </div>
      <div className="fixed right-0 top-0 translate-x-full lg:translate-x-0 transition lg:static lg:col-span-3 h-screen overflow-y-auto border-s border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4 space-y-8">
        {rightSections.map((section, index) => (
          <section key={index}>
            <STitle title={section.title} />
            <ul className="space-y-3">
              {section.data.map((d, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ProfilePicture user={d.author} />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold  text-slate-600 dark:text-slate-300">
                      {d.title}
                    </span>
                    <span className="text-[.8rem] text-slate-400">
                      {getUserName(d.author)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
