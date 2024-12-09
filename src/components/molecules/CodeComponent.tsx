import React, { useState, useEffect, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DOMPurify from 'dompurify';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Button from '../atoms/Button';

// Props for the RenderedCode component
interface RenderedCodeProps {
  code: string;
}

// RenderedCode component to render sanitized HTML and execute import scripts
const RenderedCode: React.FC<RenderedCodeProps> = ({ code }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sanitizedCode = DOMPurify.sanitize(code, { RETURN_DOM_FRAGMENT: true }) as DocumentFragment;

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      sanitizedCode.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName !== 'STYLE') {
          containerRef.current?.appendChild(node.cloneNode(true));
        }
      });

      // Find and execute dynamic script tags (e.g., import statements)
      const scriptTags = sanitizedCode.querySelectorAll('script');
      scriptTags.forEach((scriptTag) => {
        const scriptElement = document.createElement('script');
        scriptElement.textContent = scriptTag.textContent;
        document.body.appendChild(scriptElement);
        // Clean up after execution
        document.body.removeChild(scriptElement);
      });

      const styleTags = sanitizedCode.querySelectorAll('style');
      styleTags.forEach((styleTag) => {
        const styleElement = document.createElement('style');
        styleElement.textContent = styleTag.textContent;
        styleElement.setAttribute('data-dynamic', 'true');
        document.head.appendChild(styleElement);
      });
    }

    return () => {
      const dynamicStyles = document.head.querySelectorAll('style[data-dynamic]');
      dynamicStyles.forEach((style) => style.remove());
    };
  }, [code]);

  return <div ref={containerRef} className="p-4 bg-gray-100 rounded"></div>;
};

// Props for the CodeComponent
interface CodeComponentProps {
  code: string;
  language: string;
  name: string;
  className?: string;
}

// CodeComponent to display raw code or rendered content
const CodeComponent: React.FC<CodeComponentProps> = ({ name, code, language, className }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showRendered, setShowRendered] = useState<boolean>(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">{name}</span>
        <div className="flex items-center gap-4">
          {/* Toggle Buttons */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg shadow">
            <Button
              onClick={() => setShowRendered(false)}
              variant={!showRendered ? 'primary' : 'ghost'}
            >
              <span className="material-icons">code</span> Code
            </Button>
            <Button
              onClick={() => setShowRendered(true)}
              variant={showRendered ? 'primary' : 'ghost'}
            >
              <span className="material-icons">visibility</span> Preview
            </Button>
          </div>

          {/* Copy Button */}
          <CopyToClipboard text={code} onCopy={handleCopy}>
            <Button>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </CopyToClipboard>
        </div>
      </div>
      <div className="overflow-auto">
        {showRendered ? (
          <RenderedCode code={code} />
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
