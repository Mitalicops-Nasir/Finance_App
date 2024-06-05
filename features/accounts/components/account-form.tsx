import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";

import { insertAccountSchema } from "@/db/schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValue = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValue;
  onSubmit: (values: FormValue) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const AccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const handleSubmit = (values: FormValue) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  disabled={disabled}
                  placeholder="e.g. cash, Bank, Credit Card"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? "Save Changes" : "Create Account"}
        </Button>
        {!!id && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={disabled}
            className="w-full"
          >
            <Trash className="size-4 mr-2" />
            Delete Account
          </Button>
        )}
      </form>
    </Form>
  );
};
