"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import UploadBox from "@/components/upload-box"
import TextDetector from "@/components/text-detector"
import ResultsPanel from "@/components/results-panel"
import HowItWorks from "@/components/how-it-works"
import AboutProject from "@/components/about-project"
import Footer from "@/components/footer"

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    status: "real" | "ai-generated"
    confidence: number
  } | null>(null)

  const [activeTab, setActiveTab] = useState<"image" | "text">("image")

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
      setResult(null)
    }
    reader.readAsDataURL(file)
  }

  const handleAnalyzeImage = async () => {
    if (!uploadedImage) return

    setIsAnalyzing(true)

    // Placeholder function - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockResult = {
      status: Math.random() > 0.5 ? "ai-generated" : ("real" as const),
      confidence: Math.round((0.75 + Math.random() * 0.24) * 100),
    }

    setResult(mockResult)
    setIsAnalyzing(false)
  }

  const handleAnalyzeText = async (text: string) => {
    setIsAnalyzing(true)

    // Placeholder function - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockResult = {
      status: Math.random() > 0.5 ? "ai-generated" : ("real" as const),
      confidence: Math.round((0.75 + Math.random() * 0.24) * 100),
    }

    setResult(mockResult)
    setIsAnalyzing(false)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <HeroSection />

        <div className="flex justify-center gap-4 my-12">
          <Button
            onClick={() => {
              setActiveTab("image")
              setResult(null)
              setUploadedImage(null)
            }}
            variant={activeTab === "image" ? "default" : "outline"}
            className={activeTab === "image" ? "bg-primary text-primary-foreground glow-neon" : ""}
          >
            Image Detector
          </Button>
          <Button
            onClick={() => {
              setActiveTab("text")
              setResult(null)
            }}
            variant={activeTab === "text" ? "default" : "outline"}
            className={activeTab === "text" ? "bg-secondary text-secondary-foreground glow-blue" : ""}
          >
            Text Detector
          </Button>
        </div>

        {activeTab === "image" && (
          <>
            <div className="my-12">
              <UploadBox onImageUpload={handleImageUpload} uploadedImage={uploadedImage} />
            </div>

            {uploadedImage && (
              <div className="flex justify-center my-8">
                <Button
                  onClick={handleAnalyzeImage}
                  disabled={isAnalyzing}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-neon"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                </Button>
              </div>
            )}
          </>
        )}

        {activeTab === "text" && (
          <div className="my-12">
            <TextDetector onTextAnalyze={handleAnalyzeText} isAnalyzing={isAnalyzing} />
          </div>
        )}

        {result && <ResultsPanel status={result.status} confidence={result.confidence} />}
      </div>

      <HowItWorks />
      <AboutProject />
      <Footer />
    </main>
  )
}
