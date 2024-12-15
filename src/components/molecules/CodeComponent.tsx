import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import JsxParser from 'react-jsx-parser';
import { Button, Title, Hyperlink, Image, LinkUrl, Paragraph, Text } from '../atoms';
import { MdCode, MdRemoveRedEye, MdFileCopy, MdDownload } from "react-icons/md";
import Badge from '../atoms/Badges';

// Wrapping components to ensure no prop mismatch
const WrappedButton = (props: any) => <Button {...props} />;
const WrappedTitle = (props: any) => <Title {...props} />;
const WrappedHyperlink = (props: any) => <Hyperlink {...props} />;
const WrappedImage = (props: any) => <Image {...props} />;
const WrappedLinkUrl = (props: any) => <LinkUrl {...props} />;
const WrappedParagraph = (props: any) => <Paragraph {...props} />;
const WrappedText = (props: any) => <Text {...props} />;
const WrappedBadge = (props: any) => <Badge {...props} />;

// Props for the CodeComponent
interface CodeComponentProps {
  code: string;
  language: string;
  title: string;
  description: string;
  variation: number;
  className?: string;
}

// CodeComponent to display raw code or rendered content
const CodeComponent: React.FC<CodeComponentProps> = ({ title, description, code, language, variation, className }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showRendered, setShowRendered] = useState<boolean>(false);

  const handleCopy = () => {
    setCopied(true);
    console.log(copied)
    setTimeout(() => setCopied(false), 1000);
  };

  useEffect(()=>{setShowRendered(variation > 0)},[])

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className='mt-8'>
      <p className="text-xl font-bold capitalize">{title}</p>
      <Paragraph className='mt-2 w-8/12 text-primary-dark text-opacity-70'>{description}</Paragraph>
      </div>
      <div className="flex justify-end items-center">

        <div className="flex items-center gap-4">
          {/* Toggle Buttons */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg shadow">
            <Button
              onClick={() => setShowRendered(false)}
              variant={!showRendered ? 'primary' : 'ghost'}
            >
              <MdCode />
            </Button>
            <Button
              onClick={() => setShowRendered(true)}
              variant={showRendered ? 'primary' : 'ghost'}
            >
             <MdRemoveRedEye />
            </Button>
          </div>
          <Hyperlink
              target='tab'
              url='https://github.com/Greatreyhan/komposisi/blob/master/src/components/atoms/Button.tsx'
              variant={'primary'}
            >
             <MdDownload />
          </Hyperlink>
          {/* Copy Button */}
          <CopyToClipboard text={code} onCopy={handleCopy}>
            <Button className='py-2'>
              <MdFileCopy />
            </Button>
          </CopyToClipboard>
        </div>
      </div>
      <div className="overflow-auto">
        {showRendered ? (
          <div className="p-4 bg-gray-100 rounded">
            <JsxParser
              components={{
                Button: WrappedButton,
                Title: WrappedTitle,
                Hyperlink: WrappedHyperlink,
                Image: WrappedImage,
                LinkUrl: WrappedLinkUrl,
                Paragraph: WrappedParagraph,
                Text: WrappedText,
                Badge: WrappedBadge,
              }}
              jsx={code}
            />
          </div>
        ) : (
          <SyntaxHighlighter
            language={language}
            style={oneLight} // Syntax highlighting theme
            className="rounded-lg p-4 bg-gray-100"
          >
            {code}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
};

export default CodeComponent;
