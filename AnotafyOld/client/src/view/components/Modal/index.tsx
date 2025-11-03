export default function Modal({ open, children, clickFora }: { open: boolean, children: React.ReactNode, clickFora?: () => void }) {
    return (
        <div
            onClick={clickFora}
            className={`flex w-full h-full top-0 bottom-0 right-0 left-0 items-center justify-center z-40 ${
                open ? "hidden" : "fixed"
            } bg-black/30`}
        >
            <div className="w-full h-full flex items-center justify-center mobile-keyboard-fix">
                {children}
            </div>
        </div>
    );
}