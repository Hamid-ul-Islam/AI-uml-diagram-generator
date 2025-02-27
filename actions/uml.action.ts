'use server'
import { diagramTemplates } from '@/constants'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

export async function generateUMLAction(
	description: string,
	diagramType: string,
) {
	const prompt = `Generate ${diagramType} PlantUML code for the following story: ${description}. Return only the UML code, no additional text, no markdown or explanations. Learn updated syntax from the following diagram templates: ${JSON.stringify(
		diagramTemplates,
	)}`

	try {
		const result = await model.generateContent(prompt)
		const responseText = result.response.text()
		const umlCode = extractPlantUMLCode(responseText) // Extract PlantUML code
		return umlCode
	} catch (error) {
		console.error(error)
		throw error
	}
}

// Function to extract PlantUML code from the response sometimes the response is not in the correct format
function extractPlantUMLCode(responseText: string) {
	const plantUMLRegex = /```plantuml([\s\S]*?)```/ // Regex to match PlantUML code blocks
	const match = responseText.match(plantUMLRegex)
	if (match && match[1]) {
		return match[1].trim() // Return the extracted PlantUML code
	}
	return null // Return null if no PlantUML code is found
}
