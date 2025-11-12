import React, { useState } from 'react';

interface HeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const Hero: React.FC<HeroProps> = ({ searchTerm, onSearchChange }) => {
  const [activeTab, setActiveTab] = useState<'delivery' | 'pickup'>('delivery');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already happening on change, but this prevents form submission reload
    // In a real app, this might trigger the search
  };

  return (
    <section className="bg-yellow-400 py-16 sm:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Are you starving?</h2>
          <p className="mt-4 text-lg text-white">Within a few clicks, find meals that are accessible near you</p>
        </div>
        <div className="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-2xl">
          <div className="flex border-b border-gray-200 mb-4">
            <button
              onClick={() => setActiveTab('delivery')}
              className={`flex items-center px-4 py-2 text-sm font-medium -mb-px border-b-2 ${activeTab === 'delivery' ? 'border-yellow-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v5a1 1 0 001 1h2.05a2.5 2.5 0 014.9 0H21a1 1 0 001-1V8a1 1 0 00-1-1h-7z" /></svg>
              Delivery
            </button>
            <button
              onClick={() => setActiveTab('pickup')}
              className={`flex items-center px-4 py-2 text-sm font-medium -mb-px border-b-2 ${activeTab === 'pickup' ? 'border-yellow-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              Pickup
            </button>
          </div>
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="food-search"
                type="search"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="What do you like to eat today?"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              Find Meal
            </button>
          </form>
        </div>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 z-0 hidden lg:block">
        <div className="w-[32rem] h-[32rem] bg-yellow-300 rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
