import { getArtistsForHome } from '../lib/contentful';
import Layout from '../components/layout';
import HeadingHero from '../components/hero/headingHero';
import SplitHero from '../components/hero/splitHero';

export default function Home({ artists }) {
  return (
    <Layout>
      <HeadingHero text="PROGRAM PICKS" />
      <section className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6 border-t-2 border-flow-yellow">
        {artists.map(({ slug, title, imageLandscape }) => {
          return (
            <SplitHero
              key={slug}
              title={title}
              image={imageLandscape}
              to={`/artists/${slug}`}
            />
          );
        })}
      </section>
    </Layout>
  );
}

export async function getStaticProps(hmm) {
  const artists = (await getArtistsForHome()) ?? [];

  return {
    props: { artists },
  };
}
