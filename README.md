# Rainbow Swap 🌈

![main banner.png](docs%2Fassets%2Fmain%20banner.png)

### Problem

TON DEXes have fragmented liquidity, each with its own set of liquid tokens. As the TON ecosystem grows, this uneven distribution worsens, leading to inefficient trades and arbitrage opportunities. Users often lose money due to the high price impact when swapping tokens on a single DEX.

### Solution

Rainbow Swap aggregates liquidity from multiple TON DEXes, distributing trade volume across optimal routes to minimize price impact and slippage. This ensures users get the best possible prices in a single transaction.

### Examples

![not example.png](docs%2Fassets%2Fnot%20example.png)
![usdt example.png](docs%2Fassets%2Fusdt%20example.png)

### Results

Our user-friendly interface allows seamless swaps with the most efficient routes, considering swap distribution and gas costs.

# Getting Started

1. Clone repository
```
git clone https://github.com/0xblackbot/rainbow-swap.git && cd rainbow-swap
```

2. Install dependencies
```
yarn
```

3. Start the development server
```
yarn start
```

[Instruction on how to run development application as TMA](docs%2FTMA-development.md)

If you want to contribute your code, before making a pull request - ensure, that code passes all pipeline checks. You can manually check it before a pull request running commands
```
yarn ts
yarn lint
```

### License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
