import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: any){
    return twMerge(clsx(...inputs))
}

export const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('Failed to read file as Data URL'));
            }
        };

        reader.onerror = () => {
            reject(new Error('Error reading file'));
        };

        reader.readAsDataURL(file);
    });
};
