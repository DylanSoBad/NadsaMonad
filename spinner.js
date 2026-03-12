import axios from 'axios'
import fs from 'fs'
import pkg from 'https-proxy-agent'

const { HttpsProxyAgent } = pkg

export async function spinWithToken(token, index, spinIndex, proxyUrl) {

  try {

    const axiosConfig = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
        Origin: 'https://www.nadsa.space',
        Referer: 'https://www.nadsa.space/',
        'User-Agent': 'Mozilla/5.0'
      }
    }

    if (proxyUrl) {
      axiosConfig.httpsAgent = new HttpsProxyAgent(proxyUrl)
    }

    const response = await axios.post(
      'https://testnet-api-monad.dapdap.net/api/game/draw',
      { spin: 1 },
      axiosConfig
    )

    const { draw_category, draw_code, draw_amount, spin_balance } =
      response.data?.data || {}

    const now = new Date().toLocaleTimeString('vi-VN')

    const logMsg =
      `[${now}] ✅ [ACC ${index}] Spin ${spinIndex + 1}: ` +
      `Code=${draw_code}, Balance=${spin_balance}, Amount=${draw_amount}`

    console.log(logMsg)

    fs.appendFileSync('nadsa-logs.txt', logMsg + '\n')

    if (draw_code === '777') {
      fs.appendFileSync('winners.txt', logMsg + '\n')
    }

    return Number(spin_balance)

  } catch (err) {

    console.error(
      `❌ [ACC ${index}] Spin ${spinIndex + 1}:`,
      err.response?.data || err.message
    )

    return null
  }
}
