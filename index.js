import { loadProxies } from './proxy.js'
import { loadTokens } from './tokens.js'
import { SPIN_COUNT, SPIN_DELAY_MS } from './config.js'
import { spinWithToken } from './spinner.js'

const PROXIES = loadProxies()
const TOKENS = loadTokens()

async function runForAccount(token, index, proxyUrl) {

  for (let i = 0; i < SPIN_COUNT; i++) {

    const balance = await spinWithToken(token, index, i, proxyUrl)

    if (balance === 1) {
      console.log(`⚠️ [ACC ${index}] Dừng spin do spin_balance = 1`)
      break
    }

    await new Promise(res => setTimeout(res, SPIN_DELAY_MS))
  }
}

async function runAllAccounts() {

  const tasks = TOKENS.map((token, idx) => {

    const proxy = PROXIES.length > idx ? PROXIES[idx] : null

    const delayStart = 100 + Math.floor(Math.random() * 1500)

    return new Promise(resolve => {

      setTimeout(() => {
        runForAccount(token, idx + 1, proxy).then(resolve)
      }, delayStart * idx)

    })
  })

  await Promise.all(tasks)

  console.log('🎉 Tất cả tài khoản đã quay xong!')
}

runAllAccounts()
