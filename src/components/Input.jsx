import React, { useId } from "react";

const Input = React.forwardRef(function Input(
    { label, type = "text", className = "", className2="", ...props },
    ref
) {
    const id = useId();
    return (
        <div className={`w-full ${className2}`}>
            {label && (
                <label className="inline-block mb-1 pl-1" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`py-1  text-zinc-900  focus:outline-none duration-200  focus:border-blue-400 border-b-2 border-gray-300 w-full focus:placeholder-transparent  placeholder-opacity-50 placeholder:text-sm ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});

export default Input;