interface SpaceProps {
    width?: number | "full" | "screen" | "auto" | string;
    height?: number | "full" | "screen" | "auto" | string;
    className?: string;
}

export default function Space({ width, height, className = "" }: SpaceProps) {
    const getStyleValue = (
        value?: number | "full" | "screen" | "auto" | string
    ): string | undefined => {
        if (typeof value === "number") {
            return `${value * 0.25}rem`;
        }
        if (value === "full") {
            return "100%";
        }
        if (value === "screen") {
            return "100vw"; // ou "100vh" dependendo do contexto
        }
        if (value === "auto") {
            return "auto";
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

    return <div className={className} style={style} aria-hidden="true" />;
}
