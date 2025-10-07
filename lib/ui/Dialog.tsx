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
import { useEffect, useState } from 'react';
import { on } from '@lib/bus';
import { DialogProps } from '@lib/types/components.types';

export function Dialog({
  title,
  description,
  children,
  open,
  setOpen,
  showFooter,
  onToggle,
  trigger,
}: DialogProps) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    if (onToggle) {
      on(onToggle, () => {
        setIsOpen(!isOpen);
      });
    }
  }, []);

  const _onOpenChange = (open: boolean) => {
    //console.log('---- open', open)
    setIsOpen(open);
    if (setOpen) {
      setOpen(open);
    }
  }

  return (
    <DialogUI open={isOpen} onOpenChange={_onOpenChange}>
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
       {showFooter && <DialogFooter>
          <DialogClose >
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>}
      </DialogContent>
    </DialogUI>
  );
}
