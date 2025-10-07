"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Menu, Search } from "lucide-react"


interface Character {
  id: number
  name: string
  movie: string
  gradient: string
  image: string
}

const characters: Character[] = [
  {
    id: 1,
    name: "Disgust",
    movie: "Inside Out",
    gradient: "from-green-400 to-emerald-600",
    image: "/disgust-inside-out-green-character-3d.jpg",
  },
  {
    id: 2,
    name: "Judy",
    movie: "Zootopia",
    gradient: "from-blue-400 via-blue-500 to-blue-600",
    image: "/cute-cartoon-rabbit-police-officer-3d-character.jpg",
  },
  {
    id: 3,
    name: "Moana",
    movie: "Moana",
    gradient: "from-orange-400 via-orange-500 to-red-500",
    image: "/moana-disney-character-3d-polynesian-girl.jpg",
  },
  {
    id: 4,
    name: "Vanellope",
    movie: "Wreck it ralph",
    gradient: "from-teal-400 via-teal-500 to-cyan-600",
    image: "/vanellope-wreck-it-ralph-3d-character-girl.jpg",
  },
  {
    id: 5,
    name: "Rosetta",
    movie: "Tinkerbell",
    gradient: "from-red-400 via-rose-500 to-pink-600",
    image: "/tinkerbell-fairy-rosetta-3d-character.jpg",
  },
  {
    id: 6,
    name: "Sadness",
    movie: "Inside Out",
    gradient: "from-blue-300 via-blue-400 to-blue-600",
    image: "/sadness-inside-out-blue-character-3d.jpg",
  },
]

export default function CharacterCarousel() {
  // Position-based carousel: 3 main cards centered, with a peek of the next card.
  const [currentIndex, setCurrentIndex] = useState(0) // index of the left-most main card
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % characters.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + characters.length) % characters.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <svg className="w-16 h-10" viewBox="0 0 120 60" fill="currentColor">
            <text x="0" y="40" fontFamily="serif" fontSize="32" fontWeight="bold" fontStyle="italic">
              Disney
            </text>
          </svg>
          <span className="text-xl md:text-2xl font-light text-gray-700">Characters</span>
        </div>

        <div className="hidden md:flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search characters..."
            className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder:text-gray-400 w-48"
          />
        </div>

        <button className="gap-2 flex items-center text-sm px-3 py-2 rounded-md hover:bg-gray-100 transition">
          <span className="hidden md:inline text-sm">Menu</span>
          <Menu className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full relative">
          <div className="relative h-[520px] md:h-[560px] flex items-center justify-center overflow-hidden">
            {/* Cards positioned around center with scale differences and peeking next card */}
            <div className="relative w-full h-full">
              {(() => {
                const CARD_W = 320
                const GAP = 24
                // Visible positions: 0,1,2 are the three main cards; 3 is a small peek on the right.
                // Also render -1 as a faint left preview for nicer motion.
                const positions = [-1, 0, 1, 2, 3]

                // Map logical slot to x offset from center and scale
                const positionToX = (pos: number) => {
                  switch (pos) {
                    case -1:
                      return -CARD_W * 1.5 - GAP * 2 // left faint preview (closer so it's visible)
                    case 0:
                      return -CARD_W - GAP // left main (largest)
                    case 1:
                      return 0 // middle, slightly smaller
                    case 2:
                      return CARD_W + GAP // right main (largest)
                    case 3:
                    default:
                      return CARD_W * 1.5 + GAP * 2 // right small peek (closer so it's visible)
                  }
                }

                const positionToScale = (pos: number) => {
                  switch (pos) {
                    case -1:
                      return 0.7
                    case 0:
                      return 1
                    case 1:
                      return 0.9
                    case 2:
                      return 1
                    case 3:
                    default:
                      return 0.75
                  }
                }

                return positions.map((p) => {
                  const index = (currentIndex + p + characters.length) % characters.length
                  const character = characters[index]
                  const x = positionToX(p)
                  const scale = positionToScale(p)
                  const zIndex = p === 1 ? 30 : p === 0 || p === 2 ? 25 : 10
                  const opacity = p === -1 || p === 3 ? 0.7 : 1

                  return (
                    <div
                      key={`pos-${p}`}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[transform,opacity] duration-500 ease-in-out will-change-transform"
                      style={{ transform: `translate(calc(-50% + ${x}px), -50%) scale(${scale})`, zIndex, opacity }}
                    >
                      <div className={`relative rounded-[2.5rem] bg-gradient-to-br ${character.gradient} shadow-2xl overflow-hidden w-[320px] h-[440px] md:w-[340px] md:h-[460px]`}>
                        <div className="absolute inset-0 flex items-end justify-center pb-4">
                          <img src={character.image || "/placeholder.svg"} alt={character.name} className="h-[92%] w-auto object-contain drop-shadow-2xl" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/20" />
                        <div className="absolute left-6 bottom-6 text-white/95 drop-shadow-sm">
                          <h3 className="text-2xl md:text-3xl font-bold">{character.name}</h3>
                          <p className="text-sm md:text-base opacity-90">Movie <span className="font-semibold">{character.movie}</span></p>
                        </div>
                      </div>
                    </div>
                  )
                })
              })()}
            </div>
          </div>

          {/* Social Links */}
          <div className="absolute bottom-0 left-8 flex items-center gap-4 text-sm text-gray-400">
            <button className="hover:text-gray-600 transition-colors">Facebook</button>
            <button className="hover:text-gray-600 transition-colors">Twitter</button>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-0 right-8 flex items-center gap-4">
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50 group"
            >
              <div className="w-10 h-10 rounded-full border-2 border-gray-700 flex items-center justify-center group-hover:bg-gray-700 group-hover:text-white transition-all">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <span className="hidden md:inline">Prev</span>
            </button>

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50 group"
            >
              <span className="hidden md:inline">Next</span>
              <div className="w-10 h-10 rounded-full border-2 border-gray-700 flex items-center justify-center group-hover:bg-gray-700 group-hover:text-white transition-all">
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
