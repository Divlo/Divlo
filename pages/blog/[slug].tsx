import path from 'path'
import * as fsWithCallbacks from 'fs'

import { GetServerSideProps } from 'next'
import { useMemo } from 'react'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'
import date from 'date-and-time'

import { Head } from 'components/Head'

const fs = fsWithCallbacks.promises
const postsPath = path.join(process.cwd(), 'posts')

interface BlogPostProps {
  code: string
  frontmatter: {
    [key: string]: string
  }
}

const BlogPost: React.FC<BlogPostProps> = (props) => {
  const { code, frontmatter } = props
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <>
      <Head />
      <div className='flex flex-col mx-10'>
        <div className='flex flex-col items-center my-8'>
          <h1 className='text-3xl font-semibold'>{frontmatter.title}</h1>
          <p className='mt-2'>
            {date.format(new Date(frontmatter.createdAt), 'MMMM D, YYYY', true)}
          </p>
        </div>
        <div>
          <Component />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = (await fs.readdir(postsPath)).map((post) => {
    const [slug] = post.split('.')
    return slug
  })
  const slug = context?.query?.slug
  const redirectNotFound = {
    redirect: {
      destination: '/404',
      permanent: false
    }
  }
  if (slug == null || Array.isArray(slug)) {
    return redirectNotFound
  }
  const hasBlogPost = posts.includes(slug)
  if (!hasBlogPost) {
    return redirectNotFound
  }
  const mdxSource = (
    await fs.readFile(path.join(postsPath, `${slug}.mdx`), {
      encoding: 'utf8'
    })
  ).trim()
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }
  const { code, frontmatter } = await bundleMDX(mdxSource)
  if (!(frontmatter.isPublished as boolean)) {
    return redirectNotFound
  }
  return { props: { code, frontmatter } }
}

export default BlogPost
