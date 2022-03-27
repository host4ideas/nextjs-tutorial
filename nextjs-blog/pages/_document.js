// This file will override the default Next.js Document

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    // Here I've added lang to the html tag
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}