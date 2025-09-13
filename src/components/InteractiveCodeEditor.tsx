import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, Copy, RefreshCw, Maximize, Minimize } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  theme?: 'dark' | 'light';
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
  
echo "S3 bucket created successfully!"`
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
    },
    {
      title: 'GitHub Actions CI/CD',
      language: 'yaml',
      code: `name: Deploy to EKS
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to ECR
      uses: aws-actions/amazon-ecr-login@v1
    
    - name: Build and push
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: \${{ secrets.ECR_REGISTRY }}/webapp:\${{ github.sha }}
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Update kubeconfig
      run: aws eks update-kubeconfig --name production-cluster
    
    - name: Deploy to EKS
      run: |
        kubectl set image deployment/webapp webapp=\${{ secrets.ECR_REGISTRY }}/webapp:\${{ github.sha }}
        kubectl rollout status deployment/webapp`
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
      
      // Scroll to bottom as we type
      if (editorRef.current) {
        editorRef.current.scrollTop = editorRef.current.scrollHeight;
      }
    }, 5 + Math.random() * 10); // Random typing speed for more realistic effect
    
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
    
    // Generate different outputs based on the code content
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
    } else if (code.includes('terraform')) {
      simulatedOutput = [
        '> Initializing Terraform...',
        'Terraform initialized!',
        '> Planning infrastructure changes...',
        'Plan: 2 to add, 0 to change, 0 to destroy.',
        '> Applying changes...',
        'aws_security_group.web: Creating...',
        'aws_security_group.web: Creation complete after 2s',
        'aws_instance.web_server: Creating...',
        'aws_instance.web_server: Still creating... [10s elapsed]',
        'aws_instance.web_server: Creation complete after 12s',
        '> SUCCESS: Apply complete! Resources: 2 added, 0 changed, 0 destroyed.'
      ];
    } else if (code.includes('github')) {
      simulatedOutput = [
        '> Setting up CI/CD pipeline...',
        '> Building Docker image...',
        'Step 1/10 : FROM node:14 as build',
        'Step 2/10 : WORKDIR /app',
        '...',
        'Step 10/10 : CMD ["npm", "start"]',
        '> Pushing to ECR registry...',
        'The push refers to repository [123456789012.dkr.ecr.us-east-1.amazonaws.com/webapp]',
        '> Deploying to EKS cluster...',
        'deployment.apps/webapp image updated',
        'Waiting for deployment "webapp" rollout to finish: 2 out of 3 new replicas have been updated...',
        'deployment "webapp" successfully rolled out',
        '> SUCCESS: Deployment complete!'
      ];
    } else {
      simulatedOutput = [
        '> Executing script...',
        '> Processing...',
        '> SUCCESS: Script executed successfully!'
      ];
    }
    
    // Show output with typing effect
    for (let i = 0; i < simulatedOutput.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
      setOutput(prev => [...prev, simulatedOutput[i]]);
      
      // Scroll to bottom of output
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }
    
    setIsRunning(false);
  };
  
  // Line numbers for the code editor
  const lineNumbers = displayedCode.split('\n').map((_, index) => index + 1);
  
  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 ${
      expanded ? 'w-full max-w-6xl mx-auto' : 'w-full'
    }`}>
      {/* Editor Header */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 rounded-md bg-gray-700/50 text-gray-300 text-sm font-mono">
            <Terminal size={14} />
            <span>{title}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={changeScript}
            className="text-gray-400 hover:text-white transition-colors"
            title="Change script"
          >
            <RefreshCw size={18} />
          </button>
          <button 
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white transition-colors"
            title={isCopied ? "Copied!" : "Copy code"}
          >
            <Copy size={18} className={isCopied ? "text-green-400" : ""} />
          </button>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-white transition-colors"
            title={expanded ? "Minimize" : "Expand"}
          >
            {expanded ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>
      
      {/* Code Editor */}
      <div className="flex">
        {/* Line Numbers */}
        <div className="bg-gray-800 px-3 py-4 text-right text-sm font-mono text-gray-500 select-none">
          {lineNumbers.map(num => (
            <div key={num} className="leading-relaxed">{num}</div>
          ))}
        </div>
        
        {/* Code Content */}
        <div 
          ref={editorRef}
          className="flex-1 p-4 overflow-x-auto font-mono text-sm text-gray-300 leading-relaxed"
        >
          <pre>
            <code
              dangerouslySetInnerHTML={{
                __html: syntaxHighlight(displayedCode, language)
              }}
            />
          </pre>
          {isTyping && <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse ml-1"></span>}
        </div>
      </div>
      
      {/* Run Button & Output */}
      {runnable && (
        <>
          <div className="border-t border-gray-700 p-3 flex justify-between items-center bg-gray-800">
            <div className="text-xs text-gray-500">
              {isRunning ? 'Running...' : 'Ready to execute'}
            </div>
            <button
              onClick={runCode}
              disabled={isRunning || isTyping}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-300 ${
                isRunning || isTyping
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  <span>Running</span>
                </>
              ) : (
                <>
                  <Play size={14} className="fill-current" />
                  <span>Run</span>
                </>
              )}
            </button>
          </div>
          
          {/* Output Terminal */}
          {output.length > 0 && (
            <div className="border-t border-gray-700 bg-black">
              <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-800">
                Output
              </div>
              <div
                ref={outputRef}
                className="p-4 max-h-60 overflow-auto font-mono text-sm text-green-400 leading-relaxed"
              >
                {output.map((line, index) => (
                  <div key={index} className={`mb-1 ${
                    line.includes('SUCCESS') ? 'text-green-400 font-bold' : 
                    line.includes('ERROR') || line.includes('error') ? 'text-red-400' :
                    line.includes('>') ? 'text-cyan-400' : 'text-gray-300'
                  }`}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Simple syntax highlighting function
const syntaxHighlight = (code: string, language: string): string => {
  if (!code) return '';
  
  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // Language-specific syntax highlighting
  if (language === 'bash' || language === 'sh') {
    // Comments
    highlighted = highlighted.replace(/#.*/g, '<span style="color: #6b7280;">$&</span>');
    // Commands
    highlighted = highlighted.replace(/\b(aws|kubectl|docker|terraform|helm|echo|if|fi|then|else|for|while|do|done)\b/g, 
      '<span style="color: #60a5fa;">$&</span>');
    // Options/flags
    highlighted = highlighted.replace(/\s(-{1,2}[a-zA-Z0-9-_]+)/g, 
      ' <span style="color: #f472b6;">$1</span>');
    // Strings
    highlighted = highlighted.replace(/"([^"]*)"/g, '<span style="color: #34d399;">"$1"</span>');
    highlighted = highlighted.replace(/'([^']*)'/g, '<span style="color: #34d399;">\'$1\'</span>');
    // Variables
    highlighted = highlighted.replace(/\$\{?([a-zA-Z0-9_]+)\}?/g, 
      '<span style="color: #f59e0b;">$&</span>');
  } else if (language === 'yaml' || language === 'yml') {
    // Keys
    highlighted = highlighted.replace(/([a-zA-Z0-9_-]+):/g, 
      '<span style="color: #60a5fa;">$1</span>:');
    // Values
    highlighted = highlighted.replace(/:\s*([a-zA-Z0-9_.-]+)/g, 
      ': <span style="color: #34d399;">$1</span>');
    // Strings
    highlighted = highlighted.replace(/"([^"]*)"/g, '<span style="color: #34d399;">"$1"</span>');
    highlighted = highlighted.replace(/'([^']*)'/g, '<span style="color: #34d399;">\'$1\'</span>');
    // Special keywords
    highlighted = highlighted.replace(/\b(true|false|null|yes|no)\b/g, 
      '<span style="color: #f59e0b;">$&</span>');
  } else if (language === 'hcl' || language === 'tf') {
    // Resource types
    highlighted = highlighted.replace(/\b(resource|provider|module|variable|output|locals|data)\b/g, 
      '<span style="color: #f472b6;">$&</span>');
    // Resource names
    highlighted = highlighted.replace(/\b(resource|provider|module)\b\s+"([a-zA-Z0-9_-]+)"\s+"([a-zA-Z0-9_-]+)"/g, 
      '<span style="color: #f472b6;">$1</span> "<span style="color: #60a5fa;">$2</span>" "<span style="color: #34d399;">$3</span>"');
    // Attributes
    highlighted = highlighted.replace(/([a-zA-Z0-9_-]+)\s*=/g, 
      '<span style="color: #60a5fa;">$1</span> =');
    // Strings
    highlighted = highlighted.replace(/"([^"]*)"/g, '<span style="color: #34d399;">"$1"</span>');
    // Numbers
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span style="color: #f59e0b;">$1</span>');
  }
  
  return highlighted;
};

export default InteractiveCodeEditor;