import HamburgerSVG from "../../components/SVG/HamburgerSVG";
import CheckListSVG from "../../components/SVG/CheckListSVG";
import Logo from "../../components/common/Logo";
import Card from "../../components/common/Card";
import { RiLock2Line, RiMessage2Line, RiUser2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Button1 from "../../components/common/Button1";
import Input1 from "../../components/common/Input1";
import ApiService from "../../services/apiService";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import UserContext from "../../contexts/UserContext";

export default function SignUp() {
  const {setUser} = useContext(UserContext);
  const fields = [
    { title: "User name", name: "name", icon: <RiUser2Line /> },
    { title: "Email id", name: "email", icon: <RiMessage2Line /> },
    {
      title: "Password",
      name: "password",
      icon: <RiLock2Line />,
      type: "password",
    },
    {
      title: "Confirm your password",
      name: "password_confirmation",
      icon: <RiLock2Line />,
      type: "password",
    },
  ];
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await ApiService.getCSRFcookie();
      const data = await ApiService.signup(form);
      setUser(data?.user)
      toast.success("You are registered successfully.");
    } catch (error) {
      console.error("API Error: ", error);
      toast.error("Something went wrong.");
    }
  };
  return (
    <div className="flex justify-center items-center px-3 h-screen bg-linear-to-tr from-emerald-600 to-emerald-300 p-3 relative overflow-hidden">
      <Card className="md:max-w-9/12 w-full sm:h-full overflow-y-auto z-10 relative">
        <div className="flex h-full">
          <div className="flex-1 hidden sm:block h-full">
            <img
              src="/img/Coffee.jpeg"
              alt="A woman drinking a coffee on a couch in front of a computer"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
          <form
            className="flex-1 bg-white overflow-y-auto h-full py-10"
            onSubmit={submitForm}
          >
            <div className="flex justify-center w-full">
              <div className="flex flex-col items-center gap-5 w-8/12">
                <div className="text-center">
                  <h1 className="text-emerald-600 text-4xl font-bold">
                    Welcome
                  </h1>
                  <p
                    className="text-gray-400 text-sm"
                    style={{ lineHeight: "1" }}
                  >
                    Signup with Email
                  </p>
                </div>
                {fields.map((field, index) => (
                  <Input1
                    key={index}
                    title={field.title}
                    name={field.name}
                    type={field?.type}
                    onChange={(e) => updateForm(field.name, e.target.value)}
                  />
                ))}
                <Button1>SIGNUP</Button1>
                <div className="flex items-center gap-px scale-x-130 text-gray-800 text-sm">
                  <span className="w-20 h-px bg-gray-500"></span>
                  <span>OR</span>
                  <span className="w-20 h-px bg-gray-500"></span>
                </div>
                <div className="flex gap-3">
                  <div className="p-3 rounded-lg bg-blue-50 px-7 shrink-0">
                    <img
                      src="/img/icons8-logo-google-48.png"
                      alt=""
                      className="w-6"
                    />
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 px-7 shrink-0">
                    <img
                      src="/img/icons8-facebook-nouveau-48.png"
                      alt=""
                      className="w-6"
                    />
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 px-7 shrink-0">
                    <img
                      src="/img/icons8-mac-os-50.png"
                      alt=""
                      className="w-6"
                    />
                  </div>
                </div>

                <Link to="/login" className="text-black text-sm">
                  Already have an account? Login
                </Link>
              </div>
              <div className="top-2 right-2 absolute p-2 rounded-sm bgline">
                <Link to="/" className="cursor-auto">
                  <Logo />
                </Link>{" "}
              </div>
            </div>
          </form>
        </div>
      </Card>
      <div className="absolute -left-15 top-3 z-0 -rotate-12">
        <HamburgerSVG />
      </div>
      <div className="absolute -right-15 bottom-3 z-0 rotate-12">
        <CheckListSVG />
      </div>
    </div>
  );
}
