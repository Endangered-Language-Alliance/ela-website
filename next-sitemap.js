// The top-level (e.g. /latest) will not have a trailing slash
const isBlogPost = (path) => path.includes('/latest/')
const isHomePage = (path) => path === '/'
const isProjectPage = (path) => path.includes('/projects/')
const isLanguagePage = (path) => path.includes('/languages/')
const isTopLevelPage = (path) => path.split('/').length === 2

const isBlogLanding = (path) => path === '/latest'
const isProjectsLanding = (path) => path === '/projects'
const isLangsLanding = (path) => path === '/languages'

const getBlogPostYear = (path) => parseInt(path.split('/')[2], 10)

// internal sitemap only seen in local and dev anyway
const BLACKLISTED_PATHS = ['/sitemap']

function isPostWithinPastYear(postYear) {
  const thisYear = new Date().getFullYear()

  return thisYear - postYear <= 1
}

function isPostOverFiveYearsOld(postYear) {
  const thisYear = new Date().getFullYear()

  return thisYear - postYear >= 5
}

function getBlogPostPriorityAndChangeFreq(path) {
  const blogPostYear = getBlogPostYear(path)

  let priority = 0.4
  let changefreq = 'never'

  if (isPostOverFiveYearsOld(blogPostYear)) {
    priority = 0.2
  } else if (isPostWithinPastYear(blogPostYear)) {
    priority = 0.6
    changefreq = 'monthly'
  }

  return { priority, changefreq }
}

const defaultFreqAndPriority = {
  changefreq: 'monthly',
  priority: 0.6,
}

const settings = {
  siteUrl: process.env.SITE_URL || 'https://www.elalliance.org',
  generateRobotsTxt: true,
  exclude: BLACKLISTED_PATHS,
}

module.exports = {
  ...settings,
  transform: async (config, path) => {
    if (BLACKLISTED_PATHS.includes(path)) return null

    let { priority, changefreq } = defaultFreqAndPriority

    if (isProjectsLanding(path) || isLangsLanding(path)) {
      priority = 0.9
      changefreq = 'daily'
    } else if (isProjectPage(path) || isLanguagePage(path)) {
      priority = 0.7
      changefreq = 'monthly'
    } else if (isBlogPost(path)) {
      const priorityAndChangeFreq = getBlogPostPriorityAndChangeFreq(path)

      priority = priorityAndChangeFreq.priority
      changefreq = priorityAndChangeFreq.changefreq
    } else if (isHomePage(path)) {
      priority = 1
    } else if (isBlogLanding(path)) {
      priority = 0.8
      changefreq = 'daily'
    } else if (isTopLevelPage(path)) {
      priority = 0.8
      changefreq = 'daily'
    }

    return {
      loc: path, // will be exported as http(s)://<config.siteUrl>/<path>
      changefreq,
      priority,
      lastmod: undefined,
      alternateRefs: [],
      // alternateRefs: config.alternateRefs ?? [], // original breaks things
    }
  },
}
