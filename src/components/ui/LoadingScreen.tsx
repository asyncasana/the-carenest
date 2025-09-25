"use client";

import { Container } from "./Container";

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white flex items-center justify-center">
      <Container className="text-center">
        <div className="space-y-8">
          {/* Elegant loading text */}
          <div className="space-y-3">
            <h2 className="text-lg font-light text-neutral-800 tracking-wide">
              The Carenest
            </h2>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
