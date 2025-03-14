import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, you would fetch this data from an actual media API
  // For now, we'll return mock data
  const mediaData = {
    nowPlaying: {
      title: "Mint Green Dreams",
      artist: "Modern Vibes",
      albumArt: "/placeholder.svg?height=100&width=100",
      currentTime: "2:14",
      duration: "3:45",
      progress: 0.66, // Progress as a percentage (0-1)
    },
    queue: [
      { title: "Paper Bag Memories", artist: "The Mocha Collective", duration: "4:12" },
      { title: "Charcoal Nights", artist: "Grey Tones", duration: "3:28" },
    ],
    controls: {
      isPlaying: false,
    },
  }

  return NextResponse.json(mediaData)
}

