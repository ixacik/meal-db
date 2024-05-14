import { CreateForm } from "./_components/create-form";
import { FormProvider } from "./_providers/form-provider";

export default function CreatePage() {
  return (
    <FormProvider>
      <CreateForm />
    </FormProvider>
  );
}
