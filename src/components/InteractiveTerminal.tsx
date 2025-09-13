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
    }
  ];

  const typeWriter = async (lines: TerminalLine[]) => {
    setIsTyping(true);
    
    for (const line of lines) {
      if (line.delay) {
        await new Promise(resolve => setTimeout(resolve, line.delay));
      }
      
      if (line.type === 'command') {
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
        '• terraform plan',
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
    } else {
      response = [`Command not found: ${command}`, 'Type "help" for available commands'];
    }

    response.forEach(text => {
      setCurrentLines(prev => [...prev, {
        type: 'output',
        text,
        color: 'text-gray-300'
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
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-500 ${
      isMinimized ? 'w-12 h-12' : 'w-full max-w-2xl h-96 sm:w-96 sm:h-80'
    }`}>
      <div className="bg-gray-900 dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-700 dark:border-gray-600 overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-700 px-4 py-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <Terminal size={16} className="text-gray-400 ml-2" />
            <span className="text-gray-300 dark:text-gray-200 font-mono text-xs sm:text-sm">
              {isMinimized ? '' : 'DevOps Terminal'}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Minimize size={14} />
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        {!isMinimized && (
          <div className="h-64 sm:h-60 flex flex-col">
            <div
              ref={terminalRef}
              className="flex-1 p-4 bg-black dark:bg-gray-900 overflow-y-auto font-mono text-xs sm:text-sm"
            >
              {currentLines.map((line, index) => (
                <div key={index} className={`${line.color || 'text-white'} mb-1 leading-relaxed`}>
                  {line.text.split('\n').map((textLine, lineIndex) => (
                    <div key={lineIndex}>{textLine}</div>
                  ))}
                </div>
              ))}
              {isTyping && (
                <div className="text-green-400 animate-pulse">
                  <span className="inline-block w-2 h-4 bg-green-400 ml-1"></span>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="bg-black dark:bg-gray-900 border-t border-gray-700 p-2 sm:p-4">
              <div className="flex items-center font-mono text-xs sm:text-sm">
                <span className="text-green-400 mr-2">➜ ~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent text-white dark:text-gray-100 outline-none"
                  placeholder="Type a command..."
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