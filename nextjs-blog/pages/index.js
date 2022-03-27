import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import Date from '../components/date'

/*
Example code of server-side rendering

You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time. 
Time to first byte (TTFB) will be slower than getStaticProps because the server must compute the result on every request, 
and the result cannot be cached by a CDN without extra configuration.

export async function getServerSideProps(context) {
	return {
		props: {
			// props for your component
		}
	}
}
*/

/*
Static generatio without data + fetch data in the client-side

The team behind Next.js has created a React hook for data fetching called SWR. 
We highly recommend it if you’re fetching data on the client side. 
It handles caching, revalidation, focus tracking, refetching on interval, and more.

This approach works well for user dashboard pages, for example. 
Because a dashboard is a private, user-specific page, SEO is not relevant, 
and the page doesn’t need to be pre-rendered. 
The data is frequently updated, which requires request-time data fetching.

Ejemplo SWR client-side rendering para una aplicación de mensajería

const { data } = useSWR("/api/chat-messages", fetcher, {
  subscribe(key, mutate) {
	// start connection to the WebSocket API
	const ws = new WebSocket("wss://my.app/api/chat-messages");
	ws.onmessage = (event) => {
	  mutate((messages) => [...messages, JSON.parse(event.data)], false);
	};
	return () => ws.close();
  },
});
*/

// Static rendering
export async function getStaticProps() {
	const allPostsData = getSortedPostsData()
	return {
		props: {
			allPostsData
		}
	}
}

export default function Home({ allPostsData }) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>[Your Self Introduction]</p>
				<p>
					(This is a sample website - you’ll be building a site like this on{' '}
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
				</p>
				<Link href="/posts/first-post">
					<a>First Post</a>
				</Link>
			</section>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>
								<a>{title}</a>
							</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	)
}