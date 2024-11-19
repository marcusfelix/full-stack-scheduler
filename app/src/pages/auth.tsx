import { useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { useUserContext } from "../context/user";
import { useToast } from "../context/toast";

const Auth = () => {
  const user = useUserContext();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleField: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;

      case "password":
        setPassword(event.target.value);
        break;

      default:
        break;
    }
  }

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async () => {
    // const result = await user.login(email, password);
    toast.show("Hello!", "alert")

    // if (result instanceof Error) {

    // }
  }

  return <div className="flex flex-row h-screen bg-gray-50">
    <div className="flex-1 max-w-md bg-white p-8 flex flex-col justify-end gap-20">
      <h1 className="font-bold tracking-tighter text-4xl">Schedule(me)</h1>
      <form className="flex flex-col gap-4">
        <p className="text-gray-400 text-lg">To schedule a call with me, please login or make an account.</p>
        <Input
          label="E-mail"
          type="email"
          onChange={handleField}
        />
        <Input
          label="Password"
          type="password"
          onChange={handleField}
        />
        <div className="flex flex-row justify-end mt-8">
          <Button label="Login" onClick={handleSubmit} />
        </div>
      </form>
    </div>
    <div className="flex-1 gradient">2</div>
  </div>
}

export default Auth;