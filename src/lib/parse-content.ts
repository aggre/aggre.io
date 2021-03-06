import { load } from 'js-yaml'
import { ContentMeta, Content } from '../store/content'

const regexMarker = /`{3}(yml)?/g
const regexYaml = /^`{3}(yml)?((?!`{3})[\w|\W])*`{3}(\n+)?/

export const parseContent = (content: string): Content => {
	const [yml] = content.match(regexYaml) || ['']
	const meta = load(yml.replace(regexMarker, '')) as ContentMeta | undefined
	const body = content.replace(yml, '')
	return {
		meta,
		body,
	}
}
