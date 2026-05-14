import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Github, 
  Terminal, 
  Layout, 
  Info,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { MarkdownPreview } from '@/components/MarkdownPreview';
import { generateReadme, auditReadme, ReadmeData } from '@/services/geminiService';

const INITIAL_DATA: ReadmeData = {
  mode: 'project',
  projectName: '',
  description: '',
  projectType: 'Web Application',
  features: '',
  technologies: '',
  technicalDecisions: '',
  installation: '',
  usage: '',
  license: 'MIT',
};

export default function App() {
  const [formData, setFormData] = useState<ReadmeData>(INITIAL_DATA);
  const [generatedMarkdown, setGeneratedMarkdown] = useState<string>('');
  const [auditResult, setAuditResult] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [previewMode, setPreviewMode] = useState<'readme' | 'audit'>('readme');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.projectName || !formData.description) {
      toast.error('Please provide at least a project name and description.');
      return;
    }

    setIsGenerating(true);
    try {
      const markdown = await generateReadme(formData);
      setGeneratedMarkdown(markdown);
      setAuditResult('');
      setPreviewMode('readme');
      toast.success('README generated successfully!');
      if (window.innerWidth < 1024) {
        setActiveTab('preview');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate README');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAudit = async () => {
    if (!generatedMarkdown) {
      toast.error('Generate a README first before auditing.');
      return;
    }

    setIsAuditing(true);
    try {
      const result = await auditReadme(generatedMarkdown);
      setAuditResult(result);
      setPreviewMode('audit');
      toast.success('Audit completed!');
      if (window.innerWidth < 1024) {
        setActiveTab('preview');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to audit README');
    } finally {
      setIsAuditing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setIsCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('README.md downloaded!');
  };

  const handleReset = () => {
    setFormData(INITIAL_DATA);
    setGeneratedMarkdown('');
    toast.info('Form reset');
  };

  return (
    <div className="min-h-screen technical-grid flex flex-col">
      <Toaster position="top-center" theme="dark" />
      
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
              <Terminal className="text-black w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold tracking-tight">README Architect</h1>
              <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">AI Task Agent v1.0</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="hidden sm:flex border-zinc-700 text-zinc-400 font-mono">
              ANI-100-REAL
            </Badge>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-zinc-400 hover:text-white")}
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Editor */}
        <div className={`flex flex-col gap-6 ${activeTab === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
          <Card className="glass-panel border-zinc-800">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Layout className="w-5 h-5 text-zinc-400" />
                    Project Details
                  </CardTitle>
                  <CardDescription className="text-zinc-500">
                    Provide the core information about your project.
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset} className="text-zinc-500 hover:text-zinc-300">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName" className="text-zinc-300">Project Name</Label>
                    <Input 
                      id="projectName"
                      name="projectName"
                      placeholder="e.g. Awesome App"
                      value={formData.projectName}
                      onChange={handleInputChange}
                      className="bg-zinc-950 border-zinc-800 focus:ring-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectType" className="text-zinc-300">Project Type</Label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                      className="flex h-8 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 text-zinc-300"
                    >
                      <option value="Web Application">Web Application</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="CLI Tool">CLI Tool</option>
                      <option value="Library/Package">Library/Package</option>
                      <option value="API Service">API Service</option>
                      <option value="Game">Game</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-zinc-300">Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    placeholder="What does this project do?"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-zinc-950 border-zinc-800 min-h-[80px] focus:ring-zinc-700"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="technologies" className="text-zinc-300">Technologies</Label>
                    <Input 
                      id="technologies"
                      name="technologies"
                      placeholder="React, TypeScript, Tailwind..."
                      value={formData.technologies}
                      onChange={handleInputChange}
                      className="bg-zinc-950 border-zinc-800 focus:ring-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license" className="text-zinc-300">License</Label>
                    <Input 
                      id="license"
                      name="license"
                      placeholder="MIT, Apache 2.0..."
                      value={formData.license}
                      onChange={handleInputChange}
                      className="bg-zinc-950 border-zinc-800 focus:ring-zinc-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features" className="text-zinc-300">Key Features</Label>
                  <Textarea 
                    id="features"
                    name="features"
                    placeholder="List main features (one per line)..."
                    value={formData.features}
                    onChange={handleInputChange}
                    className="bg-zinc-950 border-zinc-800 min-h-[60px] focus:ring-zinc-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technicalDecisions" className="text-zinc-300">Technical Decisions</Label>
                  <Textarea 
                    id="technicalDecisions"
                    name="technicalDecisions"
                    placeholder="Why did you choose these tools?"
                    value={formData.technicalDecisions}
                    onChange={handleInputChange}
                    className="bg-zinc-950 border-zinc-800 min-h-[60px] focus:ring-zinc-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="installation" className="text-zinc-300">How to Run</Label>
                  <Input 
                    id="installation"
                    name="installation"
                    placeholder="e.g. npm install && npm start"
                    value={formData.installation}
                    onChange={handleInputChange}
                    className="bg-zinc-950 border-zinc-800 focus:ring-zinc-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating || isAuditing}
                  className="bg-white text-black hover:bg-zinc-200 h-12 text-md font-bold transition-all active:scale-[0.98]"
                >
                  {isGenerating ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="mr-2">
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
                <Button 
                  onClick={handleAudit} 
                  disabled={isAuditing || isGenerating || !generatedMarkdown}
                  variant="secondary"
                  className="h-12 text-md font-bold transition-all active:scale-[0.98] border border-zinc-700"
                >
                  {isAuditing ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="mr-2">
                        <ShieldCheck className="w-4 h-4" />
                      </motion.div>
                      Auditing...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      Audit
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-zinc-500 mt-0.5 shrink-0" />
            <p className="text-sm text-zinc-500 leading-relaxed">
              Our AI model analyzes your project details to create a structured, professional README.md that follows GitHub best practices.
            </p>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className={`flex flex-col gap-4 h-[calc(100vh-12rem)] min-h-[500px] ${activeTab === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setPreviewMode('readme')}
                className={cn(
                  "flex items-center gap-2 pb-2 border-b-2 transition-all",
                  previewMode === 'readme' ? "border-white text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"
                )}
              >
                <FileText className="w-4 h-4" />
                <span className="font-display font-bold text-sm">README</span>
              </button>
              {auditResult && (
                <button 
                  onClick={() => setPreviewMode('audit')}
                  className={cn(
                    "flex items-center gap-2 pb-2 border-b-2 transition-all",
                    previewMode === 'audit' ? "border-white text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-display font-bold text-sm">Audit Results</span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopy}
                disabled={!generatedMarkdown && !auditResult}
                className="border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-300"
              >
                {isCopied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownload}
                disabled={!generatedMarkdown}
                className="border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <div className="flex-1 relative group">
            <AnimatePresence mode="wait">
              {previewMode === 'readme' ? (
                generatedMarkdown ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="h-full"
                  >
                    <MarkdownPreview content={generatedMarkdown} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full border border-dashed border-zinc-800 rounded-lg flex flex-col items-center justify-center text-zinc-600 p-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8 opacity-20" />
                    </div>
                    <h3 className="text-lg font-medium text-zinc-400 mb-2">No Content Yet</h3>
                    <p className="max-w-xs text-sm">
                      Fill out the form and click generate to see your professional README here.
                    </p>
                  </motion.div>
                )
              ) : (
                <motion.div
                  key="audit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="h-full"
                >
                  <MarkdownPreview content={auditResult} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-zinc-950 border border-zinc-800 rounded-full p-1 shadow-2xl flex items-center gap-1">
          <Button 
            variant={activeTab === 'editor' ? 'secondary' : 'ghost'} 
            size="sm" 
            className="rounded-full"
            onClick={() => setActiveTab('editor')}
          >
            Editor
          </Button>
          <Button 
            variant={activeTab === 'preview' ? 'secondary' : 'ghost'} 
            size="sm" 
            className="rounded-full"
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm font-mono">
            &copy; 2026 README Architect. Licensed under MIT.
          </p>
          <div className="flex items-center gap-6">
            <a href="/LICENSE" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">License</a>
            <a href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Terms</a>
            <a href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Privacy</a>
            <a href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors flex items-center gap-1">
              Documentation <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
