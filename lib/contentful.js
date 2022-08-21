const ARTIST_GRAPHQL_FIELDS = `
title
slug
imagePortrait {
  url
}
imageLandscape {
  url
}
description
isHeadliner
`;

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((res) => res.json());
}

function extractArtistEntries(fetchResponse) {
  return fetchResponse?.data?.artistCollection?.items;
}

function extractSingleArtistEntry(fetchResponse) {
  return fetchResponse?.data?.artistCollection?.items?.[0];
}

export async function getArtistsForHome() {
  const res = await fetchGraphQL(
    `query {
      artistCollection(order:isHeadliner_DESC) {
        items {
          ${ARTIST_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return extractArtistEntries(res);
}

export async function getAllArtists() {
  const res = await fetchGraphQL(
    `query {
      artistCollection {
        items {
          ${ARTIST_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return extractArtistEntries(res);
}

export async function getAllArtistSlugs() {
  const res = await fetchGraphQL(
    `query {
      artistCollection {
        items {
          slug
        }
      }
    }`
  );
  return extractArtistEntries(res);
}

export async function getArtistWithSlug(slug) {
  const res = await fetchGraphQL(
    `query {
      artistCollection(where: { slug: "${slug}" }) {
        items {
          ${ARTIST_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return extractSingleArtistEntry(res);
}
