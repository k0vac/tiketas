import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { join } from 'node:path'

const candidates = ['.output/public', 'dist/client', 'dist/public', 'dist']
const publishDir = 'dist/client'

function listDir(dir) {
  if (!existsSync(dir)) return `${dir} (missing)`
  return `${dir}: ${readdirSync(dir).join(', ') || '(empty)'}`
}

function hasFile(dir, name) {
  return existsSync(join(dir, name))
}

const outDir =
  candidates.find((dir) => hasFile(dir, 'index.html')) ??
  candidates.find((dir) => hasFile(dir, '_shell.html'))

if (!outDir) {
  console.error('Could not find prerendered HTML. Directory contents:')
  for (const dir of candidates) {
    console.error(`- ${listDir(dir)}`)
  }
  process.exit(1)
}

const indexPath = join(outDir, 'index.html')
const shellPath = join(outDir, '_shell.html')

if (!existsSync(indexPath) && existsSync(shellPath)) {
  copyFileSync(shellPath, indexPath)
}

if (!existsSync(indexPath)) {
  console.error(`Found ${outDir} but it has no index.html or _shell.html`)
  process.exit(1)
}

writeFileSync(join(outDir, '.nojekyll'), '')
copyFileSync(indexPath, join(outDir, '404.html'))

for (const cname of ['CNAME', 'public/CNAME']) {
  if (existsSync(cname)) {
    copyFileSync(cname, join(outDir, 'CNAME'))
    break
  }
}

if (outDir !== publishDir) {
  rmSync(publishDir, { recursive: true, force: true })
  mkdirSync(publishDir, { recursive: true })
  cpSync(outDir, publishDir, { recursive: true })
}

const listing = readdirSync(publishDir)
const indexSize = statSync(join(publishDir, 'index.html')).size
console.log(`Prepared GitHub Pages output in ${publishDir} (from ${outDir})`)
console.log(`index.html is ${indexSize} bytes`)
console.log(`Top-level entries: ${listing.join(', ')}`)
