import { Accessor } from "solid-js";
import { createStore } from "solid-js/store";

type FormFields = {
  name?: string;
  surname?: string;
  address?: string;
  shippingAddress?: string;
  sameAsAddress: boolean;
};

type Form = [
  Accessor<FormFields>,
  {
    submit: (any) => void;
    updateField: (
      fieldName: string,
      isCheckBox: boolean
    ) => (event: Event) => void;
  }
];

const submit = (form: FormFields) => {
  // here we can:
  // filter out unneeded data, e.g. the checkbox sameAsAddress
  // map fields, if needed, e.g. shipping_address
  const dataToSubmit = {
    name: form.name,
    surname: form.surname,
    address: form.address,
    shipping_address: form.shippingAddress
  };
  // should be submitting your form to some backend service
  console.log(`submitting ${JSON.stringify(dataToSubmit)}`);
};
const useForm = () => {
  const [form, setForm] = createStore<FormFields>({
    name: "",
    surname: "",
    address: "",
    shippingAddress: "",
    sameAsAddress: false
  });

  const clearField = (fieldName: string) => {
    setForm({
      [fieldName]: ""
    });
  };

  const updateFormField = (fieldName: string) => (event: Event) => {
    const inputElement = event.currentTarget as HTMLInputElement;
    if (inputElement.type === "checkbox") {
      setForm({
        [fieldName]: !!inputElement.checked
      });
    } else {
      setForm({
        [fieldName]: inputElement.value
      });
    }
  };

  return { form, submit, updateFormField, clearField };
};

export { useForm };
export type { Form };
