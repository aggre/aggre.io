import { expect } from '@esm-bundle/chai'
import { date } from './date'
import { render } from 'lit'

describe('date', () => {
	it('Returns template for showing created and updated dates', () => {
		render(
			date({
				created: new Date('2023-01-01'),
				updated: new Date('2023-01-02'),
			}),
			document.body,
		)
		const el = (document.body.querySelector('ullr-shdw') as HTMLElement)
			.shadowRoot as ShadowRoot
		expect(el.querySelector('span.created')?.textContent).to.be.equal(
			'1/1/2023',
		)
		expect(el.querySelector('span.updated')?.textContent).to.be.equal(
			'1/2/2023',
		)
	})
})
