import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // swcMinify: false
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  }
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax],
  },
})

export default withMDX(nextConfig)