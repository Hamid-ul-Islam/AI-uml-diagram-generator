declare global {
    interface Window {
        plantumlEncoder: {
            encode: (str: string) => string;
        }; 
    }
}

export {};
