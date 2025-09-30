import React from 'react';
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { ButtonGroup } from '.';

interface SceneBarProps {
  leftPanelOpen?: boolean;
  onLeftPanelChange?: (open: boolean) => void;
  rightPanelOpen?: boolean;
  centerPanelActions?: React.ReactNode;
  onRightPanelChange?: (open: boolean) => void;
  rightPanelActions?: React.ReactNode;
  leftPanelActions?: React.ReactNode;
}

export function SceneBar({
  leftPanelOpen,
  onLeftPanelChange,
  rightPanelOpen,
  centerPanelActions,
  onRightPanelChange,
  rightPanelActions,
  leftPanelActions
}: SceneBarProps): JSX.Element {
  return (
    <div className='ev-row items-center justify-between p-2'>
      <div className='flex items-center'>
        {leftPanelOpen !== undefined && !leftPanelOpen && (
          <button 
            type="button"
            onClick={() => onLeftPanelChange && onLeftPanelChange(true)}
          >
            <PanelLeftOpen size={28} strokeWidth={1} className='ev-fg-500 hover:ev-fg-primary-500'/>
          </button>
        )}
        {leftPanelOpen !== undefined && leftPanelOpen && (
          <button 
            type="button"
            onClick={() => onLeftPanelChange && onLeftPanelChange(false)}
          >
            <PanelLeftClose size={28} strokeWidth={1} className='ev-fg-500 hover:ev-fg-primary-500' />
          </button>
        )}
        <div className='mx-2'>
          <ButtonGroup >
            {leftPanelActions}
          </ButtonGroup>
        </div>
      </div>
      <div className='flex items-center flex-grow'>
        {centerPanelActions}
      </div>
      <div className='flex items-center'>
        <div className='mx-2'>
          <ButtonGroup >
            {rightPanelActions}
          </ButtonGroup>
        </div>
        {rightPanelOpen !== undefined && !rightPanelOpen && (
          <button 
            type="button"
            onClick={() => onRightPanelChange && onRightPanelChange(true)}
          >
            <PanelRightOpen size={28} strokeWidth={1} className='ev-fg-500 hover:ev-fg-primary-500' />
          </button>
        )}
        {rightPanelOpen !== undefined && rightPanelOpen && (
          <button 
            type="button"
            onClick={() => onRightPanelChange && onRightPanelChange(false)}
          >
            <PanelRightClose size={28} strokeWidth={1} className='ev-fg-500 hover:ev-fg-primary-500' />
          </button>
        )}
      </div>
    </div>
  );
}
