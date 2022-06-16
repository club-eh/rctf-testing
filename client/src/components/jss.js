import { Component } from 'preact'
import { create as jssCreate } from 'jss'
import jssCamelCase from 'jss-plugin-camel-case'
import jssNested from 'jss-plugin-nested'
import jssVendorPrefixer from 'jss-plugin-vendor-prefixer'
import jssGlobal from 'jss-plugin-global'

const jss = jssCreate({
  id: {
    minify: true
  }
})

jss.use(jssNested(), jssGlobal(), jssCamelCase(), jssVendorPrefixer())

export default (styles, Wrap) => {
  const sheet = jss.createStyleSheet(styles)
  let hasAttached = false
  return class withStyles extends Component {
    componentDidMount () {
      if (!hasAttached) {
        hasAttached = true
        sheet.attach()
      }
    }

    render () {
      return <Wrap {...this.props} classes={sheet.classes} />
    }
  }
}
