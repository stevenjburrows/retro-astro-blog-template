import { z } from "astro/zod";

export const PostSchema = z.object({
    id: z.string(),
    author: z.object({
        name: z.string(),
        profilePicture: z.string(),
        }),
    publishedAt: z.string(),
    title: z.string(),
    subtitle: z.string(),
    brief: z.string(),
    slug: z.string(),
    readTimeInMinutes: z.number(),
    content: z.object({
        html: z.string(),
    }),
    tags: z.array(z.object({
        name: z.string(),
        slug: z.string(),
    })),
    coverImage: z.object({
        url: z.string(),
    }),
})

export const AllPostSchema = z.object({
    publishedAt: z.string(),
    title: z.string(),
    brief: z.string(),
    slug: z.string(),
    readTimeInMinutes: z.number(),
    tags: z.array(z.object({
        name: z.string(),
        slug: z.string(),
    })),
})

export const AllPostsDataSchema = z.object({
    id: z.string(),
    publication: z.object({
        title: z.string(),
        posts: z.object({
            pageInfo: z.object({
                hasNextPage: z.boolean(),
                endCursor: z.string(),
            }),
            edges: z.array(z.object({
                node: PostSchema,
            })),
        }),
    }),
})

export const AllPostsDataSchemaReduced = z.object({
    id: z.string(),
    publication: z.object({
        title: z.string(),
        posts: z.object({
            pageInfo: z.object({
                hasNextPage: z.boolean(),
                endCursor: z.string(),
            }),
            edges: z.array(z.object({
                node: AllPostSchema,
            })),
        }),
    }),
})

export const AllSeriesDataSchemaReduced = z.object({

    publication: z.object({
        isTeam: z.string(),
        title: z.string(),
    series: z.object({
        id: z.string(),
        title: z.string(),
        posts: z.object({
            pageInfo: z.object({
                hasNextPage: z.boolean(),
                endCursor: z.string(),
            }),
            edges: z.array(z.object({
                node: AllPostSchema,
            })),
        }),
    }),
    }),
})

export const AllSeriesListDataSchemaReduced = z.object({

    publication: z.object({
        isTeam: z.string(),
        title: z.string(),
        seriesList: z.object({
        pageInfo: z.object({
            hasNextPage: z.boolean(),
            endCursor: z.string(),
        }),
        edges: z.array(z.object({
            node: z.object({
                name: z.string(),
                slug: z.string(),
                description: z.object({
                    text: z.string(),
                })
                }),
            })),
        }),
    }),
})

export const PostDataSchema = z.object({
    id: z.string(),
    publication: z.object({
        title: z.string(),
        post: PostSchema,
    }),
})

export const TagsDataSchema = z.object({
    id: z.string(),
    publication: z.object({
        posts: z.object({
            pageInfo: z.object({
                hasNextPage: z.boolean(),
                endCursor: z.string(),
            }),
            edges: z.array(z.object({
                node: z.object({
                    title: z.string(),
                    tags: z.array(z.object({
                        name: z.string(),
                        slug: z.string(),
                    })),
                }),
            })),
        }),
    }),
})

export type Post = z.infer<typeof PostSchema>
export type AllPostsData = z.infer<typeof AllPostsDataSchema>
export type AllPostsDataReduced = z.infer<typeof AllPostsDataSchemaReduced>
export type AllSeriesDataReduced = z.infer<typeof AllSeriesDataSchemaReduced>
export type AllSeriesListDataReduced = z.infer<typeof AllSeriesListDataSchemaReduced>
export type LatestTags = z.infer<typeof TagsDataSchema>

export type PostData = z.infer<typeof PostDataSchema>