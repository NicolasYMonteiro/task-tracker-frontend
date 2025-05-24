import React from "react";
import { Calendar } from "@components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { ptBR } from "date-fns/locale";

import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";
import { format, isValid } from "date-fns";


interface DatePickerProps {
  field: any;
  placeholder?: string;
  name?: string;
  error?: string[];
  disabled?: boolean;
}

const DatePicker = ({ placeholder, field, name, error, disabled }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          name={name}
          aria-describedby={`${name}-error`}
          disabled={disabled}
          className={cn(
            "md:w-72  sm:w-64 text-left rounded-xl bg-background px-3 py-2 text-sm",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value && isValid(new Date(field.value)) ? (
            format(field.value, "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      {!disabled && ( // Impede a abertura do popover quando desativado

        <PopoverContent
          className="w-auto p-0 bg-white dark:bg-dark-400"
          align="start"
        >
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            captionLayout="dropdown"
            fromYear={1960}
            toYear={2030}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
            showOutsideDays={false}
          />
        </PopoverContent>
      )}

    </Popover>
  );
};

export default DatePicker;
