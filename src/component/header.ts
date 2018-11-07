import { html } from 'lit-html'
import { nav } from './nav'
import { navs } from '../store/navs'
import { subscribe, component } from 'ullr/directive'
import { a } from './a'

export const header = () =>
	component(html`
<style>
	header {
		display: grid;
		grid-template-areas: 'brand nav';
		grid-template-columns: 1fr auto;
		align-items: center;
	}
	.brand {
		grid-area: brand;
		& a {
			color: blue;
			text-decoration: none;
			font-weight: 700;
		}
	}
	.nav {
		grid-area: nav;
	}
</style>
<header>
	<div class=brand>
		${a({ href: '/', content: 'aggre.io' })}
	</div>
	<div class=nav>
		${subscribe(navs, x => nav(x))}
	</div>
</header>
`)