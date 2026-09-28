import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dishesFile = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  'data/dishes.json',
)

const LATENCY_MS = 700

function sendJson(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function handleDishes(req, res, next) {
  const url = new URL(req.url, 'http://localhost')

  if (url.pathname !== '/api/dishes') {
    next()
    return
  }

  const category = url.searchParams.get('c') ?? 'All'
  const shouldFail = url.searchParams.get('fail') === '1'

  const timer = setTimeout(() => {
    if (shouldFail) {
      sendJson(res, 500, { message: 'Menu service unavailable' })
      return
    }

    const dishes = JSON.parse(readFileSync(dishesFile, 'utf-8'))
    const result =
      category === 'All'
        ? dishes
        : dishes.filter((dish) => dish.category === category)

    sendJson(res, 200, result)
  }, LATENCY_MS)

  res.on('close', () => clearTimeout(timer))
}

export default function mockApi() {
  return {
    name: 'addis-eats-mock-api',
    configureServer(server) {
      server.middlewares.use(handleDishes)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleDishes)
    },
  }
}
