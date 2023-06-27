export enum CoinName {
    BITCOIN = 'bitcoin',
    DOCOIN = 'docoin',

}

export const BEPA = {
    baseUrl: 'http://localhost:8000',
    dataUrl: function (name: CoinName) {
        return `/api/data/${name}`
    },
    historyUrl: function (name: CoinName) {
        return `/api/data/${name}/history`
    }
}
