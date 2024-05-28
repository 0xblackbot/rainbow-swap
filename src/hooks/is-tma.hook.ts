export const useIsTMA = () => {
    return window.Telegram.WebApp.platform !== 'unknown';
};
