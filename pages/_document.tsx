// _document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta name="description" content="Herramientas avanzadas para optimizar tus decisiones financieras. Simuladores de préstamos, ahorros, inversiones y más." />
        <meta property="og:title" content="Simuladores Financieros" />
        <meta property="og:description" content="Optimiza tus finanzas con nuestros simuladores avanzados." />
        <meta property="og:image" content="/logo.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
