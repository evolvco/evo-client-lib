import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Dialog as DialogUI,
  } from '@lib/components';
  import { Button } from './Button';
  
  interface DialogProps {
    title?: string;
    description?: string;
    children: React.ReactNode;
    open?: boolean;
    setOpen?: (open: boolean) => void;
    trigger?: React.ReactNode;
  }
  
  export function Dialog({
    title,
    description,
    children,
    open,
    setOpen,
    trigger,
  }: DialogProps) {
    return (
      <DialogUI open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          {title && (
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}
          {children}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </DialogUI>
    );
  }
  