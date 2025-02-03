export type Stats = {
  cpu: {
    percent: number
    cores: number
    frequency: number
  },
  memory: {
    total: number
    available: number
    percent: number
  },
  disk: {
    total: number
    used: number
    free : number
    percent: number
  },
  network: {
    bytes_sent : number
    bytes_recv: number
  }
}