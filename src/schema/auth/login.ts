import { z } from "zod";

const schemaLogin = z.object({
  email: z.string({ message: "Email tidak boleh kosong" }).email({message: "Email tidak valid"}),
  password: z.string().min(1, { message: "Password tidak boleh kosong" }),
});

export default schemaLogin;