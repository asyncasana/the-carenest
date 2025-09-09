// GROQ queries for Sanity

export const entriesQuery = `*[_type == "entry"] | order(_createdAt desc)`;
export const categoriesQuery = `*[_type == "category"] | order(title asc)`;
