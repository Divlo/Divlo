import { GetServerSideProps } from 'next'
import path from 'path'
import { useMemo } from 'react'
import * as fsWithCallbacks from 'fs'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'

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
      <header>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.description}</p>
      </header>
      <main>
        <Component />
      </main>
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
  return { props: { code, frontmatter } }
}

export default BlogPost
