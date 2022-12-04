export { };

declare global {
    interface Window {
        electronAPI: {
            init: () => void;
            settings: (event: any) => void
            system: (event: any) => void
            toggleDownload: (event: any, name: any) => void
        }
    }
}