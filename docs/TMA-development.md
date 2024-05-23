# How to run development application as TMA (inside Telegram Bot)

### 0. Enable https
Install [vite-plugin-mkcert](https://www.npmjs.com/package/vite-plugin-mkcert).

### 1. Start the application
 `yarn start`  

### 2. Install the root CA
You will see `The list of generated files` in the Terminal.
Go to the `.vite-plugin-mkcert` folder and install `rootCA.pem` to your mobile device.

On iOS, you can either use AirDrop, email the CA to yourself, or serve it from an HTTP server. After opening it, you need to [install the profile in Settings > Profile Downloaded](https://github.com/FiloSottile/mkcert/issues/233#issuecomment-690110809) and then [enable full trust in it](https://support.apple.com/en-nz/HT204477).

For Android, you will have to install the CA and then enable user roots in the development build of your app. See [this StackOverflow answer](https://stackoverflow.com/a/22040887/749014).

### 3. Open the TMA
Send message to the [@rainbow_swap_bot](https://t.me/rainbow_swap_bot)
`/dev your_app_network_url`

`your_app_network_url` - could be found in Terminal
