'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
	Download,
	Copy,
	Code,
	FileCode,
	Sparkles,
	RefreshCw,
	Zap,
	Lightbulb,
	LayoutTemplate,
	Settings,
	Moon,
	Sun,
	Share2,
} from 'lucide-react'

import plantumlEncoder from 'plantuml-encoder'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react'
import UMLViewer from '@/components/UMLViewer'

export default function UMLGenerator() {
	const [description, setDescription] = useState('')
	const [umlCode, setUmlCode] = useState('')
	const [isGenerating, setIsGenerating] = useState(false)
	const [isDarkMode, setIsDarkMode] = useState(false)
	const [activeTab, setActiveTab] = useState('editor')
	const editorRef = useRef<HTMLDivElement>(null)
	const [diagramType, setDiagramType] = useState('class')

	// Mock UML templates
	const templates = {
		class: `@startuml
class User {
  -String username
  -String email
  +login()
  +logout()
}

class Post {
  -String title
  -String content
  -Date createdAt
  +publish()
}

User "1" -- "many" Post : creates
@enduml`,
		sequence: `@startuml
actor User
participant "Web App" as A
participant "API Server" as B
database "Database" as C

User -> A: Login Request
A -> B: Authenticate
B -> C: Query User
C --> B: Return User Data
B --> A: Authentication Response
A --> User: Login Result
@enduml`,
		activity: `@startuml
start
:User opens application;
if (Is logged in?) then (yes)
  :Show dashboard;
else (no)
  :Show login form;
  :User enters credentials;
  if (Credentials valid?) then (yes)
    :Authenticate user;
    :Show dashboard;
  else (no)
    :Show error message;
    stop
  endif
endif
:User interacts with app;
stop
@enduml`,
	}

	// Initialize editor with default template
	useEffect(() => {
		if (typeof window !== 'undefined' && editorRef.current) {
			// In a real implementation, we would initialize Ace editor here
			// For this demo, we'll just set the UML code
			setUmlCode(templates.class)
		}
	}, [])

	// Toggle dark mode
	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [isDarkMode])

	// Mock AI generation function
	const generateUML = async () => {
		if (!description.trim()) return

		setIsGenerating(true)

		// Simulate API call delay
		await new Promise(resolve => setTimeout(resolve, 1500))

		// Mock response based on keywords in the description
		let generatedUML = ''

		if (
			description.toLowerCase().includes('user') &&
			description.toLowerCase().includes('post')
		) {
			generatedUML = templates.class
		} else if (
			description.toLowerCase().includes('sequence') ||
			description.toLowerCase().includes('api')
		) {
			generatedUML = templates.sequence
		} else if (
			description.toLowerCase().includes('flow') ||
			description.toLowerCase().includes('process')
		) {
			generatedUML = templates.activity
		} else {
			// Default response
			generatedUML = `@startuml
' AI-generated UML based on your description:
' "${description}"

class MainEntity {
  -String name
  -String description
  +performAction()
}

class RelatedEntity {
  -String attribute
  +doSomething()
}

MainEntity -- RelatedEntity
@enduml`
		}

		setUmlCode(generatedUML)
		setIsGenerating(false)
	}

	// Mock function to render UML diagram
	const renderUML = () => {
		return UMLViewer({ umlCode, isGenerating })
	}
	const handleTemplateChange = (type: string) => {
		setDiagramType(type)
		setUmlCode(templates[type as keyof typeof templates])
	}

	return (
		<div className={`min-h-screen bg-background text-foreground`}>
			<header className="border-b">
				<div className="container mx-auto px-4 py-3 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<FileCode className="h-6 w-6 text-primary" />
						<h1 className="text-xl font-bold">AI UML Generator</h1>
						<Badge variant="outline" className="ml-2">
							Beta
						</Badge>
					</div>
					<div className="flex items-center gap-4">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="flex items-center gap-2">
										<Switch
											checked={isDarkMode}
											onCheckedChange={setIsDarkMode}
											id="dark-mode"
										/>
										<Label htmlFor="dark-mode" className="cursor-pointer">
											{isDarkMode ? (
												<Moon className="h-4 w-4" />
											) : (
												<Sun className="h-4 w-4" />
											)}
										</Label>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<p>Toggle dark mode</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<Button variant="outline" size="sm">
							<Share2 className="h-4 w-4 mr-2" />
							Share
						</Button>

						<Button variant="outline" size="sm">
							<Settings className="h-4 w-4 mr-2" />
							Settings
						</Button>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-4 py-6">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
					{/* Sidebar */}
					<div className="lg:col-span-1">
						<Card>
							<CardContent className="p-4">
								<div className="space-y-4">
									<div>
										<h3 className="text-lg font-medium mb-2 flex items-center gap-2">
											<Sparkles className="h-4 w-4 text-primary" />
											AI Generation
										</h3>
										<div className="space-y-3">
											<Textarea
												placeholder="Describe your system in natural language..."
												value={description}
												onChange={e => setDescription(e.target.value)}
												className="min-h-[120px]"
											/>
											<Button
												onClick={generateUML}
												className="w-full"
												disabled={isGenerating || !description.trim()}
											>
												{isGenerating ? (
													<>
														<RefreshCw className="mr-2 h-4 w-4 animate-spin" />
														Generating...
													</>
												) : (
													<>
														<Zap className="mr-2 h-4 w-4" />
														Generate UML
													</>
												)}
											</Button>
										</div>
									</div>

									<Separator />

									<div>
										<h3 className="text-lg font-medium mb-2 flex items-center gap-2">
											<LayoutTemplate className="h-4 w-4 text-primary" />
											Templates
										</h3>
										<div className="space-y-2">
											<Select
												value={diagramType}
												onValueChange={handleTemplateChange}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select template" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="class">Class Diagram</SelectItem>
													<SelectItem value="sequence">
														Sequence Diagram
													</SelectItem>
													<SelectItem value="activity">
														Activity Diagram
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>

									<Separator />

									<div>
										<h3 className="text-lg font-medium mb-2 flex items-center gap-2">
											<Lightbulb className="h-4 w-4 text-primary" />
											Tips
										</h3>
										<ul className="text-sm space-y-2 text-muted-foreground">
											<li>• Use natural language to describe your system</li>
											<li>• Mention entities and their relationships</li>
											<li>• Specify diagram type (class, sequence, etc.)</li>
											<li>• Edit the generated code for fine-tuning</li>
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Main content */}
					<div className="lg:col-span-3">
						<Tabs
							value={activeTab}
							onValueChange={setActiveTab}
							className="w-full"
						>
							<div className="flex justify-between items-center mb-4">
								<TabsList>
									<TabsTrigger
										value="editor"
										className="flex items-center gap-2"
									>
										<Code className="h-4 w-4" />
										Editor
									</TabsTrigger>
									<TabsTrigger
										value="preview"
										className="flex items-center gap-2"
									>
										<FileCode className="h-4 w-4" />
										Preview
									</TabsTrigger>
									<TabsTrigger
										value="split"
										className="flex items-center gap-2"
									>
										<LayoutTemplate className="h-4 w-4" />
										Split View
									</TabsTrigger>
								</TabsList>

								<div className="flex items-center gap-2">
									<Button variant="outline" size="sm">
										<Copy className="h-4 w-4 mr-2" />
										Copy
									</Button>
									<Button variant="outline" size="sm">
										<Download className="h-4 w-4 mr-2" />
										Export
									</Button>
								</div>
							</div>

							<TabsContent value="editor" className="mt-0">
								<Card>
									<CardContent className="p-0">
										<div className="border rounded-md">
											<div className="bg-muted/50 p-2 border-b flex items-center justify-between">
												<div className="text-sm font-medium">PlantUML Code</div>
												<div className="text-xs text-muted-foreground">
													Syntax: PlantUML
												</div>
											</div>
											<div
												ref={editorRef}
												className="p-4 font-mono text-sm h-[500px] overflow-auto"
											>
												<Textarea
													value={umlCode}
													onChange={e => setUmlCode(e.target.value)}
													className="font-mono h-full border-0 focus-visible:ring-0 resize-none"
												/>
											</div>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="preview" className="mt-0">
								<Card>
									<CardContent className="p-0">
										<div className="border rounded-md">
											<div className="bg-muted/50 p-2 border-b flex items-center justify-between">
												<div className="text-sm font-medium">
													Diagram Preview
												</div>
												<div className="text-xs text-muted-foreground">
													{isGenerating ? 'Generating...' : 'Ready'}
												</div>
											</div>
											<div className="h-[500px] overflow-auto">
												{renderUML()}
											</div>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="split" className="mt-0">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<Card>
										<CardContent className="p-0">
											<div className="border rounded-md">
												<div className="bg-muted/50 p-2 border-b flex items-center justify-between">
													<div className="text-sm font-medium">
														PlantUML Code
													</div>
													<div className="text-xs text-muted-foreground">
														Syntax: PlantUML
													</div>
												</div>
												<div className="p-4 font-mono text-sm h-[500px] overflow-auto">
													<Textarea
														value={umlCode}
														onChange={e => setUmlCode(e.target.value)}
														className="font-mono h-full border-0 focus-visible:ring-0 resize-none"
													/>
												</div>
											</div>
										</CardContent>
									</Card>

									<Card>
										<CardContent className="p-0">
											<div className="border rounded-md">
												<div className="bg-muted/50 p-2 border-b flex items-center justify-between">
													<div className="text-sm font-medium">
														Diagram Preview
													</div>
													<div className="text-xs text-muted-foreground">
														{isGenerating ? 'Generating...' : 'Ready'}
													</div>
												</div>
												<div className="h-[500px] border overflow-auto">
													{renderUML()}
												</div>
											</div>
										</CardContent>
									</Card>
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</main>
		</div>
	)
}
