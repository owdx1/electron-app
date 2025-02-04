import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Video, Users, Zap, Shield, Globe, Heart, MessageCircle, Phone, Share2, Crown } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="bg-blue-100 rounded p-4">
            <Video className="w-12 h-12 text-blue-600 rounded" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            Connect with Friends, <span className="text-blue-600 animate-rainbow ml-2"> Anywhere</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Experience crystal-clear video calls with unlimited possibilities. Fast, reliable, and secure video chatting platform for staying connected with those who matter most.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-blue-600 rounded hover:bg-blue-700">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className='rounded'>
              See How It Works
            </Button>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6">
            <CardContent className="space-y-4 pt-6">
              <div className="bg-green-100 rounded p-3 w-fit">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="text-gray-600">Ultra-low latency video calls with crystal clear quality, powered by cutting-edge technology.</p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="space-y-4 pt-6">
              <div className="bg-purple-100 rounded p-3 w-fit">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Secure & Private</h3>
              <p className="text-gray-600">End-to-end encryption ensures your conversations stay private and secure.</p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="space-y-4 pt-6">
              <div className="bg-orange-100 rounded p-3 w-fit">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold">Available Worldwide</h3>
              <p className="text-gray-600">Connect with friends and family from anywhere in the world, anytime.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features List */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <Users className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Group Calls</h3>
                <p className="text-gray-600">Host video calls with up to 50 participants simultaneously.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MessageCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Chat Features</h3>
                <p className="text-gray-600">Built-in chat functionality during video calls with emoji support.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Share2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Screen Sharing</h3>
                <p className="text-gray-600">Share your screen with one click for better collaboration.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Crown className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600">HD video and clear audio quality for the best experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-blue-600 rounded-2xl p-8 md:p-16 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Connect?</h2>
          <p className="text-xl mb-8 opacity-90">Join millions of users already enjoying seamless video chats.</p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            Start Video Chatting Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <Video className="w-6 h-6 text-blue-600" />
            <span className="font-semibold">VideoChat</span>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;