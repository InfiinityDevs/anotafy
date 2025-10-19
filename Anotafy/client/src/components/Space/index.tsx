interface SpaceProps {
    width?: number | "full" | string;
    height?: number | "full" | string;
    className?: string;
}

export default function Space({ width, height, className = "" }: SpaceProps) {
    const getStyleValue = (
        value?: number | "full" | string
    ): string | undefined => {
        if (typeof value === "number") {
            return `${value * 0.25}rem`;
        }
        if (value === "full") {
            return "100%";
        }
        if (typeof value === "string") {
            return value;
        }
        return undefined;
    };

    const style = {
        width: getStyleValue(width),
        height: getStyleValue(height),
    };

    return (
        <div
            className={className}
            style={style}
            aria-hidden="true"
        />
    );
}
