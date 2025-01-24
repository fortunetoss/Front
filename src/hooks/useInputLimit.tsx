import { useState } from "react";



interface UseInputWithLimitReturn {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const useInputLimit = (maxLength: number): UseInputWithLimitReturn => {
    const [value, setValue] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        if (inputText.length <= maxLength) {
            setValue(inputText);
        }
    };

    return { value, onChange };
};
