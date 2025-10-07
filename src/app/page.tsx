"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Menu, X } from 'lucide-react';

export default function DisneyCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [animationStage, setAnimationStage] = useState(0);
  const totalSlides = 2;

  const characters = [
    { 
      name: 'Rosetta', 
      subtitle: 'Tinker Bell', 
      color: 'from-pink-500 to-pink-700', 
      image: '/rose.png',
      description: 'A garden fairy who loves beauty and nature. She has a strong personality and cares deeply about her appearance.',
      images: ['🌺', '🌷', '🌹']
    },
    { 
      name: 'Sadness', 
      subtitle: 'Inside Out', 
      color: 'from-blue-500 to-blue-700', 
      image: '/sad.png',
      description: 'An emotion who helps Riley process difficult feelings. She teaches us that it\'s okay to be sad sometimes.',
      images: ['💙', '😭', '🌧️']
    },
    { 
      name: 'Disgust', 
      subtitle: 'Inside Out', 
      color: 'from-green-500 to-green-700', 
      image: '/dis.png',
      description: 'An emotion who keeps Riley from being poisoned physically and socially. She has high standards and strong opinions.',
      images: ['💚', '🥗', '✨']
    },
    { 
      name: 'Judy', 
      subtitle: 'Zootopia', 
      color: 'from-indigo-500 to-indigo-700', 
      image: '/jud.png',
      description: 'A determined bunny who becomes the first rabbit police officer. She never gives up on her dreams.',
      images: ['🥕', '👮', '🌟']
    },
    { 
      name: 'Moana', 
      subtitle: 'Moana', 
      color: 'from-orange-500 to-orange-700', 
      image: '/moana.png',
      description: 'A brave voyager who sets sail to save her island. She discovers her true calling on the ocean.',
      images: ['🌊', '⛵', '🐚']
    },
    { 
      name: 'Vanellope', 
      subtitle: 'Wreck-It Ralph', 
      color: 'from-green-400 to-green-600', 
      image: '/ven.png',
      description: 'A glitchy racing champion with a sweet personality. She proves that being different can be your greatest strength.',
      images: ['🏎️', '🍭', '👑']
    }
  ];

  const getCardHeight = (index: number, slide: number): string => {
    if (slide === 0) {
      if (index === 0) return 'h-[380px]';
      if (index === 1) return 'h-[320px]';
      if (index === 2) return 'h-[380px]';
      if (index === 3) return 'h-[260px] opacity-60 scale-90';
    } else if (slide === 1) {
      if (index === 0 || index === 1 || index === 2) return 'h-[260px] opacity-60 scale-90';
      if (index === 3 || index === 4) return 'h-[380px]';
      if (index === 5) return 'h-[260px]';
    }
    return 'h-[400px]';
  };

  // Build an image path from the character name as fallback if image not given
  const nameToImagePath = (name: string): string => `/${name.toLowerCase().replace(/\s+/g, '-')}.png`;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleCardClick = (index: number) => {
    setSelectedCard(index);
    setAnimationStage(0);
    
    // Stage 1: Other cards disappear (0ms)
    setTimeout(() => setAnimationStage(1), 100);
    
    // Stage 2: Card zooms in (500ms)
    setTimeout(() => setAnimationStage(2), 600);
    
    // Stage 3: Text appears line by line (1500ms)
    setTimeout(() => setAnimationStage(3), 1600);
    
    // Stage 4: Images appear (2500ms)
    setTimeout(() => setAnimationStage(4), 2600);
  };

  const handleClose = () => {
    // Reverse animation stages
    setAnimationStage(5); // Images disappear
    
    setTimeout(() => setAnimationStage(6), 400); // Text disappears
    setTimeout(() => setAnimationStage(7), 800); // Card shrinks
    setTimeout(() => {
      setAnimationStage(0);
      setSelectedCard(null);
    }, 1300); // Other cards reappear
  };

  const selected = selectedCard !== null ? characters[selectedCard] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'cursive' }}>
              Disney
            </span>
            <span className="text-lg font-semibold text-gray-700">Characters</span>
          </div>
          
          <div className="flex-1 max-w-sm mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search characters..."
                className="w-full pl-9 pr-3 py-2 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
          </div>
          
          <Menu className="w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-600" />
        </div>

        {/* Carousel or Expanded View */}
        <div className="flex-1 relative overflow-hidden py-8 px-4">
          {selectedCard === null ? (
            // Normal Carousel View
            <div className="mx-auto overflow-hidden" style={{ width: 812 }}>
              <div
                className="flex gap-4 transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 812}px)`
                }}
              >
             {characters.map((character, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`min-w-[260px] rounded-[1.75rem] overflow-visible relative cursor-pointer shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-all duration-700 ease-in-out hover:scale-105 hover:-translate-y-2 ${getCardHeight(index, currentSlide)}`}
                  style={{
                    clipPath: currentSlide === 0 && index === 3 ? 'inset(0 70% 0 0)' : 'none',
                    opacity: currentSlide === 0 && index === 3 ? 0.7 : 1
                  }}
                >
                  {/* Card background */}
                  <div className={`w-full h-full bg-gradient-to-br ${character.color} rounded-[1.75rem] p-5 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none" />
                  </div>

                  {/* Character image sitting near the top of the card */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <img
                      src={character.image || nameToImagePath(character.name)}
                      alt={character.name}
                      className="h-40 w-auto drop-shadow-2xl select-none"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'
                      }}
                    />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white text-xl font-extrabold tracking-tight mb-1 drop-shadow-sm">{character.name}</h3>
                    <p className="text-white/90 text-xs">{character.subtitle}</p>
                  </div>
                </div>
                ))}
              </div>
            </div>
          ) : (
             // Expanded Card View
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="relative max-w-6xl w-full mx-8">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute -top-3 -right-3 z-50 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-100 transition-all"
                  style={{
                    opacity: animationStage >= 2 ? 1 : 0,
                    transform: animationStage >= 2 ? 'scale(1)' : 'scale(0)',
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  <X className="w-5 h-5" />
                </button>

                <div
                  className={`rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${selected?.color} transition-all duration-700 ease-in-out`}
                  style={{
                    width: animationStage >= 2 ? '100%' : '260px',
                    height: animationStage >= 2 ? '520px' : '400px',
                    margin: '0 auto',
                    transform: animationStage >= 2 ? 'scale(1)' : 'scale(1)',
                  }}
                >
                  <div className="relative w-full h-full flex items-center justify-between p-10">
                    {/* Left Side - Character Info */}
                    <div className="flex-1 pr-8">
                      {/* Character Image */}
                      <div className="mb-6 transition-all duration-500" style={{ opacity: animationStage >= 1 ? 1 : 0, transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)' }}>
                        {selected && (
                          <img
                            src={selected.image || nameToImagePath(selected.name)}
                            alt={selected.name}
                            className="h-48 w-auto drop-shadow-2xl select-none"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'
                            }}
                          />
                        )}
                      </div>

                      {/* Title - appears first */}
                      <h1
                        className="text-white text-4xl font-bold mb-3 transition-all duration-500 delay-100"
                        style={{
                          opacity: animationStage >= 3 ? 1 : 0,
                          transform: animationStage >= 3 ? 'translateX(0)' : 'translateX(-30px)'
                        }}
                      >
                        {selected?.name}
                      </h1>

                      {/* Subtitle - appears second */}
                      <p
                        className="text-white/90 text-lg mb-4 transition-all duration-500 delay-200"
                        style={{
                          opacity: animationStage >= 3 ? 1 : 0,
                          transform: animationStage >= 3 ? 'translateX(0)' : 'translateX(-30px)'
                        }}
                      >
                        {selected?.subtitle}
                      </p>

                      {/* Description - appears third */}
                      <p
                        className="text-white/95 text-base leading-relaxed transition-all duration-500 delay-300"
                        style={{
                          opacity: animationStage >= 3 ? 1 : 0,
                          transform: animationStage >= 3 ? 'translateX(0)' : 'translateX(-30px)'
                        }}
                      >
                        {selected?.description}
                      </p>

                      {/* Bottom thumbnails - appear last (use character image instead of emojis) */}
                      <div
                        className="flex gap-4 mt-6 transition-all duration-500 delay-500"
                        style={{
                          opacity: animationStage >= 4 && animationStage < 5 ? 1 : 0,
                          transform: animationStage >= 4 && animationStage < 5 ? 'translateY(0)' : 'translateY(20px)'
                        }}
                      >
                        {[0,1,2].map((idx) => (
                          <div
                            key={idx}
                            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300"
                            style={{
                              opacity: animationStage >= 4 && animationStage < 5 ? 1 : 0,
                              transform: animationStage >= 4 && animationStage < 5 ? 'scale(1)' : 'scale(0.8)',
                              transitionDelay: `${idx * 100 + 600}ms`
                            }}
                          >
                            {selected && (
                              <img
                                src={selected.image || nameToImagePath(selected.name)}
                                alt={`${selected.name} ${idx+1}`}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'
                                }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Side - Large Character Display */}
                    <div className="opacity-20 transition-all duration-700" style={{ opacity: animationStage >= 2 ? 0.2 : 0, transform: animationStage >= 2 ? 'scale(1) rotate(-6deg)' : 'scale(0.5) rotate(0deg)' }}>
                      {selected && (
                        <img
                          src={selected.image || nameToImagePath(selected.name)}
                          alt={selected.name}
                          className="h-[300px] w-auto drop-shadow-2xl select-none"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {selectedCard === null && (
          <div className="flex justify-end items-center gap-3 p-4 bg-white/50 backdrop-blur-sm">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shadow-md hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-800 disabled:hover:scale-100 disabled:hover:border-gray-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentSlide === totalSlides - 1}
              className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shadow-md hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-800 disabled:hover:scale-100 disabled:hover:border-gray-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}