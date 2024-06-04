"use client";

import { type FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../../components/ui/form";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../../components/ui/multiple-selector";
import { SETS, getSetIdByName, getSetNameById } from "../../lib/rune.mapping";
import { useFiltersStore } from "../../store/filters";
import { type SlotId } from "../../types/rune";

const formSchema = z.object({
  sets: z.string().array(),
  slots: z.number().array(),
});

export const Filter: FC = () => {
  const { updateFilters, filters } = useFiltersStore();

  console.log(filters);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sets: filters.sets.map((id) => getSetNameById(id)),
      slots: filters.slots,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateFilters({
      sets: values.sets.map((name) => getSetIdByName(name)),
      slots: values.slots as SlotId[],
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded-lg border border-border p-4"
      >
        <FormField
          control={form.control}
          name="sets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Set</FormLabel>
              <FormControl>
                <MultiSelector
                  values={field.value}
                  onValuesChange={(values) => field.onChange(values)}
                  loop
                  className="max-w-xs"
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Select sets" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {Object.values(SETS).map((set) => (
                        <MultiSelectorItem key={set} value={set}>
                          {set}
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slots"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slot</FormLabel>
              <FormControl>
                <MultiSelector
                  values={field.value.map(String)}
                  onValuesChange={(values) =>
                    field.onChange(values.map(Number))
                  }
                  loop
                  className="max-w-xs"
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Select slots" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {Array.from({ length: 6 }).map((_, slot) => {
                        const slotNumber = slot + 1;
                        return (
                          <MultiSelectorItem
                            key={slotNumber}
                            value={String(slotNumber)}
                          >
                            {slotNumber}
                          </MultiSelectorItem>
                        );
                      })}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
