"use client";
import { useState } from "react";
import ProfessionalLoader from "./Loader2";

export default function LoaderDemo() {
  const [selectedVariant, setSelectedVariant] = useState<"rings" | "pulse" | "wave" | "dots" | "spiral">("rings");
  const [selectedSize, setSelectedSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [customText, setCustomText] = useState("Loading");
  const [showText, setShowText] = useState(true);

  const variants = [
    { value: "rings", label: "Rings" },
    { value: "pulse", label: "Pulse" },
    { value: "wave", label: "Wave" },
    { value: "dots", label: "Dots" },
    { value: "spiral", label: "Spiral" },
  ];

  const sizes = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "Extra Large" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Professional Loader Demo
        </h1>
        
        {/* Controls */}
        <div className="bg-black rounded-xl p-6 mb-8 border border-gray-800">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Customization Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Variant Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Animation Variant
              </label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value as any)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {variants.map((variant) => (
                  <option key={variant.value} value={variant.value}>
                    {variant.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Size
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as any)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sizes.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Text */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Loading Text
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter custom text..."
              />
            </div>

            {/* Show Text Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Show Text
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={showText}
                  onChange={(e) => setShowText(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-2 text-gray-300">{showText ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loader Display */}
        <div className="flex justify-center">
          <ProfessionalLoader
            variant={selectedVariant}
            size={selectedSize}
            text={customText}
            showText={showText}
          />
        </div>

        {/* All Variants Showcase */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            All Animation Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {variants.map((variant) => (
              <div key={variant.value} className="text-center">
                <h3 className="text-lg font-semibold text-blue-400 mb-4">
                  {variant.label}
                </h3>
                <ProfessionalLoader
                  variant={variant.value as any}
                  size="md"
                  text={variant.label}
                  showText={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* All Sizes Showcase */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            All Sizes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sizes.map((size) => (
              <div key={size.value} className="text-center">
                <h3 className="text-lg font-semibold text-blue-400 mb-4">
                  {size.label}
                </h3>
                <ProfessionalLoader
                  variant="rings"
                  size={size.value as any}
                  text={size.label}
                  showText={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-16 bg-black rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Usage Examples</h2>
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">Basic Usage:</h3>
              <code className="text-green-400 text-sm">
                {`<ProfessionalLoader />`}
              </code>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">Custom Variant:</h3>
              <code className="text-green-400 text-sm">
                {`<ProfessionalLoader variant="spiral" size="lg" text="Processing..." />`}
              </code>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">Without Text:</h3>
              <code className="text-green-400 text-sm">
                {`<ProfessionalLoader showText={false} variant="pulse" />`}
              </code>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">Custom Styling:</h3>
              <code className="text-green-400 text-sm">
                {`<ProfessionalLoader className="my-custom-class" variant="wave" />`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 