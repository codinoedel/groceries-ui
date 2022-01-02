type Config = {
  url: string
}

type EnvironmentConfigs = Record<string, Config>

export const config: EnvironmentConfigs = {
  DEFAULT: {
    url: 'wss://localhost:9133',
  },

  SAM: {
    url: 'wss://192.168.1.141:9133',
  },

  PROD: {
    url: 'wss://phaser.samnoedel.com:9133'
  },
}
