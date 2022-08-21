import Head from 'next/head';
import { HOME_OG_IMAGE_URL } from '../lib/constants';

export default function Meta({ title, ogImage }) {
  return (
    <Head>
      <title>{title ? `${title} | Wolf Festival` : `Wolf Festival`}</title>
      <meta name="description" content="wolf festival" />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:image" content={ogImage || HOME_OG_IMAGE_URL} />
    </Head>
  );
}
