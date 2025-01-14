import { gql, GraphQLClient } from "graphql-request";
import type { AllPostsData, PostData, AllPostsDataReduced, AllSeriesDataReduced, LatestTags, AllSeriesListDataReduced } from "./schema";
import {HASHNODE_PUBLICATION} from '../config'

export const getClient = () => {
  return new GraphQLClient("https://gql.hashnode.com")
}

const myHashnodeURL = `${HASHNODE_PUBLICATION}.hashnode.dev`;

export const getAllPosts = async () => {
  const client = getClient();

  const allPosts = await client.request<AllPostsData>(
    gql`
      query allPosts {
        publication(host: "${myHashnodeURL}") {
          id
          title
          posts(first: 20) {
            pageInfo{
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                author{
                  name
                  profilePicture
                }
                title
                subtitle
                brief
                slug
                coverImage {
                  url
                }
                tags {
                  name
                  slug
                }
                publishedAt
                readTimeInMinutes
              }
            }
          }
        }
      }
    `
  );

  return allPosts;
};

export const getAllPostsReduced = async (totalPosts: number) => {
  const client = getClient();

  const allPosts = await client.request<AllPostsDataReduced>(
    gql`
      query allPosts {
        publication(host: "${myHashnodeURL}") {
          id
          title
          posts(first: ${totalPosts}) {
            pageInfo{
              hasNextPage
              endCursor
            }
            edges {
              node {
                title
                brief
                slug
                tags {
                  name
                  slug
                }
                publishedAt
                readTimeInMinutes
              }
            }
          }
        }
      }
    `
  );

  return allPosts;
};


export const getPost = async (slug: string) => {
  const client = getClient();

  const data = await client.request<PostData>(
    gql`
      query postDetails($slug: String!) {
        publication(host: "${myHashnodeURL}") {
          id
          post(slug: $slug) {
            id
            author{
              name
              profilePicture
            }
            publishedAt
            title
            subtitle
            readTimeInMinutes
            content{
              html
            }
            tags {
              name
              slug
            }
            coverImage {
              url
            }
          }
        }
      }
    `,
    { slug: slug }
  );

  return data.publication.post;
};

export const getPostSeries = async (limit: number, series?: string) => {
  const client = getClient();

  const allPosts = await client.request<AllSeriesDataReduced>(
    gql`
query Publication {
    publication(host: "${myHashnodeURL}") {
        isTeam
        title
        series(slug: "${series}") {
            id
            posts(first: ${limit}) {
            pageInfo{
              hasNextPage
              endCursor
            }
                edges {
                    node {
                        title
                brief
                slug
                tags {
                  name
                  slug
                }
                publishedAt
                readTimeInMinutes
                    }
                }
            }
        }
    }
}
    `,
  );
  return allPosts;
}

export const getLatestTags = async () => {
  const client = getClient();

  const getTags = await client.request<LatestTags>(
    gql`
    query GetUserPublication {
    publication(host: "${myHashnodeURL}") {
    id
    posts(first: 30) {
       edges {
        node{
          title
          tags{
            name
            slug
          }
        }
      }
    }
  }
}`
  )
  return getTags;
}

export const getPostsByTag = async (tag: string, first: number, after: string = "", before: string = "") => {

  console.log('after', after);
  
  const client = getClient();
  const getPostsByTag = await client.request<AllPostsDataReduced>(
    gql`
      query TagPostsByPublication{
        publication(host: "${myHashnodeURL}") {
        id
        title
        posts(first: ${first}, filter: { tagSlugs: "${tag}" }, after: "${after}") {
          pageInfo{
            hasNextPage
            endCursor
          }
          edges {
            node {
              title
              brief
              slug
              tags {
                name
                slug
              }
              publishedAt
              readTimeInMinutes
            }
          }
        }
      }
  }`
)

  return getPostsByTag;
}

export const getAllSeries = async () => {
  const client = getClient();

  const allSeries = await client.request<AllSeriesListDataReduced>(
    gql`
        query allSeries {
            publication(host: "${myHashnodeURL}") {
                id
                title
                seriesList(first: 20) {
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                    edges {
                        cursor
                        node {
                            name
                            description {
                                text
                            }
                        slug
                        }
                    }
                }
            }
        }
    `,
  );

  return allSeries;
}

export const getSeries = async (slug: string) => {
  const client = getClient();
  const allSeries = await client.request<AllSeriesDataReduced>(
    gql`
    query allSeriesReduced {
        publication(host: "${myHashnodeURL}") {
            series(slug: "${slug}") {
                posts(first: 20, after: "") {
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                edges {
                    cursor
                    node {
                        slug
                        title
                        tags {
                            name
                            slug
                        }
                        brief
                        }
                    }
                }
            }
        }
    }`
  );

  return allSeries;
}