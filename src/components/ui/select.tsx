import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const Select = React.forwardRef<
  HTMLButtonElement,
  SelectPrimitive.SelectProps & {
    placeholder?: string;
    options: string[];
  }
>(({ placeholder, options, ...props }, ref) => (
  <SelectPrimitive.Root {...props}>
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
      )}
    >
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white shadow-md animate-in fade-in-80">
        <SelectPrimitive.Viewport className="p-1">
          {options.map((option) => (
            <SelectPrimitive.Item
              key={option}
              value={option}
              className={cn(
                'relative flex cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
              )}
            >
              <SelectPrimitive.ItemText>{option}</SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
));

Select.displayName = 'Select';

export { Select };