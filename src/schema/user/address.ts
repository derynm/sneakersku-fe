import { z } from "zod";

const schemaAddress = z.object({
  street: z.string().min(1, { message: "Street address cannot be empty" }),
  phone: z.string()
    .min(1, { message: "Phone number cannot be empty" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  label: z.string().min(1, { message: "Label cannot be empty" }),
  is_primary: z.boolean(),
});

export default schemaAddress;