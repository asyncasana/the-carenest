"use client";

import { useState } from "react";
import { Share2, Twitter, Facebook, Linkedin, Link, Check } from "lucide-react";

interface ShareArticleProps {
  title: string;
  url: string;
  description?: string;
}

export default function ShareArticle({
  title,
  url,
  description,
}: ShareArticleProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    text: description || title,
    url,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  // Check if native sharing is supported
  const supportsNativeShare = typeof window !== "undefined" && navigator.share;

  return (
    <div className="mt-8 pt-6 border-t border-stone-200">
      <h3 className="text-lg font-semibold text-stone-900 mb-4">
        Share this article
      </h3>

      <div className="flex flex-wrap gap-3">
        {/* Native Share (mobile/supported browsers) */}
        {supportsNativeShare && (
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-colors"
          >
            <Share2 size={18} />
            <span className="text-sm font-medium">Share</span>
          </button>
        )}

        {/* Twitter */}
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors"
        >
          <Twitter size={18} />
          <span className="text-sm font-medium">Twitter</span>
        </a>

        {/* Facebook */}
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Facebook size={18} />
          <span className="text-sm font-medium">Facebook</span>
        </a>

        {/* LinkedIn */}
        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
        >
          <Linkedin size={18} />
          <span className="text-sm font-medium">LinkedIn</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg transition-colors"
        >
          {copied ? (
            <Check size={18} className="text-amber-600" />
          ) : (
            <Link size={18} />
          )}
          <span className="text-sm font-medium">
            {copied ? "Copied!" : "Copy Link"}
          </span>
        </button>
      </div>
    </div>
  );
}
