import React from "react";

// css
import './Button.css'

export interface ButtonProps {
    /** ボタンが重要なアクションを示すかどうか */
    primary?: boolean;
    /** ボタンのラベル */
    label: string;
    /** 背景色 */
    backgroundColor?: string;
    /** テキストの色 */
    color?: string;
    /** ボタンの幅 */
    width?: number;
    /** ボタンの高さ */
    height?: number;
    /** ボタンのアール */
    borderRadius?: number;
    /** クリック時のハンドラ */
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
    primary = false,
    label,
    backgroundColor,
    color,
    width,
    height,
    borderRadius,
    ...props
}: ButtonProps) => {
    const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
    return (
        <button
            type="button"
            className={['storybook-button', mode].join(' ')}
            style={{ backgroundColor, color, width, height, borderRadius }}
            {...props}
        >
            {label}
        </button>
    );
}