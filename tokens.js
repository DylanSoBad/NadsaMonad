import fs from 'fs'

export function loadTokens() {
  const tokenFile = './tokens.txt'

  const tokens = fs.readFileSync(tokenFile, 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('Bearer'))

  if (tokens.length === 0) {
    console.error('❌ Không tìm thấy token nào trong tokens.txt!')
    process.exit(1)
  }

  return tokens
}
