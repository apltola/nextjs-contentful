import Image from 'next/image';
import Link from 'next/link';
import Heading from '../heading';

function SplitHero({ title, image, to }) {
  return (
    <Link href={to}>
      <article className="bg-white hover:bg-flow-yellow cursor-pointer">
        <div className="h-96 flex items-center justify-center p-4">
          <Heading text={title} size="7xl" />
        </div>
        <div className="relative h-96">
          <Image alt={title} src={image.url} layout="fill" objectFit="cover" />
        </div>
      </article>
    </Link>
  );
}

export default SplitHero;
