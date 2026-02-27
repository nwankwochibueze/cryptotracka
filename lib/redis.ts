import { Redis } from "@upstash/redis"

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Get cached data with type safety
export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const cached = await redis.get<T>(key)
    return cached
  } catch (error) {
    console.error("Redis get error:", error)
    return null
  }
}

// Set cached data with TTL
export async function setCached<T>(
  key: string,
  data: T,
  ttl: number = 60
): Promise<void> {
  try {
    await redis.setex(key, ttl, JSON.stringify(data))
  } catch (error) {
    console.error("Redis set error:", error)
  }
}

// Delete cached data
export async function deleteCached(key: string): Promise<void> {
  try {
    await redis.del(key)
  } catch (error) {
    console.error("Redis delete error:", error)
  }
}