import { useRef, useState } from 'react';
import { ResizablePanelGroup, SceneBar, ResizablePanel, ResizableHandle } from '@lib/ui';
import { usePrefs } from '@lib/components/hooks/PrefProvider';
import { TriPanelProps } from '@lib/types';

export function TriPanel({
  children, 
  leftPanel, 
  rightPanel,
  className,
  prefEventNameLeft='defaultLeftPanelSize',
  prefEventNameRight='defaultRightPanelSize',
  leftPanelMaxSize=35,
  rightPanelMaxSize=35,
  leftPanelMinSize=15,
  rightPanelMinSize=15,
  direction = 'horizontal',
  leftPanelProps,
  rightPanelProps,
  panelGroupProps,
  leftHandleProps,
  rightHandleProps,
  leftPanelActions,
  rightPanelActions,
  centerPanelActions
}: TriPanelProps): JSX.Element {
  const {prefs, setPrefs} = usePrefs();
  const [leftClosed, setLeftClosed] = useState<boolean>(false);
  const [rightClosed, setRightClosed] = useState<boolean>(false);
  const leftPanelRef = useRef<any>(null);
  const rightPanelRef = useRef<any>(null);

  const repositionLeftGroup = (size: number): void => {
    if (size === 0) return;
    setPrefs({ [prefEventNameLeft]: size });
  };

  const repositionRightGroup = (size: number): void => {
    if (size === 0) return;
    setPrefs({ [prefEventNameRight]: size });
  };

  return (
    <div className={`ev-col grow ${className || ''}`}>
      <SceneBar 
        leftPanelActions={leftPanel && leftPanelActions}
        leftPanelOpen={leftPanel && !leftClosed as any} 
        onLeftPanelChange={(open: boolean) => {
          leftPanelRef.current.resize(open ? (prefs[prefEventNameLeft] || leftPanelMinSize) : 0);   
        }}
        centerPanelActions={centerPanelActions}
        rightPanelActions={rightPanel && rightPanelActions} 
        rightPanelOpen={rightPanel && !rightClosed as any} 
        onRightPanelChange={(open: boolean) => {
          rightPanelRef.current.resize(open ? (prefs[prefEventNameRight] || rightPanelMinSize) : 0);   
        }} 
      />
      <ResizablePanelGroup 
        direction={direction} 
        {...panelGroupProps}
      >
        {leftPanel && (
          <ResizablePanel
            ref={leftPanelRef}
            collapsible={true}
            collapsedSize={0}
            onResize={repositionLeftGroup}
            onCollapse={() => setLeftClosed(true)}
            onExpand={() => setLeftClosed(false)} 
            defaultSize={prefs[prefEventNameLeft] as number || leftPanelMinSize} 
            minSize={leftPanelMinSize}
            maxSize={leftPanelMaxSize}
            className='ev-col'
            {...leftPanelProps}
          >
            {leftPanel}
          </ResizablePanel>
        )}
        {leftPanel && <ResizableHandle className='w-3 hover:ev-bg-primary-100' {...leftHandleProps} />}
        <ResizablePanel className='ev-col'>
          {children}
        </ResizablePanel>
        {rightPanel && <ResizableHandle className='w-3 hover:ev-bg-primary-100' {...rightHandleProps} />}
        {rightPanel && (
          <ResizablePanel
            ref={rightPanelRef}
            minSize={rightPanelMinSize}
            maxSize={rightPanelMaxSize}
            collapsible={true}
            collapsedSize={0}
            onResize={repositionRightGroup}
            onCollapse={() => setRightClosed(true)}
            onExpand={() => setRightClosed(false)} 
            defaultSize={prefs[prefEventNameRight] as number || rightPanelMinSize}
            className='ev-col'
            {...rightPanelProps}
          >
            {rightPanel}
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
