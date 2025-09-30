import * as Icons from "@lib/utils/icon";
import { Icon as LucideIcon, IconNode } from "lucide-react";

interface IconProps {
    name: string;
    className?: string;
    style?: React.CSSProperties;
    size?: number;
    color?: string;
    strokeWidth?: number;
    [svgProps: string]: any;
}

export function Icon({ name, size, color, strokeWidth, className, style, ...svgProps }: IconProps) {
    const Iicon = Icons[name as keyof typeof Icons];
    return <Iicon color={color} size={size} strokeWidth={strokeWidth}  className={className} style={style} {...svgProps} />;
}