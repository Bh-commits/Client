import { Helmet } from 'react-helmet-async';

export function GoogleAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) return null;

  return (
    <Helmet>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </script>
    </Helmet>
  );
}







