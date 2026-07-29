import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'K T ANITIN | Software Developer & Graphic Designer',
  description:
    'Minimalist portfolio of K T Anitin. Software Developer, MERN Stack Developer, and Graphic Designer specializing in Next.js, Java, Python, Photoshop, and social media/sports graphics.',
  keywords: [
    'K T Anitin',
    'Anitin portfolio',
    'Software Developer Ernakulam',
    'Graphic Designer Kerala',
    'MERN Stack Developer',
    'Sports Poster Designer',
    'Minimalist Portfolio'
  ],
  authors: [{ name: 'K T Anitin' }],
  creator: 'K T Anitin',
  openGraph: {
    title: 'K T ANITIN | Software Developer & Graphic Designer',
    description:
      'Building Modern Digital Experiences & Graphic Artworks.',
    url: 'https://anitinportfoliyo.netlify.app/',
    siteName: 'K T Anitin Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K T ANITIN | Software Developer & Graphic Designer',
    description:
      'Building Modern Digital Experiences & Graphic Artworks.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-[#111111] antialiased selection:bg-black selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
