import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import { Children } from 'react'

class CustomDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* Set Page Title */}

          {/* Set Favicon (Logo) */}
          <link rel="icon" href="/images/indexlogo.png" />

          {/* Preconnect to Google Fonts */}
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin="anonymous" />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// Handle Emotion Styles for SSR
CustomDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage

  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => <App {...props} emotionCache={cache} />
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)

  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
    />
  ))

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
  }
}

export default CustomDocument
