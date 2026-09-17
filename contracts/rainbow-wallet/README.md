# Rainbow Wallet

The [Rainbow Wallet](contract.fc) helps a user swap across different DEXes. It starts the first part of a swap, then uses the received tokens to continue the route.

## Which wallet is which?

- **Owner wallet:** the user's wallet, which authorizes transactions.
- **Rainbow Wallet:** the routing contract belonging to that owner.
- **Jetton wallet:** a separate contract holding one type of token for an address. The Rainbow Wallet has its own jetton wallet for each token it holds.

## How requests are authorized

### Direct requests from the owner

For a swap starting with TON, the owner sends a request directly to the Rainbow Wallet. The contract checks that the **actual message sender** matches its stored owner address. TON supplies this sender address; putting the owner's address inside the message body is not enough.

The same owner check protects requests to withdraw TON or jettons.

### Requests arriving with jettons

A jetton transfer takes an indirect path:

```text
Owner wallet → owner's jetton wallet → Rainbow Wallet's jetton wallet → Rainbow Wallet
```

The last message is a notification containing the original token sender and the swap instructions. Before accepting those instructions, the Rainbow Wallet requires both:

1. The notification identifies the owner as the original token sender.
2. A valid signature from the Rainbow authority links this Rainbow Wallet to the jetton wallet that actually sent the notification.

The Rainbow authority is the trusted signer that certifies wallet connections. It resolves the token's jetton wallet for the Rainbow Wallet and signs the two addresses. The contract [verifies this signature](utils/jetton_wallet_signature.utils.fc) using the authority's public key built into the contract. A signature for another Rainbow Wallet or another sending contract does not pass this check.

**The signature confirms the wallet connection, not the swap instructions.** The owner's transfer carries the instructions. The verified jetton wallet makes its report of that transfer trustworthy.

### Continuing the swap

An authorized request saves the next action. To [trigger that action](handlers/jetton_transfer_notification.fc), an incoming notification must match all three saved values:

- The Rainbow Wallet's expected jetton wallet, checked against the actual message sender.
- The expected token sender, such as a DEX contract, reported in the notification.
- The swap's query ID, which identifies the request.

The contract sends the saved action and removes it from storage. An authorized request using the same three values can replace a pending action.

## What this relies on

These checks rely on the Rainbow authority signing the correct wallet connections, keeping its signing key private, and the accepted jetton contracts correctly validating transfers and reporting their senders. A wallet signature alone does not prove that a jetton's implementation is safe.
