import type React from 'react'
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'AI UML Generator by Hamidul Islam | Create UML Diagrams Instantly',
	description:
		'Generate UML diagrams from natural language using AI. Fast, easy, and accurate UML diagram generation by Hamidul Islam.',
	keywords: [
		'UML diagrams',
		'AI UML generator',
		'Hamidul Islam',
		'UML from natural language',
		'UML tool',
		'AI diagram generator',
	],
	authors: [{ name: 'Hamidul Islam', url: 'https://umlai.vercel.app' }],
	openGraph: {
		title: 'AI UML Generator by Hamidul Islam',
		description:
			'Generate UML diagrams from natural language using AI. Fast, easy, and accurate UML diagram generation by Hamidul Islam.',
		url: 'https://umlai.vercel.app',
		siteName: 'AI UML Generator',
		images: [
			{
				url: 'https://umlai.vercel.app/cover.png', // Add an OpenGraph image for social sharing
				width: 1200,
				height: 630,
				alt: 'AI UML Generator by Hamidul Islam',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'AI UML Generator by Hamidul Islam',
		description:
			'Generate UML diagrams from natural language using AI. Fast, easy, and accurate UML diagram generation by Hamidul Islam.',
		images: ['https://umlai.vercel.app/cover.png'], // Add a Twitter image for social sharing
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	metadataBase: new URL('https://umlai.vercel.app/'), // Replace with your actual domain
	alternates: {
		canonical: '/', // Add canonical URL to avoid duplicate content issues
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>{children}</body>
		</html>
	)
}
