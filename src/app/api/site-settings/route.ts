import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/sanity/client';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 API: Fetching site settings for client...');
    
    const settings = await sanityClient.fetch(
      `*[_type == "siteSettings"][0]{
        "logo": logo.asset->url, 
        logoAlt,
        showBlogPage,
        showFaqPage,
        footerText, 
        footerLinks,
        "legalPages": *[_type == "page" && showInFooter == true && isPublished == true] | order(footerOrder asc) {
          title,
          slug
        }
      }`
    );
    
    console.log('📋 API: Site settings fetched:', settings);
    
    return NextResponse.json(settings || {}, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error('❌ API: Failed to fetch site settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site settings' },
      { status: 500 }
    );
  }
}