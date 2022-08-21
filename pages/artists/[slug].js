import Image from 'next/image';
import { userAgent } from 'next/server';
import { isMobile } from 'react-device-detect';
import HeadingHero from '../../components/hero/headingHero';
import Layout from '../../components/layout';
import useDimensions from '../../hooks/useBreakpoints';
import { getAllArtistSlugs, getArtistWithSlug } from '../../lib/contentful';

const shouldShowPortait = (breakpoints) => {
  // The initial render is done server side -> window is undefined -> all breakpoints are `false`
  // In this case, show portrait based on device
  if (Object.values(breakpoints).filter((x) => x).length === 0) {
    return !isMobile;
  }

  return !!breakpoints['2xl'];
};

// { title, description, imageLandscape, imagePortrait }
export default function ArtistPage({ artist }) {
  const breakpoints = useDimensions();

  if (!artist) {
    return null;
  }

  return (
    <Layout title={artist.title} ogImage={artist.imageLandscape.url}>
      <div className="full-height flex flex-col xl:flex-row">
        <div className="flex-1 relative">
          <Image
            alt={artist.title}
            src={
              shouldShowPortait(breakpoints)
                ? artist.imagePortrait.url
                : artist.imageLandscape.url
            }
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>
        <div className="flex-1 px-8">
          <HeadingHero text={artist.title} />
          <p className="">{artist.description}</p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  console.log('params -->', params);
  const res = (await getArtistWithSlug(params.slug)) ?? {};
  console.log('slug ----->', params.slug, ', artist res -->', res);
  return {
    props: {
      artist: res,
    },
  };
}

export async function getStaticPaths() {
  const slugs = await getAllArtistSlugs();
  console.log('PATHS --> ', slugs?.map(({ slug }) => `/artists/${slug}`) ?? []);
  return {
    paths: slugs?.map(({ slug }) => `/artists/${slug}`) ?? [],
    fallback: true,
  };
}
