const writeFile = require('write')
const micro = require('micro')
const handler = require('serve-handler')
const puppeteer = require('puppeteer')
const { listFiles } = require('list-files-in-dir')
const port = 5000
const format = h => (typeof h === 'string' ? h.replace(/<\!---->/g, '') : h)
const write = async (path, content) => writeFile.promise(path, content)
const getHTML = browser => async pathname =>
	browser
		.newPage()
		.then(async page =>
			Promise.all([
				Promise.resolve(page),
				page.goto(`http://localhost:${port}${pathname}`, {
					waitUntil: 'networkidle0'
				}),
				page.waitForSelector('x-app > *')
			])
		)
		.then(async ([page]) => {
			const html = await page.content()
			await page.close()
			return html
		})
;(async () => {
	const serve = await micro((req, res) =>
		handler(req, res, { public: 'dist' })
	).listen(port)
	const pages = await listFiles('content').then(fls =>
		fls
			.filter(f => f.endsWith('.md'))
			.map(f => f.replace(`${__dirname}/content`, '').replace('.md', ''))
	)
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	})
	const ssr = getHTML(browser)
	const htmls = await Promise.all(pages.map(page => ssr(page)))
	await browser.close()
	await Promise.all(
		pages.map((page, i) => write(`dist${page}.html`, format(htmls[i])))
	)
	serve.close()
	console.log('completed!!!')
})()
