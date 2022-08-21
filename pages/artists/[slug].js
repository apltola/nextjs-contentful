import Image from 'next/image';
import HeadingHero from '../../components/hero/headingHero';
import Layout from '../../components/layout';
import { getAllArtistSlugs, getArtistWithSlug } from '../../lib/contentful';

export default function ArtistPage({
  artist: { title, description, imageLandscape, imagePortrait },
}) {
  return (
    <Layout title={title} ogImage={imageLandscape.url}>
      <div className="full-height flex flex-col xl:flex-row">
        <div className="flex-1 relative">
          <Image
            alt={title}
            src={imagePortrait.url}
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>
        <div className="flex-1">
          <HeadingHero text={title} />
          <p className="p-8">{description}</p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const res = (await getArtistWithSlug(params.slug)) ?? null;
  return {
    props: {
      artist: res,
    },
  };
}

export async function getStaticPaths() {
  const slugs = await getAllArtistSlugs();
  return {
    paths: slugs?.map(({ slug }) => `/artists/${slug}`) ?? [],
    fallback: true,
  };
}
