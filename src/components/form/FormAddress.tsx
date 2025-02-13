import { Formik, Field, Form, ErrorMessage } from "formik";
import schemaAddress from "../../schema/user/address";
import { InputAddress } from "../../types/user";


interface FormAddressProps {
    onSubmit?: (address: InputAddress) => void;
    onClose?: () => void;
}

function FormAddress({ onSubmit, onClose }: FormAddressProps) {
    const validate = (values: typeof schemaAddress._type) => {
        const result = schemaAddress.safeParse(values);
        if (!result.success) {
        return Object.fromEntries(
            Object.entries(result.error.format()).map(([key, value]) => [
            key,
            Array.isArray(value) ? value.join(", ") : value?._errors?.join(", "),
            ])
        );
        }
        return {};
    };

    const handleSubmitAddress = async (values: typeof schemaAddress._type) => {
        onSubmit(values as InputAddress);
    };

    return (
    <>
        <Formik
            initialValues={{
            street: "",
            phone: "",
            label: "",
            is_primary: false,
            }}
            validate={validate}
            onSubmit={handleSubmitAddress}
        >
            <Form className="p-6 bg-white shadow-md rounded-md border border-slate-100 m-12 max-w-[820px] mx-5 md:mx-auto space-y-3.5">
            <h1 className="font-semibold text-2xl">Add Address</h1>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="street">Street Address</label>
                <Field
                id="street"
                type="text"
                name="street"
                className="border border-slate-300 rounded-lg p-2"
                />
                <ErrorMessage name="street">
                {(msg) => <div className="text-red-500">{msg}</div>}
                </ErrorMessage>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="phone">Phone Number</label>
                <Field
                id="phone"
                type="tel"
                name="phone"
                className="border border-slate-300 rounded-lg p-2"
                />
                <ErrorMessage name="phone">
                {(msg) => <div className="text-red-500">{msg}</div>}
                </ErrorMessage>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="label">Label</label>
                <Field
                id="label"
                type="text"
                name="label"
                className="border border-slate-300 rounded-lg p-2"
                />
                <ErrorMessage name="label">
                {(msg) => <div className="text-red-500">{msg}</div>}
                </ErrorMessage>
            </div>

            <div className="flex items-center gap-2">
                <Field
                id="is_primary"
                type="checkbox"
                name="is_primary"
                className="border border-slate-300 rounded"
                />
                <label htmlFor="is_primary">Set as primary address</label>
                <ErrorMessage name="is_primary">
                {(msg) => <div className="text-red-500">{msg}</div>}
                </ErrorMessage>
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg p-2 w-full"
            >
                Save Address
            </button>
            <button
                onClick={onClose}
                className="bg-orange-500 text-white rounded-lg p-2 w-full"
            >
                Close
            </button>
            </Form>
        </Formik>
    </>
    );
}

export default FormAddress;