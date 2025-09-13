import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, Copy, RefreshCw, Maximize, Minimize } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  title?: string;
  runnable?: boolean;
  expanded?: boolean;
}

const InteractiveCodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '',
  language = 'bash',
  title = 'devops.sh',
  runnable = true,
  expanded: initialExpanded = false,
}) => {
  const [code, setCode] = useState(initialCode);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(initialExpanded);
  const editorRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Sample DevOps scripts for the demo
  const devOpsScripts = [
    {
      title: 'AWS S3 Bucket Creation',
      language: 'bash',
      code: `#!/bin/bash
# Create an S3 bucket with versioning enabled
aws s3api create-bucket \\
  --bucket my-deployment-artifacts-bucket \\
  --region us-east-1
  
# Enable versioning
aws s3api put-bucket-versioning \\
  --bucket my-deployment-artifacts-bucket \\
  --versioning-configuration Status=Enabled
  
echo "✅ S3 bucket ready for deployments!"`
    },
    {
      title: 'Kubernetes Deployment',
      language: 'yaml',
      code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp-deployment
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
      - name: webapp
        image: nginx:latest
        ports:
        - containerPort: 80
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "200m"
            memory: "256Mi"`
    },
    {
      title: 'Terraform Infrastructure',
      language: 'hcl',
      code: `provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  
  tags = {
    Name = "WebServer"
    Environment = "Production"
  }
  
  vpc_security_group_ids = [aws_security_group.web.id]
}

resource "aws_security_group" "web" {
  name        = "web-server-sg"
  description = "Security group for web servers"
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`
    }
  ];

  // Typing animation effect
  useEffect(() => {
    if (!code) return;
    
    let currentIndex = 0;
    setIsTyping(true);
    setDisplayedCode('');
    
    const typingInterval = setInterval(() => {
      if (currentIndex >= code.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
        return;
      }
      
      setDisplayedCode(prev => prev + code[currentIndex]);
      currentIndex++;
      
      if (editorRef.current) {
        editorRef.current.scrollTop = editorRef.current.scrollHeight;
      }
    }, 5 + Math.random() * 10);
    
    return () => clearInterval(typingInterval);
  }, [code]);
  
  // Change script
  const changeScript = () => {
    const randomScript = devOpsScripts[Math.floor(Math.random() * devOpsScripts.length)];
    setCode(randomScript.code);
    setOutput([]);
    setIsRunning(false);
  };
  
  // Copy code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  // Simulate running the code
  const runCode = async () => {
    setIsRunning(true);
    setOutput([]);
    
    let simulatedOutput: string[] = [];
    
    if (code.includes('aws s3api')) {
      simulatedOutput = [
        '> Executing S3 bucket creation...',
        '> Setting up versioning...',
        '> Applying bucket policies...',
        '> SUCCESS: S3 bucket created successfully!'
      ];
    } else if (code.includes('kind: Deployment')) {
      simulatedOutput = [
        '> Applying Kubernetes manifest...',
        'deployment.apps/webapp-deployment created',
        '> Waiting for rollout to complete...',
        'Deployment "webapp-deployment" successfully rolled out',
        '> SUCCESS: Deployment is running with 3 replicas'
      ];
    } else if (code.includes('terraform') || code.includes('provider')) {
      simulatedOutput = [
        '> Initializing Terraform...',
        'Terraform initialized!',
        '> Planning infrastructure changes...',
        'Plan: 2 to add, 0 to change, 0 to destroy.',
        '> Applying changes...',
        'aws_security_group.web: Creating...',
        'aws_security_group.web: Creation complete after 2s',
        'aws_instance.web_server: Creating...',
        'aws_instance.web_server: Creation complete after 12s',
        '> SUCCESS: Apply complete! Resources: 2 added, 0 changed, 0 destroyed.'
      ];
    } else {
      simulatedOutput = [
        '> Executing script...',
        '> Processing commands...',
        '> SUCCESS: Script executed successfully!'
      ];
    }
    
    // Simulate progressive output
    for (let i = 0; i < simulatedOutput.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
      setOutput(prev => [...prev, simulatedOutput[i]]);
      
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }
    
    setIsRunning(false);
  };

  return (
    <div className={`bg-gray-900 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-700 dark:border-gray-600 shadow-2xl transition-all duration-300 ${
      expanded ? 'fixed inset-4 z-50' : 'w-full max-w-4xl mx-auto'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-700 px-4 py-3 text-sm">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <Terminal size={16} className="text-gray-400" />
          <span className="text-gray-300 dark:text-gray-200 font-mono">{title}</span>
          <div className="hidden sm:flex items-center space-x-2 text-xs">
            <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded border border-blue-600/30">
              {language}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={changeScript}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-gray-700"
            title="Load random script"
          >
            <RefreshCw size={14} />
          </button>
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-gray-700"
            title="Copy code"
          >
            <Copy size={14} className={isCopied ? 'text-green-400' : ''} />
          </button>
          {runnable && (
            <button
              onClick={runCode}
              disabled={isRunning}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-gray-700 disabled:opacity-50"
              title="Run code"
            >
              <Play size={14} className={isRunning ? 'animate-spin' : ''} />
            </button>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-gray-700"
            title={expanded ? 'Minimize' : 'Expand'}
          >
            {expanded ? <Minimize size={14} /> : <Maximize size={14} />}
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className={`${expanded ? 'h-[calc(100vh-8rem)]' : 'h-64 sm:h-80'} flex ${output.length > 0 ? 'flex-col lg:flex-row' : 'flex-col'}`}>
        <div className={`${output.length > 0 ? 'flex-1 lg:w-1/2' : 'flex-1'} relative`}>
          <div
            ref={editorRef}
            className="h-full p-4 bg-black dark:bg-gray-900 font-mono text-xs sm:text-sm leading-relaxed overflow-auto"
          >
            <pre className="text-gray-100 dark:text-gray-200 whitespace-pre-wrap">
              {displayedCode}
              {isTyping && <span className="animate-pulse bg-green-400 inline-block w-2 h-4 ml-1"></span>}
            </pre>
          </div>
          
          {/* Line numbers overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800/50 dark:bg-gray-700/50 p-4 font-mono text-xs text-gray-500 select-none pointer-events-none overflow-hidden">
            {displayedCode.split('\n').map((_, index) => (
              <div key={index} className="leading-relaxed">
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Output Panel */}
        {output.length > 0 && (
          <div className="flex-1 lg:w-1/2 border-t lg:border-t-0 lg:border-l border-gray-700 dark:border-gray-600">
            <div className="bg-gray-800 dark:bg-gray-700 px-4 py-2 text-xs font-semibold text-gray-300 dark:text-gray-200 border-b border-gray-700 dark:border-gray-600">
              📊 Output
            </div>
            <div
              ref={outputRef}
              className="h-48 sm:h-64 lg:h-full p-4 bg-black dark:bg-gray-900 font-mono text-xs sm:text-sm overflow-auto"
            >
              {output.map((line, index) => (
                <div
                  key={index}
                  className={`mb-1 ${
                    line.includes('SUCCESS') ? 'text-green-400' :
                    line.includes('ERROR') || line.includes('Failed') ? 'text-red-400' :
                    line.includes('WARNING') ? 'text-yellow-400' :
                    line.startsWith('>') ? 'text-blue-400' :
                    'text-gray-300 dark:text-gray-200'
                  }`}
                >
                  {line}
                </div>
              ))}
              {isRunning && (
                <div className="text-blue-400 animate-pulse">
                  <span className="inline-block w-2 h-4 bg-blue-400 ml-1"></span>
                  <span className="ml-2">Executing...</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 dark:bg-gray-700 px-4 py-2 text-xs text-gray-400 dark:text-gray-300 border-t border-gray-700 dark:border-gray-600 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span>Lines: {displayedCode.split('\n').length}</span>
          <span>Chars: {displayedCode.length}</span>
          {isCopied && <span className="text-green-400">✓ Copied!</span>}
        </div>
        <div className="hidden sm:block text-right">
          <span>DevOps Code Editor • Abhishek Mishra</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCodeEditor;