import { useNavigate } from 'react-router-dom';
import { Card as _Card, CardContent, CardHeader, CardTitle } from '@lib/components';
import { cn } from '@ui/utils';

interface CardProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  headerClassName?: string;
  contentClassName?: string;
  onClickPath?: string;
}

export function Card({
  title,
  children,
  className,
  headerClassName,
  contentClassName,
  style,
  onClickPath,
}: CardProps) {
  const navigate = useNavigate();

  if (onClickPath) {
    className = cn(
      className,
      'shadow cursor-pointer border-l-4 hover:border-l-primary transition-colors'
    );
  }

  const handleClick = () => {
    if (onClickPath) {
      navigate(onClickPath);
    }
  };

  return (
    <_Card className={className} style={style} onClick={handleClick}>
      {title && (
        <CardHeader className={headerClassName}>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={contentClassName}>{children}</CardContent>
    </_Card>
  );
}