import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Minimize } from 'lucide-react';

interface TerminalLine {
  type: 'command' | 'output' | 'system';
  text: string;
  delay?: number;
  color?: string;
}

const InteractiveTerminal: React.FC = () => {
  const [currentLines, setCurrentLines] = useState<TerminalLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const demoCommands = [
    {
      command: 'aws ec2 describe-instances --region us-east-1',
      output: [
        '{\n    "Reservations": [\n        {\n            "Instances": [\n                {\n                    "InstanceId": "i-0123456789abcdef0",\n                    "State": {\n                        "Name": "running"\n                    },\n                    "InstanceType": "t3.medium"\n                }\n            ]\n        }\n    ]\n}'
      ]
    },
    {
      command: 'kubectl get pods -n production',
      output: [
        'NAME                           READY   STATUS    RESTARTS   AGE',
        'webapp-deployment-7d4b5c8f9-abc12   1/1     Running   0          2d',
        'api-deployment-6c7d8e9f0a-def34    1/1     Running   0          1d',
        'redis-cache-5a6b7c8d9e-ghi56      1/1     Running   0          3d'
      ]
    },
    {
      command: 'terraform plan',
      output: [
        'Refreshing Terraform state in-memory prior to plan...',
        '',
        'An execution plan has been generated and is shown below.',
        'Resource actions are indicated with the following symbols:',
        '  + create',
        '  ~ update in-place',
        '',
        'Terraform will perform the following actions:',
        '',
        '  # aws_instance.web will be created',
        '  + resource "aws_instance" "web" {',
        '      + instance_type = "t3.micro"',
        '      + tags = {',
        '          + "Environment" = "production"',
        '      }',
        '    }',
        '',
        'Plan: 1 to add, 0 to change, 0 to destroy.'
      ]
    },
    {
      command: 'docker ps',
      output: [
        'CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                    NAMES',
        'a1b2c3d4e5f6   nginx:latest   "/docker-entrypoint.…"   2 hours ago     Up 2 hours     0.0.0.0:80->80/tcp      webapp',
        '6f5e4d3c2b1a   redis:alpine   "docker-entrypoint.s…"   2 hours ago     Up 2 hours     6379/tcp                redis-cache'
      ]
    },
    {
      command: 'helm list -n production',
      output: [
        'NAME       NAMESPACE    REVISION  UPDATED                                 STATUS    CHART          APP VERSION',
        'webapp     production   3         2024-01-15 10:30:22.123456789 +0000 UTC deployed  webapp-2.1.0   1.16.0',
        'api        production   2         2024-01-14 15:45:33.987654321 +0000 UTC deployed  api-chart-1.0.0 2.0.1'
      ]
    }
  ];

  const typeWriter = async (lines: TerminalLine[]) => {
    setIsTyping(true);
    
    for (const line of lines) {
      if (line.delay) {
        await new Promise(resolve => setTimeout(resolve, line.delay));
      }
      
      if (line.type === 'command') {
        // Type out command character by character
        const chars = line.text.split('');
        let currentText = '';
        
        for (const char of chars) {
          currentText += char;
          setCurrentLines(prev => {
            const newLines = [...prev];
            if (newLines[newLines.length - 1]?.type === 'command') {
              newLines[newLines.length - 1].text = `➜ ~ ${currentText}`;
            } else {
              newLines.push({
                type: 'command',
                text: `➜ ~ ${currentText}`,
                color: 'text-green-400'
              });
            }
            return newLines;
          });
          await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 50));
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        setCurrentLines(prev => [...prev, line]);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Scroll to bottom
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }
    
    setIsTyping(false);
  };

  const runDemo = async () => {
    setCurrentLines([{
      type: 'system',
      text: '🚀 DevOps Terminal Demo - Abhishek Mishra',
      color: 'text-blue-400'
    }]);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    for (const demo of demoCommands) {
      const commandLines: TerminalLine[] = [
        {
          type: 'command',
          text: demo.command,
          color: 'text-green-400',
          delay: 1000
        },
        ...demo.output.map(output => ({
          type: 'output' as const,
          text: output,
          color: output.includes('Running') ? 'text-green-300' : 
                 output.includes('error') || output.includes('Error') ? 'text-red-400' :
                 output.includes('WARNING') || output.includes('Warning') ? 'text-yellow-400' :
                 'text-gray-300'
        })),
        {
          type: 'output',
          text: '',
          delay: 2000
        }
      ];
      
      await typeWriter(commandLines);
    }
    
    // Add interactive prompt
    setCurrentLines(prev => [...prev, {
      type: 'system',
      text: '💡 Try typing your own commands below!',
      color: 'text-cyan-400'
    }]);
  };

  const handleCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    
    setCurrentLines(prev => [...prev, {
      type: 'command',
      text: `➜ ~ ${command}`,
      color: 'text-green-400'
    }]);

    let response: string[] = [];
    
    if (trimmedCommand.includes('help')) {
      response = [
        'Available demo commands:',
        '• aws ec2 describe-instances',
        '• kubectl get pods',
        '• docker ps',
        '• terraform plan',
        '• helm list',
        '• clear - Clear terminal',
        '• demo - Run full demo again'
      ];
    } else if (trimmedCommand.includes('clear')) {
      setCurrentLines([]);
      setCurrentCommand('');
      return;
    } else if (trimmedCommand.includes('demo')) {
      runDemo();
      setCurrentCommand('');
      return;
    } else if (trimmedCommand.includes('aws')) {
      response = ['✅ AWS CLI configured for us-east-1 region', '🔐 Using IAM role: DevOpsEngineer'];
    } else if (trimmedCommand.includes('kubectl')) {
      response = ['📊 Connected to EKS cluster: production-cluster', '🎯 Current context: arn:aws:eks:us-east-1:123456789012:cluster/production'];
    } else if (trimmedCommand.includes('docker')) {
      response = ['🐳 Docker daemon running', '📦 Active containers: 2'];
    } else if (trimmedCommand.includes('terraform')) {
      response = ['🏗️ Terraform v1.6.0 initialized', '📋 Planning infrastructure changes...'];
    } else if (trimmedCommand.includes('helm')) {
      response = ['⚓ Helm v3.12.0 connected', '📦 Charts deployed: 2'];
    } else if (trimmedCommand) {
      response = [`Command not found: ${command}`, 'Type "help" for available commands'];
    }

    response.forEach(line => {
      setCurrentLines(prev => [...prev, {
        type: 'output',
        text: line,
        color: line.includes('✅') || line.includes('🚀') ? 'text-green-300' :
               line.includes('❌') || line.includes('not found') ? 'text-red-400' :
               'text-gray-300'
      }]);
    });
    
    setCurrentCommand('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentCommand);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      runDemo();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentLines]);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-12' : 'w-96 h-80'
    }`}>
      <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Terminal size={16} className="text-green-400" />
            <span className="text-sm font-mono text-gray-300">DevOps Terminal</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
            >
              <Minimize size={8} className="text-gray-800 mx-auto" />
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
            >
              <X size={8} className="text-gray-800 mx-auto" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        {!isMinimized && (
          <div className="h-64 flex flex-col">
            <div
              ref={terminalRef}
              className="flex-1 p-4 font-mono text-xs overflow-y-auto bg-gray-900 text-green-400"
              style={{ scrollbarWidth: 'thin' }}
            >
              {currentLines.map((line, index) => (
                <div key={index} className={`mb-1 ${line.color || 'text-gray-300'}`}>
                  <pre className="whitespace-pre-wrap font-mono">{line.text}</pre>
                </div>
              ))}
              {isTyping && (
                <div className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></div>
              )}
            </div>
            
            {/* Command Input */}
            <div className="bg-gray-800 p-2 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <span className="text-green-400 font-mono text-sm">➜ ~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent text-green-400 font-mono text-sm outline-none"
                  placeholder="Type a command... (try 'help')"
                  disabled={isTyping}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveTerminal;