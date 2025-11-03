export default function RadioButton({ selected, onChange, label }: {selected: boolean, onChange: (selected: boolean) => void, label: string}) {
    return (
        <>
            <button
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => onChange(!selected)}
            >
                <div className="flex items-center justify-center border border-primary rounded-full w-3.5 h-3.5">
                    <div
                        className={`bg-primary rounded-full w-2/3 aspect-square ${
                            selected ? "scale-100" : "scale-0"
                        } transition-all duration-100`}
                    />
                </div>
                <span className="text-text text-sm">{label}</span>
            </button>
        </>
    );
}