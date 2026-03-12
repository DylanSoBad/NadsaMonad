import dotenv from 'dotenv'

dotenv.config()

export const SPIN_COUNT = parseInt(process.env.SPIN_COUNT || '5000', 10)
export const SPIN_DELAY_MS = parseInt(process.env.SPIN_DELAY_MS || '7500', 10)
