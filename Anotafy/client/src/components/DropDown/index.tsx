import { ChevronDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DropdownOption {
    value: any;
    label: string;
    icon?: string;
    disabled?: boolean;
}

interface DropdownProps {
    // Dados
    options: DropdownOption[];
    value?: string;
    defaultValue?: string;
    placeholder?: string;

    // Configurações
    width?: string;
    height?: string;
    maxHeight?: string;
    position?: "left" | "right" | "center";

    // Comportamento
    searchable?: boolean;
    disabled?: boolean;
    closeOnSelect?: boolean;

    // Eventos
    onChange?: (value: string, option: DropdownOption) => void;
    onOpen?: () => void;
    onClose?: () => void;

    // Estilo
    className?: string;
    buttonClassName?: string;
    dropdownClassName?: string;
    optionClassName?: string;
}

export function DropDown({
    // Dados
    options = [],
    value,
    defaultValue = "",
    placeholder = "Selecione uma opção",

    // Configurações
    width = "w-64",
    height = "h-20",
    maxHeight = "max-h-60",
    position = "left",

    // Comportamento
    searchable = false,
    disabled = false,
    closeOnSelect = true,

    // Eventos
    onChange,
    onOpen,
    onClose,

    // Estilo
    className = "",
    buttonClassName = "",
    dropdownClassName = "",
    optionClassName = ""
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [internalValue, setInternalValue] = useState(defaultValue);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Valor controlado ou não controlado
    const currentValue = value !== undefined ? value : internalValue;

    // Opção selecionada atual
    const selectedOption = options.find((opt) => opt.value === currentValue);

    // Opções filtradas pela busca
    const filteredOptions = searchable
        ? options.filter(
              (opt) =>
                  opt.label.toLowerCase().includes(search.toLowerCase()) &&
                  !opt.disabled
          )
        : options.filter((opt) => !opt.disabled);

    // Fechar ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setSearch("");
                onClose?.();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            onOpen?.();
        }

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onOpen, onClose]);

    // Manipular seleção
    const handleSelect = (option: DropdownOption) => {
        if (option.disabled) return;

        if (value === undefined) {
            setInternalValue(option.value);
        }

        onChange?.(option.value, option);

        if (closeOnSelect) {
            setIsOpen(false);
            setSearch("");
            onClose?.();
        }
    };

    // Posicionamento do dropdown
    const getPositionClass = () => {
        switch (position) {
            case "right":
                return "right-0";
            case "center":
                return "left-1/2 transform -translate-x-1/2";
            default:
                return "left-0";
        }
    };

    return (
        <div ref={dropdownRef} className={`relative ${width}  ${className}`}>
            {/* Botão do Dropdown */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => {
                    if (!disabled) {
                        setIsOpen(!isOpen);
                        setSearch("");
                    }
                }}
                className={`
                    w-full px-4 py-2 ${height}
                    bg-white border border-gray-300 rounded-lg
                    flex items-center justify-between
                    transition-all duration-200
                    hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                    ${buttonClassName}
                `}
            >
                <div className="flex items-center gap-2 truncate">
                    {selectedOption?.icon && <span>{selectedOption.icon}</span>}
                    <span className="truncate">
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>

                <span
                    className={`transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                >
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className={`
                        absolute top-full mt-1 ${width} ${maxHeight}
                        bg-white rounded-lg shadow-xl border border-gray-200 
                        overflow-hidden z-50 animate-scale-in
                        ${getPositionClass()}
                        ${dropdownClassName}
                    `}
                >
                    {/* Campo de busca (se searchable) */}
                    {searchable && (
                        <div className="p-2 border-b border-gray-100">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                         focus:outline-none focus:ring-1 focus:ring-blue-500"
                                autoFocus
                            />
                        </div>
                    )}

                    {/* Lista de opções */}
                    <div className="overflow-y-auto max-h-48">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    disabled={option.disabled}
                                    onClick={() => handleSelect(option)}
                                    className={`
                                        w-full text-left px-4 py-3 
                                        transition-all duration-150
                                        flex items-center gap-3
                                        ${
                                            option.value === currentValue
                                                ? "bg-blue-50 text-blue-600 font-semibold"
                                                : "hover:bg-gray-50 text-gray-700"
                                        }
                                        ${
                                            option.disabled
                                                ? "opacity-50 cursor-not-allowed text-gray-400"
                                                : "cursor-pointer"
                                        }
                                        ${optionClassName}
                                    `}
                                >
                                    {option.icon && <span>{option.icon}</span>}
                                    <span className="flex-1 truncate">
                                        {option.label}
                                    </span>

                                    {option.value === currentValue && (
                                        <span className="text-blue-500">✓</span>
                                    )}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-center text-gray-500">
                                Nenhuma opção encontrada
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}