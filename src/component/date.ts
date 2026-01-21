import { html } from 'lit'
import { ContentMeta } from '../store/content'
import { shadow } from '@aggre/ullr'

type Props = {
	readonly created?: ContentMeta['created']
	readonly updated?: ContentMeta['updated']
}

export const date = (props: Props) =>
	props.created && props.updated
		? shadow(
				html` <style>
						span {
							font-size: 0.8rem;
							color: #666;
						}
						span::before {
							display: inline-block;
							padding: 0.1rem 0.25rem;
							border-radius: 9rem;
							background-color: #eee;
						}
						.created {
							margin-right: 0.5rem;
						}
						.created::before {
							content: '(created)';
						}
						.updated::before {
							content: '(updated)';
						}</style
					><span class="created">${props.created.toLocaleDateString()}</span
					><span class="updated">${props.updated.toLocaleDateString()}</span>`,
			)
		: undefined
