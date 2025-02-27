'use client'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { RefreshCw, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'
import plantumlEncoder from 'plantuml-encoder'
import { useEffect, useState } from 'react'

const UMLViewer = ({
	umlCode,
	isGenerating,
	setImage,
}: {
	umlCode: string
	isGenerating: boolean
	setImage: (url: string) => void
}) => {
	const [generatedImage, setGeneratedImage] = useState('')
	useEffect(() => {
		async function generateUML() {
			const encodedUML = plantumlEncoder.encode(umlCode)
			const plantUMLServer = 'https://www.plantuml.com/plantuml/svg/'
			const url = plantUMLServer + encodedUML
			setImage(url)
			setGeneratedImage(url)
		}

		generateUML()
	}, [umlCode])

	try {
		return (
			<div className="flex flex-col items-center justify-center h-full bg-muted/30 rounded-md p-4 cursor-grab">
				{isGenerating ? (
					<div className="flex flex-col items-center gap-2">
						<RefreshCw className="animate-spin h-8 w-8" />
						<p>Generating diagram...</p>
					</div>
				) : (
					<TransformWrapper smooth>
						{({ zoomIn, zoomOut, resetTransform }) => (
							<>
								{/* Controls */}
								<div className="flex gap-2 mb-2">
									<button
										onClick={() => zoomIn()}
										className="p-2 bg-gray-200 rounded-md"
									>
										<ZoomIn />
									</button>
									<button
										onClick={() => zoomOut()}
										className="p-2 bg-gray-200 rounded-md"
									>
										<ZoomOut />
									</button>
									<button
										onClick={() => resetTransform()}
										className="p-2 bg-gray-200 rounded-md"
									>
										<RotateCw />
									</button>
								</div>

								{/* Image with Zoom & Pan */}
								<TransformComponent
									wrapperStyle={{ width: '100%', height: '100%' }}
								>
									<div>
										{umlCode?.length > 0 ? (
											<img
												src={generatedImage}
												alt="UML Diagram Preview"
												className="max-w-full max-h-full object-contain"
											/>
										) : (
											<p>No diagram available</p>
										)}
									</div>
								</TransformComponent>
							</>
						)}
					</TransformWrapper>
				)}
			</div>
		)
	} catch (error) {
		console.error('Error rendering UML:', error)
		return (
			<div className="flex items-center justify-center h-full bg-muted/30 rounded-md p-4">
				<div className="text-center text-muted-foreground">
					<p>Error generating diagram</p>
				</div>
			</div>
		)
	}
}

export default UMLViewer
