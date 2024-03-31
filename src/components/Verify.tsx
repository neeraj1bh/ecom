import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import { useRouter } from "next/router";

const MAX_PIN_LENGTH = 8;

interface VerifyProps {
  name: string;
  email: string;
  password: string;
}

const Verify: React.FC<VerifyProps> = ({ name, email, password }) => {
  const router = useRouter();

  const [pin, setPin] = useState<number[]>(Array(MAX_PIN_LENGTH).fill(-1));
  const initialRender = useRef<boolean>(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    Array(MAX_PIN_LENGTH).fill(null),
  );
  const [activeInput, setActiveInput] = useState<number>(0);

  useEffect(() => {
    inputRefs.current[activeInput]?.focus();
  }, [activeInput]);

  useEffect(() => {
    if (!initialRender.current) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      sendEmail(email);
      initialRender.current = true;
    }
  }, []);

  const sendEmail = async (email: string) => {
    const response = await fetch("/api/email/send/route", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newPin = [...pin];
      newPin[index] = -1;
      setPin(newPin);
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        setActiveInput(prevIndex);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = parseInt(e.target.value[e.target.value.length - 1] ?? "");
    if (!isNaN(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      const nextIndex = index + 1;
      if (nextIndex < MAX_PIN_LENGTH) {
        setActiveInput(nextIndex);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");

    if (/^\d+$/.test(pastedData)) {
      if (pastedData.length === MAX_PIN_LENGTH) {
        const pinArray = pastedData.split("").map((digit) => parseInt(digit));

        setPin(pinArray);
        setActiveInput(pinArray.length - 1);
      } else {
        console.error("Less or more numbers copied. Please try again.");
      }
    } else {
      console.error("Copied characters are not numbers.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pinString = pin.join("");
    console.log({ name, email, password, pin: pinString });

    try {
      const response = await fetch("/api/email/verify/route", {
        method: "POST",
        body: JSON.stringify({ name, email, password, pin: pinString }),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("User verified successfully");
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push("/");
      } else {
        console.error("Failed to verify user");
      }
    } catch (error) {
      console.error("Failed to verify user", error);
    }
  };

  const hideEmail = (email: string) => {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      const [username, domain] = email.split("@");
      const hiddenUsername =
        (username ?? "").slice(0, 3) + "*".repeat((username ?? "").length - 3);
      return `${hiddenUsername}@${domain}`;
    } else {
      return email;
    }
  };

  return (
    <div className="mx-auto my-12 flex h-[400px] w-[550px] flex-col items-center justify-center rounded-2xl border border-[#C1C1C1] p-4">
      <h2 className="mb-4 text-2xl font-bold">Verify Your Email</h2>
      <p className="">Enter the 8-digit code you have received on</p>
      <p className="mb-8 font-semibold">{hideEmail(email)}</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label
          htmlFor="pin_0"
          className="mb-2 text-sm font-medium leading-6 text-black"
        >
          Code
        </label>
        <div className="mb-8 flex space-x-2">
          {pin.map((digit, index) => (
            <div
              key={index}
              className="h-10 w-10 rounded border-2 border-gray-300"
            >
              <input
                id={`pin_${index}`}
                type="text"
                value={digit !== -1 ? digit : ""}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[index] = el;
                  }
                }}
                onFocus={() => setActiveInput(index)}
                onBlur={() => setActiveInput(-1)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onChange={(e) => handleChange(e, index)}
                onPaste={(e) => handlePaste(e)}
                autoComplete="off"
                maxLength={1}
                required
                className="h-full w-full bg-transparent text-center text-xl outline-none"
              />
            </div>
          ))}
        </div>
        <Button type="submit" className="font-light uppercase tracking-widest">
          Verify
        </Button>
      </form>
    </div>
  );
};

export default Verify;
