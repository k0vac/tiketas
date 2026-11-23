import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { join } from 'node:path'

const candidates = ['.output/public', 'dist/client', 'dist/public', 'dist']
const publishDir = 'dist/client'

function hasIndex(dir) {
  return existsSync(join(dir, 'index.html'))
}

const outDir = candidates.find(hasIndex)

if (!outDir) {
  console.error(
    'Could not find a static index.html. Looked in:',
    candidates.join(', '),
  )
  process.exit(1)
}

writeFileSync(join(outDir, '.nojekyll'), '')
copyFileSync(join(outDir, 'index.html'), join(outDir, '404.html'))

if (outDir !== publishDir) {
  rmSync(publishDir, { recursive: true, force: true })
  mkdirSync(publishDir, { recursive: true })
  cpSync(outDir, publishDir, { recursive: true })
}

const listing = readdirSync(publishDir)
console.log(`Prepared GitHub Pages output in ${publishDir} (from ${outDir})`)
console.log(`Top-level entries: ${listing.slice(0, 20).join(', ')}`)
