import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

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
							{title}
							<br />
							{id}
							<br />
							{date}
						</li>
					))}
				</ul>
			</section>
		</Layout>
	)
}