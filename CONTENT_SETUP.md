# Content Setup Checklist for Sanity Studio

## 🎯 **Required Content to Add in Sanity Studio**

Since we removed all hardcoded fallbacks, you need to add this content in Sanity Studio at `http://localhost:3000/studio`

### 1. **Site Settings** (CRITICAL - Required for site to work)

Go to **Site Settings** in Sanity Studio and fill in:

**Basic Info:**

- Site Title: "The Carenest - Care Directory for Colchester & Tendring"
- Site Description: "A trusted directory of wellbeing and care services in Colchester, Tendring, and nearby areas."

**Homepage Hero:**

- Hero Title: "Find trusted care and wellbeing support in your area"
- Hero Text: "A carefully curated directory of quality care services across Colchester, Tendring, and nearby areas."
- Intro Text: "Whether you're looking for elderly care, mental health support, disability services, or family assistance, we've gathered trusted providers to help you make informed decisions about care."
- CTA Text: "Search Directory"
- CTA URL: "/directory"

**Contact Info:**

- Contact Email: "info@thecarenest.co.uk"
- Service Area: "Colchester, Tendring, and nearby areas"
- Response Time: "We aim to respond within 24 hours"

**Contact Page Content:**

- Contact Page Title: "Contact Us"
- Contact Page Description: "We'd love to hear from you. Whether you have questions about our directory, want to suggest a service, or need help finding the right care support, we're here to help."
- How We Can Help: (Add each as separate items)
  - "Finding the right care services"
  - "Questions about our directory"
  - "Suggesting new services to include"
  - "Reporting outdated information"
  - "General support and guidance"

**Footer:**

- Footer Text: "© 2025 The Carenest. All rights reserved."
- Footer Links: (Add each as separate link objects)
  - Label: "Terms", URL: "/terms"
  - Label: "Privacy", URL: "/privacy"
  - Label: "Instagram", URL: "https://instagram.com/thecarenest"

**Page Visibility:**

- Show Blog Page: ✅ (checked)
- Show FAQ Page: ✅ (checked)

### 2. **Categories** (For directory entries and homepage search)

Create these categories in **+ Create → Category**:

- "Elderly Care" (order: 1)
- "Mental Health Support" (order: 2)
- "Disability Support" (order: 3)
- "Family Support" (order: 4)
- "Home Care Services" (order: 5)
- "Healthcare Services" (order: 6)
- "Therapy & Counselling" (order: 7)

### 3. **Pages** (Optional but recommended)

**+ Create → Page:**

- **Terms of Service** (slug: "terms")
  - Add basic terms content
- **Privacy Policy** (slug: "privacy")
  - Add basic privacy content

### 4. **Sample Content** (Optional)

**Blog Posts:** + Create → Blog Post

- Add some sample blog posts

**FAQ Items:** + Create → FAQ

- Add some frequently asked questions

**Directory Entries:** + Create → Entry

- Add some sample care providers
- Link them to the categories you created

## 🚨 **Critical Notes:**

1. **Site Settings is REQUIRED** - Without this, the website will show blank content
2. **Categories are needed** for the homepage search dropdown to work
3. **No fallback content** - If something is missing in Sanity, it will show as blank
4. **Test after adding** - Check each page works after adding content

## ✅ **Testing Checklist:**

After adding content in Sanity:

- [ ] Homepage shows hero content
- [ ] Contact page shows contact info
- [ ] Footer shows links
- [ ] Homepage search shows categories
- [ ] Directory page works
- [ ] Navigation shows/hides blog/FAQ based on settings

## 📍 **Sanity Studio URL:**

`http://localhost:3000/studio`
