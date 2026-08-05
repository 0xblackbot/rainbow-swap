const BLOCKED_COUNTRY_CODES = new Set(['CU', 'IR', 'KP']);

const BLOCKED_PAGE = `<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Service unavailable · Rainbow Swap</title>
        <style>
            :root { color-scheme: dark; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #000; color: #f6f6f6; }
            * { box-sizing: border-box; }
            body { min-width: 320px; min-height: 100vh; margin: 0; overflow: hidden; background: radial-gradient(circle at 50% -10%, rgba(62,136,247,.32), transparent 34rem), #000; }
            main { position: relative; display: grid; min-height: 100vh; place-items: center; padding: 24px; }
            .orb { position: absolute; width: min(70vw, 520px); aspect-ratio: 1; border: 1px solid rgba(102,163,255,.25); border-radius: 50%; box-shadow: inset 0 0 90px rgba(62,136,247,.08), 0 0 120px rgba(62,136,247,.08); }
            .orb::before, .orb::after { content: ""; position: absolute; inset: 15%; border: 1px solid rgba(255,255,255,.08); border-radius: 50%; }
            .orb::after { inset: 31%; background: rgba(62,136,247,.16); box-shadow: 0 0 80px rgba(62,136,247,.28); }
            .card { position: relative; z-index: 1; width: min(100%, 520px); padding: clamp(28px, 6vw, 48px); border: 1px solid rgba(255,255,255,.12); border-radius: 28px; background: rgba(15,15,15,.88); box-shadow: 0 30px 100px rgba(0,0,0,.55); backdrop-filter: blur(18px); text-align: center; }
            .code { display: inline-flex; padding: 7px 11px; border-radius: 999px; color: #66a3ff; background: rgba(62,136,247,.18); font-size: 12px; font-weight: 600; letter-spacing: .08em; }
            h1 { margin: 20px 0 12px; font-size: clamp(30px, 8vw, 46px); line-height: 1.05; letter-spacing: -.04em; }
            p { margin: 0 auto; color: #aaaab0; font-size: 15px; line-height: 1.6; }
            nav { display: flex; justify-content: center; gap: 18px; margin-top: 28px; }
            a { color: #dbe9ff; font-size: 13px; text-underline-offset: 3px; }
        </style>
    </head>
    <body>
        <main>
            <div class="orb" aria-hidden="true"></div>
            <section class="card">
                <span class="code">HTTP 451</span>
                <h1>Service unavailable in your region</h1>
                <p>
                    Rainbow Swap does not offer or support access to this interface
                    from restricted jurisdictions. Public blockchains and independent
                    smart contracts operate separately from this website.
                </p>
                <nav aria-label="Legal information">
                    <a href="/terms.html">Terms of Use</a>
                    <a href="/privacy.html">Privacy Policy</a>
                </nav>
            </section>
        </main>
    </body>
</html>`;

export default function geoBlock(request, context) {
    const countryCode = context.geo?.country?.code?.toUpperCase();

    if (!countryCode || !BLOCKED_COUNTRY_CODES.has(countryCode)) {
        return;
    }

    return new Response(request.method === 'HEAD' ? null : BLOCKED_PAGE, {
        status: 451,
        statusText: 'Unavailable For Legal Reasons',
        headers: {
            'cache-control': 'private, no-store',
            'content-type': 'text/html; charset=utf-8',
            'x-robots-tag': 'noindex, nofollow'
        }
    });
}

export const config = {
    path: '/*',
    excludedPath: ['/terms.html', '/privacy.html', '/legal.css', '/fonts/*'],
    method: ['GET', 'HEAD']
};
