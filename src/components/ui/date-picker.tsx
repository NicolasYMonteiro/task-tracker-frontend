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
            "w-full bg-white hover:bg-gray-200 text-black px-3 py-2 text-sm",
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
      {!disabled && ( 

        <PopoverContent
          className="bg-white"
          align="start"
          side="top"
          sideOffset={8}
          alignOffset={0}
          avoidCollisions={false}
        >
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            captionLayout="buttons"
            fromYear={1920}
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
