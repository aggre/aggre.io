/* eslint-disable functional/no-expression-statement, functional/no-conditional-statement, functional/no-loop-statement, functional/no-try-statement, functional/functional-parameters, functional/no-let, functional/immutable-data, no-undef */
import { Window } from 'happy-dom'
import fs from 'fs'
import path from 'path'
import http from 'http'
import { listFiles } from 'list-files-in-dir'
import markdownIt from 'markdown-it'
import hljs from 'highlight.js'
import yaml from 'js-yaml'

const PORT = 5555
const DIR = path.dirname(new URL(import.meta.url).pathname)
const YAML_REGEX = /^`{3}(yml)?((?!`{3})[\w|\W])*`{3}(\n+)?/

const md = markdownIt({
	html: true,
	linkify: true,
	highlight: (str, lang) =>
		lang && hljs.getLanguage(lang)
			? `<pre class=hljs><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
			: str,
})

const parseContent = (content) => {
	const [yml] = content.match(YAML_REGEX) || ['']
	return {
		meta: yml ? yaml.load(yml.replace(/`{3}(yml)?/g, '')) : undefined,
		body: content.replace(yml, ''),
	}
}

const createServer = () =>
	http.createServer((req, res) => {
		const url = new URL(req.url, `http://localhost:${PORT}`)
		let filePath = path.join(DIR, 'dist', url.pathname)
		if (!path.extname(filePath)) filePath = path.join(DIR, 'dist', 'index.html')

		fs.readFile(filePath, (err, data) => {
			if (err) return res.writeHead(404).end('Not Found')
			const types = {
				'.html': 'text/html',
				'.js': 'application/javascript',
				'.css': 'text/css',
				'.md': 'text/markdown',
			}
			res
				.writeHead(200, {
					'Content-Type':
						types[path.extname(filePath)] || 'application/octet-stream',
				})
				.end(data)
		})
	})

const prerender = async (pathname) => {
	console.info('render start', pathname)

	const [htmlTemplate, mdContent] = await Promise.all([
		fetch(`http://localhost:${PORT}${pathname}`).then((r) => r.text()),
		fs.promises.readFile(
			path.join(
				DIR,
				'content',
				pathname === '/' ? 'index.md' : `${pathname}.md`,
			),
			'utf-8',
		),
	])

	const { body } = parseContent(mdContent)
	const window = new Window({
		url: `http://localhost:${PORT}${pathname}`,
		settings: {
			disableJavaScriptFileLoading: false,
			disableJavaScriptEvaluation: false,
			disableCSSFileLoading: true,
		},
	})

	window.document.write(htmlTemplate)
	await Promise.race([
		window.happyDOM.waitUntilComplete(),
		new Promise((r) => setTimeout(r, 3000)),
	])

	const app = window.document.querySelector('x-app')
	if (app) {
		app.innerHTML = md.render(body)
		app.classList.add('show')
	}

	const result = `<!DOCTYPE html>${window.document.documentElement.outerHTML}`
	window.happyDOM.abort()
	console.info('render end', pathname)
	return result
}

const format = (h) => h.replace(/<!--((?!-->)[\w\W])*-->|\s+?class="show"/g, '')

;(async () => {
	const server = createServer().listen(PORT)
	console.log(`Server started on port ${PORT}`)

	const pages = (await listFiles('content'))
		.filter((f) => f.endsWith('.md'))
		.map((f) => f.replace(`${DIR}/content`, '').replace(/(\.md|index)/g, ''))

	for (const page of pages) {
		try {
			const html = await prerender(page)
			const outputPath = `dist${page}/index.html`
			fs.mkdirSync(path.dirname(outputPath), { recursive: true })
			fs.writeFileSync(outputPath, format(html))
			console.log(`Written: ${outputPath}`)
		} catch (e) {
			console.error(`Error: ${page}`, e)
		}
	}

	server.close()
	console.log('completed!')
})()
