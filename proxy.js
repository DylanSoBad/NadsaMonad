import fs from 'fs'

export function loadProxies() {
  const PROXIES = []
  const proxyFilePath = './proxy.txt'

  if (fs.existsSync(proxyFilePath)) {
    const raw = fs.readFileSync(proxyFilePath, 'utf8').trim()

    if (raw.length > 0) {
      raw.split('\n').forEach(line => {
        const [ip, port, user, pass] = line.trim().split(':')

        if (ip && port && user && pass) {
          PROXIES.push(`http://${user}:${pass}@${ip}:${port}`)
        }
      })
    }
  }

  return PROXIES
}
