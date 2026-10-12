// Visual check for agent loops: tests can't tell you if it looks good, screenshots can.
// Usage: npm run build && npm run shoot   → writes shots/*.png
// Loops should look at these (or diff them against shots/baseline/) before marking a UI task done.
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'

const PORT = 4173
const URL = `http://localhost:${PORT}`
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]
const sections = ['top', 'services', 'loop', 'cases', 'inside', 'built', 'pricing', 'principles', 'contact']

mkdirSync('shots', { recursive: true })
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' })
await new Promise((r) => setTimeout(r, 2500))

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
})

try {
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 })
    page.on('pageerror', (e) => console.error(`[${vp.name}] page error:`, e.message))
    await page.goto(URL, { waitUntil: 'networkidle' })
    await page.waitForTimeout(3500) // let the entrance choreography finish

    for (const id of sections) {
      await page.evaluate((id) => {
        const el = document.getElementById(id)
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY)
      }, id)
      await page.waitForTimeout(3200)
      await page.screenshot({ path: `shots/${vp.name}-${id}.png` })
    }
    await page.close()
  }
  console.log('Screenshots written to shots/')
} finally {
  await browser.close()
  server.kill()
}
