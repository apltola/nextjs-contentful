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

export default function ArtistPage({
  artist: { title, description, imageLandscape, imagePortrait },
}) {
  const breakpoints = useDimensions();

  return (
    <Layout title={title} ogImage={imageLandscape.url}>
      <div className="full-height flex flex-col xl:flex-row">
        <div className="flex-1 relative">
          <Image
            alt={title}
            src={
              shouldShowPortait(breakpoints)
                ? imagePortrait.url
                : imageLandscape.url
            }
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>
        <div className="flex-1 px-8">
          <HeadingHero text={title} />
          <p className="">{description}</p>
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
