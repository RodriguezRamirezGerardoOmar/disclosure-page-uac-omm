import CreateExcerciseComponent from '../components/modals/CreateExcerciseComponent'
import CreateNewsComponent from '../components/modals/CreateNewsComponent'
import CreateNoteComponent from '../components/modals/CreateNoteComponent'
import { serialize } from 'next-mdx-remote/serialize';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import DisplayReportComponent from '../components/cards/DisplayReportComponent';

async function serializeNote(mdx: string) {
    return await serialize(mdx, {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex as any]
      }
    });
  }

export default async function Home() {
  const kek = await serializeNote('# Sexo anal III: La verganza de los culos')
  return (
    <>
      <div className='margin-auto md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto 
    min-h-screen place-items-center justify-between py-10'>
      <DisplayReportComponent body={kek.compiledSource} title='Reporte' />
      </div>
      <CreateNewsComponent />
      <CreateNoteComponent />
      <CreateExcerciseComponent />
    </>
  )
}
