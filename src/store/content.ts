import { BehaviorSubject } from 'rxjs'

export type ContentMeta = {
	readonly title?: string
	readonly image?: string
	readonly description?: string
	readonly created?: Date
	readonly updated?: Date
}
export type Content = { readonly meta?: ContentMeta; readonly body: string }

export const content = new BehaviorSubject<Content>({ body: '' })
