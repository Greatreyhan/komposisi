import React from 'react'
import Breadcumb from '../molecules/Breadcumb'
import Title from '../atoms/Title'
import Paragraph from '../atoms/Paragraph'
import CodeComponent from '../molecules/CodeComponent'

const PageDescription = () => {
  const codeExample = `
    <Title variant="h4" className="font-black mt-2">
      Details Component
    </Title>
    <Paragraph className="mt-4 w-8/12 text-primary-dark text-opacity-70">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
    </Paragraph>
  `;

  return (
    <div>
      {/* Bread Crumb Navigation */}
      <Breadcumb className='text-opacity-80 text-primary-dark' navigator={['Hello', 'World']} />
      <Title variant='h1' className='font-black mt-2'>Details Component</Title>
      <Paragraph className='mt-4 w-8/12 text-primary-dark text-opacity-70'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
      </Paragraph>
      <CodeComponent name="Example Code" code={codeExample} language="tsx" />
    </div>
  );
};

export default PageDescription;
