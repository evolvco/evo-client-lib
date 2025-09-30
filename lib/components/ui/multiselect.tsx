import * as RadixPopover from '@radix-ui/react-popover';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  CheckIcon,
  ChevronDown,
  WandSparkles,
  XCircle,
  XIcon,
} from 'lucide-react';
import React, {
  ButtonHTMLAttributes,
  ComponentType,
  forwardRef,
  useMemo,
  useState,
} from 'react';
import { cn } from '@lib/utils';
import { Badge } from './badge';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './command';
import { PopoverContent } from './popover';
import { Separator } from './separator';

/**
 * Utility function to sort option values by their corresponding labels alphabetically.
 * Used for sorting selected values in multi-select components.
 *
 * @param values - Array of option values to sort
 * @param options - Array of option objects containing value and label pairs
 * @param autoSort - Whether sorting should be applied
 * @returns Sorted array of values or original array if autoSort is false
 */
function sortOptionValues(
  values: string[],
  options: { value: string; label: string }[],
  autoSort: boolean
): string[] {
  if (!autoSort) return values;

  // Create a map of option values to their labels for efficient sorting
  const valueLabelMap = new Map(
    options.map((option) => [option.value, option.label])
  );

  // Sort values alphabetically by their corresponding labels
  return [...values].sort((a, b) => {
    const labelA = valueLabelMap.get(a) ?? '';
    const labelB = valueLabelMap.get(b) ?? '';
    return labelA.localeCompare(labelB);
  });
}

/**
 * Utility function to sort option objects by their labels alphabetically.
 * Used for sorting the main options list in multi-select components.
 *
 * @param options - Array of option objects to sort
 * @param autoSort - Whether sorting should be applied
 * @returns Sorted array of options or original array if autoSort is false
 */
function sortOptions<T extends { label: string }>(
  options: T[],
  autoSort: boolean
): T[] {
  if (!autoSort) return options;

  // Sort options alphabetically by their labels
  return [...options].sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva(
  'm-1 transition ease-in-out delay-150 duration-300',
  {
    variants: {
      variant: {
        default:
          'border-foreground/10 text-foreground bg-card hover:bg-card/80',
        secondary:
          'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        inverted: 'inverted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: string;
    /** Optional icon component to display alongside the option. */
    icon?: ComponentType<{ className?: string }>;
  }[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue?: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * When true, also uses PopoverContentWithoutPortal for better dialog compatibility.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;

  /**
   * The preferred side of the trigger to render against when open.
   * Optional, defaults to "bottom".
   */
  side?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * Whether to automatically sort both the options list and selected values alphabetically by their display labels.
   * When true, both the dropdown options and selected values will be sorted alphabetically by label text.
   * Optional, defaults to true.
   */
  autoSort?: boolean;
}

/**
 * TODO: refactor & combine with AsyncSelect
 * Combine MultiSelect2 with AsyncSelect & ComboBox
 * Need combine DialogContext (Dialog/Alert/BaseDialog) for modal state
 */
export const MultiSelect2 = forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = 'Select options',
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      className,
      side = 'bottom',
      autoSort = true,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(() => {
      // Sort initial defaultValue alphabetically by label if autoSort is enabled
      return sortOptionValues(defaultValue, options, autoSort);
    });
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    /**
     * Memoized sorted options based on autoSort setting.
     */
    const sortedOptions = useMemo(() => {
      return sortOptions(options, autoSort);
    }, [options, autoSort]);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        const sortedValues = sortOptionValues(
          newSelectedValues,
          options,
          autoSort
        );
        setSelectedValues(sortedValues);
        onValueChange(sortedValues);
      }
    };

    const handlePopoverOpenChange = (open: boolean) => {
      setIsPopoverOpen(open);
    };

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      const sortedValues = sortOptionValues(
        newSelectedValues,
        options,
        autoSort
      );
      setSelectedValues(sortedValues);
      onValueChange(sortedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === sortedOptions.length) {
        handleClear();
      } else {
        const allValues = sortedOptions.map((option) => option.value);
        const sortedValues = sortOptionValues(allValues, options, autoSort);
        setSelectedValues(sortedValues);
        onValueChange(sortedValues);
      }
    };

    return (
      <RadixPopover.Root
        open={isPopoverOpen}
        onOpenChange={handlePopoverOpenChange}
        modal={modalPopover}
      >
        <RadixPopover.Trigger asChild>
          <Button
            ref={ref}
            {...props}
            variant="outline"
            onClick={handleTogglePopover}
            className={cn(
              'flex w-full h-auto min-h-9 px-2 py-0 text-sm items-center justify-between [&_svg]:pointer-events-auto',
              className
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center">
                  {selectedValues.slice(0, maxCount).map((value) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <Badge
                        key={value}
                        className={cn(
                          isAnimating ? 'animate-bounce' : '',
                          multiSelectVariants({ variant })
                        )}
                        style={{ animationDuration: `${animation}s` }}
                      >
                        {IconComponent && (
                          <IconComponent className="h-4 w-4 mr-2" />
                        )}
                        {option?.label}
                        <XCircle
                          className="ml-2 h-4 w-4 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </Badge>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <Badge
                      className={cn(
                        'bg-transparent text-foreground border-foreground/1 hover:bg-transparent',
                        isAnimating ? 'animate-bounce' : '',
                        multiSelectVariants({ variant })
                      )}
                      style={{ animationDuration: `${animation}s` }}
                    >
                      {`+ ${selectedValues.length - maxCount} more`}
                      <XCircle
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <XIcon
                    className="h-4 mx-2 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator
                    orientation="vertical"
                    className="flex min-h-6 h-full"
                  />
                  <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-muted-foreground">
                  {placeholder}
                </span>
                <ChevronDown className="h-4 cursor-pointer text-muted-foreground" />
              </div>
            )}
          </Button>
        </RadixPopover.Trigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
          side={side}
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
              autoFocus={true}
              onFocus={(e) => {
                // Ensure the input is properly focused
                e.target.select();
              }}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  key="all"
                  onSelect={toggleAll}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      selectedValues.length === sortedOptions.length
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible'
                    )}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <span>(Select All)</span>
                </CommandItem>
                {sortedOptions.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <CheckIcon className="h-4 w-4" />
                      </div>
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  {selectedValues.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={handleClear}
                        className="flex-1 justify-center cursor-pointer"
                      >
                        Clear
                      </CommandItem>
                      <Separator
                        orientation="vertical"
                        className="flex min-h-6 h-full"
                      />
                    </>
                  )}
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    className="flex-1 justify-center cursor-pointer max-w-full"
                  >
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        {animation > 0 && selectedValues.length > 0 && (
          <WandSparkles
            className={cn(
              'cursor-pointer my-2 text-foreground bg-background w-3 h-3',
              isAnimating ? '' : 'text-muted-foreground'
            )}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )}
      </RadixPopover.Root>
    );
  }
);

MultiSelect2.displayName = 'MultiSelect2';
