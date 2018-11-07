import { html } from 'lit-html'
import { route } from '../store/route'

interface Props {
	readonly href: string
	readonly content: any
}

const handler = (url: string) => (e: Event) => {
	// tslint:disable-next-line:no-expression-statement
	e.preventDefault()
	// tslint:disable-next-line:no-expression-statement
	route.next(url)
}

export const a = (props: Props) =>
	html`<a href=${props.href} @click=${handler(props.href)}>${props.content}</a>`