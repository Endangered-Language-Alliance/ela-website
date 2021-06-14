This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Documentation for CMSing

### Plugins

In addition to built-in WP features, these plugins are doing the bulk of the work:

- ACF (Advanced Custom Fields)
- CPT (Custom Post Type)
- Anything to do with those or GraphQL

With the exception of `Post Type Description` the Projects or Languages CPT,
**avoid messing with the plugin stuff unless you're Jason**. The `Post Type Description` field is an easy hack to allow content managers to control the
Projects and Languages landing "hero" summary text in lieu of an Excerpt since
those pages don't actually exist anywhere in WP.

### How/where to edit content??

- The `Custom Fields > Field Groups` is a good place to get aquainted/oriented
  with how the super-custom stuff is dished out. Again, **don't edit these**,
  but feel free to browse.
- In addition to the built-in Posts and Pages, the `Languages` and `Projects`
  links in the WP sidebar will contain everything you can edit.

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

### When Lightsail Crashes

...or at least when _Apache_ crashes? SSH in via web UI, then:

```bash
sudo /opt/bitnami/ctlscript.sh restart
```

## Tuts to Consider

[https://codepen.io/the_ruther4d/post/custom-query-string-vars-in-wordpress](https://codepen.io/the_ruther4d/post/custom-query-string-vars-in-wordpress)

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
