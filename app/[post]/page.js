import { readJSON } from 'fs-extra'
import path from 'node:path'

import { Pill } from '../components/Pill.jsx'
import { ButtonRead } from '../components/ButtonRead.jsx'

const jsonDirectory = path.join(process.cwd(), 'dist')

export default async function Post ({ params }) {
  const { post } = params

  const { content, level, title } = await readJSON(`${jsonDirectory}/${post}.json`)

  const render = content
    .replace('<h4 ', '<h1 ')
    .replace('</h4', '</h1')
    .replace('<hr>', '')

  return (
    <>
      <header className='relative'>
        <h1 className='pb-8 text-4xl font-bold text-blue-900' id='content'>{title}</h1>
        <div className='absolute flex flex-row gap-2 top-3 right-1'>
          <Pill level={level} />
          <ButtonRead title={title} />
        </div>
      </header>
      <article className='prose max-w-none pb-4 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-blue-900 [&>h1]:pb-8 [&>p]:pb-6 [&>p]:text-xl [&>p>strong]:bg-yellow-50 [&_a]:text-blue-700 [&_a:hover]:underline [&>ul>li]:list-disc [&>ul]:text-xl [&>ul]:text-blue-900 [&>ul]:pb-4 [&>ul>li]:list-inside [&>pre]:rounded-xl [&>pre]:text-white [&>pre]:mb-8 [&>pre]:p-8 [&>pre]:bg-slate-800' dangerouslySetInnerHTML={{ __html: render }} />
    </>
  )
}
