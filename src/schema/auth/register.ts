import { z } from "zod";

const schemaRegister = z.object({
  name: z.string().min(1, { message: "Name tidak boleh kosong" }),
  email: z.string().email({ message: "Email tidak valid" }).min(1, { message: "Email tidak boleh kosong" }),
  password: z.string().min(1, { message: "Password tidak boleh kosong" }),
});

export default schemaRegister;