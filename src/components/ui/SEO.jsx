import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, og = {} }) {
  const siteName = 'Tampa Pro Services'
  const fullTitle = title ? `${title} | ${siteName}` : siteName

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={og.title || fullTitle} />
      {description && <meta property="og:description" content={og.description || description} />}
      <meta property="og:type" content="website" />
      {og.image && <meta property="og:image" content={og.image} />}
      <meta name="twitter:card" content="summary" />
    </Helmet>
  )
}
