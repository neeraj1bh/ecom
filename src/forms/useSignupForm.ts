import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormProps, useForm } from "react-hook-form";
import { type TypeOf, z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = TypeOf<typeof schema>;

const useSignupForm = (props?: UseFormProps<FormData>) => {
  return useForm<FormData>({
    resolver: zodResolver(schema),
    ...props,
  });
};

export default useSignupForm;
