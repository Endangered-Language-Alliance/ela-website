This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Usage

### Development

1. Run the development server: `yarn dev`
2. Open [http://localhost:3000](http://localhost:3000) with your browser to see
   the result.
3. You can start editing the page by modifying `pages/index.js`. The page
   auto-updates as you edit the file.
4. [API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed
   on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This
   endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are
treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead
of React pages.

### Generate TS from WP GQL

[Yusssss GraphQL/WP/TS Codegen magic](https://dev.to/shnydercom/the-headless-seo-middleman-or-wordpress-graphql-schema-org-and-typescript-combined-16gj)

```bash
npm run create-wp-gql-ts
```

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Setup Notes

### Content site

[https://content.endangeredlanguagealliance.org/](https://content.endangeredlanguagealliance.org/)

### HTTPS

Followed [this](https://lightsail.aws.amazon.com/ls/docs/en_us/articles/amazon-lightsail-enabling-https-on-wordpress) to enable it after pointing an `A` DNS record to AWS Lightsail instance IP address (MUST BE **STATIC** IP) [in GoDaddy](https://dcc.godaddy.com/manage/ENDANGEREDLANGUAGEALLIANCE.ORG/dns?plid=1) with `content` as the host (followed [this](https://www.godaddy.com/help/create-a-subdomain-4080)).

Not sure if it was needed, probably not since never had to change GoDaddy nameservers, but did add [a DNS zone](https://lightsail.aws.amazon.com/ls/webapp/domains/content-endangeredlanguagealliance-org) in LightSail:

- `ns-2029.awsdns-61.co.uk`
- `ns-557.awsdns-05.net`
- `ns-155.awsdns-19.com`
- `ns-1362.awsdns-42.org`

GoDaddy's nameservers for endangeredlanguagealliance.org:

- `ns07.domaincontrol.com`
- `ns08.domaincontrol.com`

Backup files from `bncert` output:

- _/opt/bitnami/apache2/conf/httpd.conf.back.202104292004_
- _/opt/bitnami/apache2/conf/bitnami/bitnami-apps-prefix.conf.back.202104292004_
- _/opt/bitnami/apache2/conf/bitnami/bitnami.conf.back.202104292004_

**bncert makes automatic renewals 👏**

### SSH

Followed [this](https://lightsail.aws.amazon.com/ls/docs/en_us/articles/amazon-lightsail-ssh-using-terminal) using default key.

#### Permissions

Waaaaay too much trouble but followed [this](https://linuxize.com/post/chmod-recursive/) for media perms.

### Email

Followed [this tutorial](https://www.wpbeginner.com/plugins/how-to-send-email-in-wordpress-using-the-gmail-smtp-server/) to set up OAuth.

Client ID (from Gmail API): `256431451400-0jdqi29q1es4d7lelci9r8hdm8qn2o99.apps.googleusercontent.com`

Client secret: `ZSiwBfchD-XSBRDGTeAZDFJx`

## TODOs (rm later)

Larger restructurings:

```
> Products (formerly Store)
> Public Programs (formerly Outreach)
> Support Our Work (formerly Donate)
>> Introduction (formerly So What?)
>> Language and Song (formerly Song)
>> Language Documentation (formerly Documentation)
>> Linguistics (formerly Science)
>> Publications (formerly under Documentation)
>> Talks (formerly ELA in the Classroom)
>> Team (formerly Staff)
>> Tours (formerly ELA Tours)
Get Involved (formerly Support)
Latest (formerly News & Events)
Our Work (formerly Programs)
```

(Move Yugacure and Garifuna Nursery Rhymes to be tabs under Garifuna?)

### URLs to replace

```
https://elalliance.org/" target="
https://elalliance.org/">
https://elalliance.org/2012/projects/circassian
https://elalliance.org/2012/projects/languages
https://elalliance.org/2012/projects/meso
https://elalliance.org/2013/01/rebirth
https://elalliance.org/2013/03/breton
https://elalliance.org/2014/07/this
https://elalliance.org/2015/05/two
https://elalliance.org/2015/10/bering
https://elalliance.org/2015/10/ela
https://elalliance.org/2016/06/hawaiian
https://elalliance.org/2017/03/conozca
https://elalliance.org/how/
https://elalliance.org/koda/" target
https://elalliance.org/kratylos/" target
https://elalliance.org/languages-2/languages
https://elalliance.org/languages-2/meso
https://elalliance.org/languages/
https://elalliance.org/languages/caribbean/garifuna
https://elalliance.org/languages/celtic/breton
https://elalliance.org/languages/celtic/irish
https://elalliance.org/languages/central-asia
https://elalliance.org/languages/circassian/">
https://elalliance.org/languages/himalaya/">
https://elalliance.org/languages/himalaya/gurung
https://elalliance.org/languages/himalaya/loke
https://elalliance.org/languages/himalaya/seke
https://elalliance.org/languages/himalayas/">
https://elalliance.org/languages/himalayas/"><
https://elalliance.org/languages/himalayas/gurung
https://elalliance.org/languages/ikota/">
https://elalliance.org/languages/ikota/"><
https://elalliance.org/languages/italian/neapolitan
https://elalliance.org/languages/italian/sicilian
https://elalliance.org/languages/languages-of
https://elalliance.org/languages/meso-america
https://elalliance.org/languages/meso-american
https://elalliance.org/languages/other/tsou
https://elalliance.org/languages/tsou/">
https://elalliance.org/programs/artsandculture/">
https://elalliance.org/programs/culture/"><
https://elalliance.org/programs/documentation/">
https://elalliance.org/programs/documentation/"><
https://elalliance.org/programs/documentation/#
https://elalliance.org/programs/interpretation/">
https://elalliance.org/programs/interpretation/"><
https://elalliance.org/programs/kratylos/">
https://elalliance.org/programs/maps/"
https://elalliance.org/programs/maps/">
https://elalliance.org/programs/maps/"><
https://elalliance.org/programs/outreach/">
https://elalliance.org/programs/outreach/"><
https://elalliance.org/programs/outreach/mother
https://elalliance.org/programs/outreach/radio
https://elalliance.org/programs/policy/">
https://elalliance.org/programs/policy/"><
https://elalliance.org/programs/policy/#
https://elalliance.org/programs/policy/language
https://elalliance.org/programs/revitalization/">
https://elalliance.org/programs/technology/kratylos
https://elalliance.org/projects/celtic/breton
https://elalliance.org/projects/circassian/abzakh
https://elalliance.org/projects/circassian/kabardian
https://elalliance.org/projects/darfur/beria
https://elalliance.org/projects/darfur/masalit
https://elalliance.org/projects/jewish-languages
https://elalliance.org/projects/languages-of
https://elalliance.org/projects/meso-american
https://elalliance.org/tibetan">Tibetan
https://elalliance.org/who/#volunteers
https://elalliance.org/why/">Learn
```
