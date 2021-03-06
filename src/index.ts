/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-expression-statement */
import { render, html } from 'lit-html'
import { xApp } from './element/x-app'
import { XEmbed } from './element/x-embed'
import { content } from './store/content'
import { route } from './store/route'
import { base } from './manager/base'
import { skip } from 'rxjs/operators'
import { markedHTML } from './lib/marked-html'
const { customElements } = window
const APP = 'x-app'
const EMBED = 'x-embed'
const RENDERED = Boolean(document.querySelector(`${APP} > *`))
const ROOT = document.querySelector(APP)
customElements.define(APP, xApp)
customElements.define(EMBED, XEmbed)
customElements
	.whenDefined(APP)
	.then(() => {
		;(document.querySelector(APP) as Element).classList.add('show')
	})
	.catch((err) => {
		console.warn(err)
	})

base(route, content)

content.pipe(skip(RENDERED ? 2 : 0)).subscribe((x) => {
	render(html` ${markedHTML(x ? x.body : '')} `, ROOT || document.body)
})
