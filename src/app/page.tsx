"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Menu, X, ChevronDown } from 'lucide-react';

export default function DisneyCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [animationStage, setAnimationStage] = useState(0);
  const totalSlides = 2; // Total slides: 6 characters / 3 per slide = 2 slides

  const characters = [
    { 
      name: 'Rosetta', 
      subtitle: 'Tinkerbell', 
      color: 'from-red-400 to-red-600', 
      image: '/rose.png',
      description: 'A garden fairy who loves beauty and nature. She has a strong personality and cares deeply about her appearance.',
      images: ['🌺', '🌷', '🌹']
    },
    { 
      name: 'Sadness', 
      subtitle: 'Inside Out', 
      color: 'from-blue-400 to-blue-600', 
      image: '/sad.png',
      description: 'An emotion who helps Riley process difficult feelings. She teaches us that it\'s okay to be sad sometimes.',
      images: ['💙', '😭', '🌧️']
    },
    { 
      name: 'Disgust', 
      subtitle: 'Inside Out', 
      color: 'from-green-400 to-green-600', 
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

  // Update card heights to match the reference images exactly
  const getCardHeight = (index: number, slide: number): string => {
    if (slide === 0) {
      // First slide - Sadness (middle) taller than Rosetta and Disgust
      if (index === 0) return 'h-60'; // Rosetta - standard height
      if (index === 1) return 'h-64'; // Sadness - slightly taller
      if (index === 2) return 'h-60'; // Disgust - standard height
    } else if (slide === 1) {
      // Second slide - All three cards with different heights
      if (index === 3) return 'h-60'; // Judy - standard height
      if (index === 4) return 'h-64'; // Moana - taller (center card)
      if (index === 5) return 'h-58'; // Vanellope - slightly shorter
    }
    return 'h-60'; // Default standard height
  };
  
  const getImageOffset = (): string => {
    // Consistent image positioning for all cards - part inside, part outside
    return 'mb-[-2.5rem]';
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
    // Reverse animation stages with smoother transitions
    setAnimationStage(5); // Start closing - clips fade out
    
    setTimeout(() => setAnimationStage(6), 200); // Text slides out
    setTimeout(() => setAnimationStage(7), 400); // Logo and content fade
    setTimeout(() => setAnimationStage(8), 600); // Character image slides out
    setTimeout(() => setAnimationStage(9), 800); // Left panel slides away
    setTimeout(() => {
      setAnimationStage(0);
      setSelectedCard(null);
    }, 1200); // Complete close
  };

  const selected = selectedCard !== null ? characters[selectedCard] : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/disney-logo.png" alt="Disney" className="h-10 w-auto" />
            <span className="text-lg text-gray-700 font-medium">Characters</span>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search characters..."
                className="w-full pl-12 pr-4 py-2.5 rounded-full bg-gray-100 border-none focus:outline-none focus:ring-0 text-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Menu</span>
            <div className="h-8 w-8 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {selectedCard === null ? (
          // Carousel View
          <div className="pt-12 pb-8">
            <div className="max-w-6xl mx-auto px-8">
              <div
                className="flex gap-6 transition-transform duration-700 ease-out items-end"
                style={{
                  transform: `translateX(-${currentSlide * (260 * 3 + 12 * 2)}px)` // Move by 3 cards + 2 gaps
                }}
              >
                {characters.map((character, index) => {
                  // Only show cards that belong to the current slide (3 per slide)
                  const isVisible = (Math.floor(index / 3) === currentSlide);
                  
                  if (!isVisible && Math.abs(Math.floor(index / 3) - currentSlide) > 1) {
                    // Skip rendering cards that are not in adjacent slides (optimization)
                    return null;
                  }
                  
                  return (
                    <div
                      key={index}
                      onClick={() => handleCardClick(index)}
                      className={`relative min-w-[260px] cursor-pointer transition-all duration-500 ${
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                      }`}
                    >
                      {/* Character Image - positioned with consistent offset on all cards */}
                      <div className="relative z-10 flex justify-center mb-[-2.5rem]">
                        <img
                          src={character.image || nameToImagePath(character.name)}
                          alt={character.name}
                          className="w-auto drop-shadow-xl select-none object-contain transition-transform duration-300 hover:scale-105 h-48"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'
                          }}
                        />
                      </div>

                      {/* Character Card with variable heights */}
                      <div className={`w-full bg-gradient-to-br ${character.color} rounded-3xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 ${getCardHeight(index, currentSlide)}`}>
                        <div className="flex flex-col justify-end h-full">
                          <h3 className="text-white text-2xl font-bold mb-1">
                            {character.name}
                          </h3>
                          <div className="flex items-center gap-1 text-white/80">
                            <span className="text-xs font-medium">Movie:</span>
                            <span className="text-xs">{character.subtitle}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full ${currentSlide === idx ? 'bg-gray-500' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-start gap-8 mt-16 ml-8">
              <button className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium">
                Facebook
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium">
                Twitter
              </button>
            </div>
          </div>
        ) : (
           // Expanded Card View - Added closing animations
          <div 
            className="fixed inset-0 z-50 bg-white"
            style={{
              opacity: animationStage <= 8 ? 1 : 0,
              transition: 'opacity 0.3s ease-out'
            }}
          >
            <div className="relative w-full h-full">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 z-50 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all"
                style={{
                  opacity: animationStage >= 2 && animationStage < 6 ? 1 : 0,
                  transform: animationStage >= 2 && animationStage < 6 ? 'scale(1)' : 'scale(0.8)',
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                <X className="w-5 h-5" />
                <span className="text-sm font-medium">Close</span>
              </button>

              <div className="w-full h-full flex">
                {/* Left Side - Character Image and Vertical Name */}
                <div 
                  className={`w-2/5 bg-gradient-to-br ${selected?.color} relative overflow-hidden`}
                  style={{
                    opacity: animationStage >= 1 && animationStage < 9 ? 1 : 0,
                    transform: animationStage >= 1 && animationStage < 9 
                      ? 'translateX(0)' 
                      : animationStage >= 9 
                        ? 'translateX(-100%)' 
                        : 'translateX(-100px)',
                    transition: animationStage >= 9 
                      ? 'all 0.4s ease-in' 
                      : 'all 0.8s ease-out'
                  }}
                >
                  {/* Vertical Character Name */}
                  <div 
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-20"
                    style={{
                      opacity: animationStage >= 2 && animationStage < 8 ? 1 : 0,
                      transform: animationStage >= 2 && animationStage < 8 
                        ? 'translateY(-50%) scale(1)' 
                        : 'translateY(-50%) scale(0.9)',
                      transition: 'all 0.4s ease-out'
                    }}
                  >
                    <div 
                      className="text-white font-bold"
                      style={{
                        fontSize: '3.5rem',
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        letterSpacing: '0.15em',
                        textShadow: '0 4px 8px rgba(0,0,0,0.3)'
                      }}
                    >
                      {selected?.name}
                    </div>
                  </div>

                  {/* Character Image */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center pl-20 pr-8"
                    style={{
                      opacity: animationStage >= 1 && animationStage < 8 ? 1 : 0,
                      transform: animationStage >= 1 && animationStage < 8 
                        ? 'translateX(0) scale(1)' 
                        : animationStage >= 8
                          ? 'translateX(-50px) scale(0.8)'
                          : 'translateX(50px) scale(0.8)',
                      transition: animationStage >= 8 
                        ? 'all 0.4s ease-in' 
                        : 'all 0.6s ease-out'
                    }}
                  >
                    {selected && (
                      <img
                        src={selected.image || nameToImagePath(selected.name)}
                        alt={selected.name}
                        className="max-w-full max-h-[80%] object-contain drop-shadow-2xl"
                        style={{
                          filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.3))'
                        }}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'
                        }}
                      />
                    )}
                  </div>

                  {/* Movie Title at Bottom */}
                  <div 
                    className="absolute bottom-8 left-6 right-6 z-20"
                    style={{
                      opacity: animationStage >= 3 && animationStage < 7 ? 1 : 0,
                      transform: animationStage >= 3 && animationStage < 7 
                        ? 'translateY(0)' 
                        : 'translateY(20px)',
                      transition: 'all 0.3s ease-out'
                    }}
                  >
                    <p className="text-white/90 text-base font-medium tracking-wide">
                      Movie {selected?.subtitle}
                    </p>
                  </div>

                  {/* Navigation Chevron */}
                  <div 
                    className="absolute bottom-8 right-8 z-20"
                    style={{
                      opacity: animationStage >= 3 && animationStage < 7 ? 1 : 0,
                      transform: animationStage >= 3 && animationStage < 7 
                        ? 'rotate(90deg) scale(1)' 
                        : 'rotate(90deg) scale(0)',
                      transition: 'all 0.3s ease-out'
                    }}
                  >
                    <ChevronDown className="w-5 h-5 text-white/60" />
                  </div>
                </div>

                {/* Right Side - Content */}
                <div 
                  className="w-3/5 bg-white relative"
                  style={{
                    opacity: animationStage >= 2 && animationStage < 7 ? 1 : 0,
                    transform: animationStage >= 2 && animationStage < 7 
                      ? 'translateX(0)' 
                      : animationStage >= 7
                        ? 'translateX(50px)'
                        : 'translateX(50px)',
                    transition: animationStage >= 7 
                      ? 'all 0.4s ease-in' 
                      : 'all 0.6s ease-out'
                  }}
                >
                  <div className="h-full flex flex-col p-12">
                    {/* Header with Character Name and Inside Out Logo */}
                    <div 
                      className="mb-8"
                      style={{
                        opacity: animationStage >= 3 && animationStage < 6 ? 1 : 0,
                        transform: animationStage >= 3 && animationStage < 6 
                          ? 'translateY(0)' 
                          : animationStage >= 6
                            ? 'translateY(-30px)'
                            : 'translateY(30px)',
                        transition: animationStage >= 6 
                          ? 'all 0.3s ease-in' 
                          : 'all 0.6s ease-out 0.2s'
                      }}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <h2 className="text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                          {selected?.name}
                        </h2>
                        
                        {/* Inside Out Logo */}
                        <div className="relative flex-shrink-0 ml-6">
                          <div className="relative">
                            <div 
                              className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl px-4 py-2 transform -rotate-6 shadow-lg"
                              style={{ 
                                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24, #fd79a8)',
                                borderRadius: '20px'
                              }}
                            >
                              <div className="text-white font-black text-sm tracking-wider">
                                INSIDE
                              </div>
                            </div>
                            <div 
                              className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl px-4 py-2 transform rotate-6 shadow-lg -mt-3 ml-3"
                              style={{ 
                                background: 'linear-gradient(135deg, #74b9ff, #0984e3, #6c5ce7)',
                                borderRadius: '20px'
                              }}
                            >
                              <div className="text-white font-black text-sm tracking-wider">
                                OUT
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-gray-500 text-lg">
                        Movie <span className="font-medium text-gray-700">{selected?.subtitle}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div 
                      className="mb-8 flex-1"
                      style={{
                        opacity: animationStage >= 3 && animationStage < 6 ? 1 : 0,
                        transform: animationStage >= 3 && animationStage < 6 
                          ? 'translateY(0)' 
                          : animationStage >= 6
                            ? 'translateY(-20px)'
                            : 'translateY(30px)',
                        transition: animationStage >= 6 
                          ? 'all 0.3s ease-in 0.1s' 
                          : 'all 0.6s ease-out 0.4s'
                      }}
                    >
                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        Sadness is literally the very definition and being of sorrow and gloom. She is hardly ever used because Joy is the boss and doesn&apos;t want Riley to ever be sad, even when she needs to be. Because of this, Joy treats Sadness badly.
                      </p>
                    </div>

                    {/* Clips Section */}
                    <div 
                      className="mt-auto"
                      style={{
                        opacity: animationStage >= 4 && animationStage < 5 ? 1 : 0,
                        transform: animationStage >= 4 && animationStage < 5 
                          ? 'translateY(0) scale(1)' 
                          : animationStage >= 5
                            ? 'translateY(20px) scale(0.95)'
                            : 'translateY(30px) scale(0.95)',
                        transition: animationStage >= 5 
                          ? 'all 0.2s ease-in' 
                          : 'all 0.6s ease-out 0.6s'
                      }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-wide">
                        Clips
                      </h3>
                      
                      <div className="grid grid-cols-3 gap-4">
                        {[0, 1, 2].map((idx) => (
                          <div
                            key={idx}
                            className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 shadow-md"
                            style={{
                              opacity: animationStage >= 4 && animationStage < 5 ? 1 : 0,
                              transform: animationStage >= 4 && animationStage < 5 
                                ? 'scale(1)' 
                                : 'scale(0.9)',
                              transition: animationStage >= 5 
                                ? `all 0.2s ease-in ${idx * 50}ms`
                                : `all 0.4s ease-out ${idx * 150 + 800}ms`
                            }}
                          >
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                              {selected && (
                                <img
                                  src={selected.image || nameToImagePath(selected.name)}
                                  alt={`${selected.name} clip ${idx + 1}`}
                                  className="w-2/3 h-2/3 object-contain"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      {selectedCard === null && (
        <div className="fixed bottom-0 left-0 right-0 bg-white py-4">
          <div className="max-w-7xl mx-auto flex justify-end items-center gap-2 px-6">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm ml-1">Prev</span>
            </button>
            
            <span className="mx-3 text-gray-300">|</span>
            
            <button
              onClick={handleNext}
              disabled={currentSlide === totalSlides - 1}
              className="flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400"
            >
              <span className="text-sm mr-1">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}