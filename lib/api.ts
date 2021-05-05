const API_URL = process.env.WP_API_URL as string

async function fetchAPI(query, { variables } = {}) {
  // Set up some headers to tell the fetch call
  // that this is an application/json type
  const headers = { 'Content-Type': 'application/json' }

  // build out the fetch() call using the API_URL
  // environment variable pulled in at the start
  // Note the merging of the query and variables
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  })

  // error handling work
  const json = await res.json()

  if (json.errors) {
    console.log(json.errors)
    console.log('error details', query, variables)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

// Notice the 'export' keyword here. We'll be calling this function
// directly in our blog/index.js page, so it needs to be exported
export async function getAllPosts() {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC}}) {
        edges {
          node {
            date
            title
            slug
            excerpt
          }
        }
      }
    }
    `
  )

  return data?.posts
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(
    `
    {
      posts(first: 25) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `
  )

  return data?.posts
}

export async function getAllLanguages() {
  const data = await fetchAPI(
    `
    query AllLanguages {
      languages {
        edges {
          node {
            title
            excerpt
            slug
          }
        }
      }
    }    
  `
  )

  return data?.languages
}
