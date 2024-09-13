import { KeyboardEventHandler } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormTextareaProps {
    id: string;
    label?: string;
    placeholder?:string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>
    className?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement | undefined>;
    defaultValue?: string;
}

export const FormTextarea = ({
    id,
    label,
    placeholder,
    required,
    disabled,
    errors,
    className,
    onBlur,
    onClick,
    onKeyDown,
    defaultValue
}: FormTextareaProps) => {

    console.log(errors);

    return (
        <div className="space-y-3 w-full">
            <div className="space-y-1 w-full">
                {
                    label ? (
                        <Label
                        htmlFor={id}
                        className="text-xs font-semibold text-neutral-700"
                        >
                            {label}
                        </Label>
                    ) : null
                }
                <Textarea 
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    onClick={onClick}
                    required={required}
                    placeholder={placeholder}
                    name={id}
                    id={id}
                    disabled={disabled}
                    className={cn("resize-none outline-none shadow-sm bg-[#282828]", className)}
                    aria-describedby={`${id}-error`}
                    defaultValue={defaultValue}
                />
            </div>
        </div>
    )
}
