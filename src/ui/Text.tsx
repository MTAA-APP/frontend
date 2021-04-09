import { createText } from '@shopify/restyle'
import { Theme } from 'styles/theme'

const Text = createText<Theme>()

Text.defaultProps = {
  variant: 'body',
}

export default Text
