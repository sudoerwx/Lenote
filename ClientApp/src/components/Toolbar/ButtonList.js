import { ReactComponent as TitleIcon } from '../../icons/toolbar/title.svg'
import { ReactComponent as BoldIcon } from '../../icons/toolbar/bold.svg'
import { ReactComponent as ItalicIcon } from '../../icons/toolbar/italic.svg'
import { ReactComponent as QuoteIcon } from '../../icons/toolbar/quote.svg'
import { ReactComponent as CodeIcon } from '../../icons/toolbar/code.svg'
import { ReactComponent as TableIcon } from '../../icons/toolbar/table.svg'
import { ReactComponent as LinkIcon } from '../../icons/toolbar/link.svg'
import { ReactComponent as ImgIcon } from '../../icons/toolbar/img.svg'
import { ReactComponent as DividerIcon } from '../../icons/toolbar/divider.svg'
import { ReactComponent as UlIcon } from '../../icons/toolbar/ul.svg'
import { ReactComponent as OlIcon } from '../../icons/toolbar/ol.svg'

export default [
	{ Icon: TitleIcon, title: 'Heading', method: 'heading' },
    { Icon: BoldIcon, title: 'Bold', method: 'bold' },
    { Icon: ItalicIcon, title: 'Italic', method: 'italic' },
    { Icon: QuoteIcon, title: 'Blockquote', method: 'quote' },
    { Icon: CodeIcon, title: 'Code', method: 'code' },
    { Icon: TableIcon, title: 'Table', method: 'table' },
    { Icon: LinkIcon, title: 'Link', method: 'link' },
    { Icon: ImgIcon, title: 'Image', method: 'image' },
    { Icon: DividerIcon , title: 'Divider', method: 'hr'},
    { Icon: UlIcon, title: 'Unordered list', method: 'ulist' },
    { Icon: OlIcon, title: 'Ordered list', method: 'olist' },
]
