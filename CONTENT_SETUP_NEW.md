# Content Setup Checklist for Sanity Studio

## 🎯 **IMPROVED: New Schema Structure**

We've restructured Sanity for better content management! Each page and content type now has its own section:

## **📍 Sanity Studio URL:**

`http://localhost:3000/studio`

---

## **✨ NEW SCHEMAS - Much Clearer Organization:**

### 1. **🏠 Homepage** (CRITICAL - Required)

Create one homepage document with:

- **Hero Title**: "Find trusted care and wellbeing support in your area"
- **Hero Subtitle**: "A carefully curated directory of quality care services across Colchester, Tendring, and nearby areas."
- **Intro Text**: "Whether you're looking for elderly care, mental health support, disability services, or family assistance, we've gathered trusted providers to help you make informed decisions about care."
- **CTA Button Text**: "Search Directory"
- **CTA Button URL**: "/directory"
- **Search Section Title**: "Find Care Services"

### 2. **📞 Contact Page** (CRITICAL - Required)

Create one contact page document with:

- **Page Title**: "Contact Us"
- **Page Description**: "We'd love to hear from you. Whether you have questions about our directory, want to suggest a service, or need help finding the right care support, we're here to help."
- **Contact Email**: "info@thecarenest.co.uk"
- **Service Area**: "Colchester, Tendring, and nearby areas"
- **Response Time Promise**: "We aim to respond within 24 hours"
- **How We Can Help**: (Add each as separate items)
  - "Finding the right care services"
  - "Questions about our directory"
  - "Suggesting new services to include"
  - "Reporting outdated information"
  - "General support and guidance"

### 3. **🏷️ Service Categories** (Required for search)

Create categories with clearer names:

- **Category Name**: "Elderly Care" (Display Order: 1)
- **Category Name**: "Mental Health Support" (Display Order: 2)
- **Category Name**: "Disability Support" (Display Order: 3)
- **Category Name**: "Family Support" (Display Order: 4)
- **Category Name**: "Home Care Services" (Display Order: 5)
- **Category Name**: "Healthcare Services" (Display Order: 6)
- **Category Name**: "Therapy & Counselling" (Display Order: 7)

### 4. **🏥 Directory Entry** (For care providers)

Much more detailed fields:

- **Service/Provider Name**: Name of the care service
- **Short Description**: Brief summary for directory cards
- **Service Categories**: Link to the categories above
- **Service Area**: Colchester, Tendring, or Nearby Areas
- **Contact Info**: Website, phone, email
- **Full Service Description**: Rich text content
- **Photo Gallery**: Multiple images with captions
- **Opening Hours**: Days and times
- **Areas of Expertise**: Specializations
- **Qualifications**: Certifications and accreditations
- **Client Reviews**: Testimonials with star ratings

### 5. **⚙️ Global Site Settings** (Simplified)

Just essential site-wide settings:

- **Site Title**: For SEO and browser tabs
- **Site Description**: For search engines
- **Logo**: Site logo image
- **Footer Text**: Copyright notice
- **Footer Links**: Terms, Privacy, Social links
- **Enable Blog Section**: Show/hide blog
- **Enable FAQ Section**: Show/hide FAQ

---

## **🚀 Key Improvements:**

✅ **Clearer Names**: "Directory Entry" instead of "Entry"  
✅ **Better Organization**: Each page has its own schema  
✅ **More Fields**: Detailed content for rich directory pages  
✅ **User-friendly**: Field names that make sense to non-developers  
✅ **Better Categories**: Unified system for search and directory  
✅ **Rich Content**: Support for images, testimonials, detailed descriptions

---

## **⚡ Quick Start Order:**

1. **Create Homepage** - Essential for hero section
2. **Create Contact Page** - Essential for contact form to work
3. **Create Service Categories** - Essential for search dropdown
4. **Create Global Site Settings** - Essential for footer/navigation
5. **Add Directory Entries** - Add care providers (optional but recommended)

---

## **🚨 Critical Notes:**

- **No fallback content** - Everything must be added in Sanity
- **Homepage & Contact Page are required** - Site won't work without them
- **Categories needed** for search functionality
- **All content is now manageable** from Sanity Studio

---

## **📱 Icons in Sanity Studio:**

- 🏠 Homepage
- 📞 Contact Page
- 🏥 Directory Entry
- 🏷️ Service Categories
- 📝 Blog Posts
- ❓ FAQs
- 📄 Pages
- ⚙️ Global Site Settings
