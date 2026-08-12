(() => {
    const telegramWebApp = window.Telegram?.WebApp;
    let areTelegramControlsConfigured = false;

    const hasSameOriginReferrer = () => {
        if (!document.referrer) {
            return false;
        }

        try {
            return new URL(document.referrer).origin === window.location.origin;
        } catch {
            return false;
        }
    };

    const cleanupTelegramControls = () => {
        if (!areTelegramControlsConfigured) {
            return;
        }

        telegramWebApp.MainButton.offClick(returnToPreviousPage).hide();
        telegramWebApp.BackButton.offClick(returnToPreviousPage).hide();
        areTelegramControlsConfigured = false;
    };

    function returnToPreviousPage(event) {
        event?.preventDefault();
        cleanupTelegramControls();

        if (hasSameOriginReferrer() && window.history.length > 1) {
            window.history.back();
            return;
        }

        window.location.assign('/');
    }

    const configureTelegramControls = () => {
        if (
            areTelegramControlsConfigured ||
            !telegramWebApp?.initData ||
            !telegramWebApp.MainButton ||
            !telegramWebApp.BackButton
        ) {
            return;
        }

        telegramWebApp.MainButton.setParams({
            text: 'Close',
            is_active: true,
            is_visible: true
        }).onClick(returnToPreviousPage);
        telegramWebApp.BackButton.show().onClick(returnToPreviousPage);
        areTelegramControlsConfigured = true;
    };

    document.querySelectorAll('[data-legal-close]').forEach(link => {
        link.addEventListener('click', returnToPreviousPage);
    });

    configureTelegramControls();

    window.addEventListener('pagehide', cleanupTelegramControls);
    window.addEventListener('pageshow', event => {
        if (event.persisted) {
            configureTelegramControls();
        }
    });
})();
