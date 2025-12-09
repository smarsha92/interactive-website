export interface GlossaryTerm {
  term: string;
  definition: string;
  category?: string;
}
e

    category: "Development",
  }
    term: "Compo
    category: "Development",
  },
    term: "REST",
    
  }
    term: "TypeScript"
    definition: "A reusable, self-contained piece of code that encapsulates specific functionality and can be combined with other components to build complex applications.",
    category: "Development",
    relatedTerms: ["React", "UI", "Module"]
  },
   
    term: "REST",
    definition: "Representational State Transfer - an architectural style for designing networked applications using HTTP requests to access and manipulate data.",
    category: "Development",
    relatedTerms: ["API", "HTTP", "JSON"]
  },
  {
    term: "TypeScript",
    definition: "A strongly typed programming language that builds on JavaScript, adding optional static type definitions.",
    category: "Programming Language",
    relatedTerms: ["JavaScript", "Type Safety", "Compiler"]
  },
  {
  );

  return glossary.filt

  c
}

export function searchGlossary(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return glossary.filter(
    item =>
      item.term.toLowerCase().includes(lowerQuery) ||
      item.definition.toLowerCase().includes(lowerQuery) ||
      item.category?.toLowerCase().includes(lowerQuery)
  );
}

export function getTermsByCategory(category: string): GlossaryTerm[] {
  return glossary.filter(item => item.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(glossary.map(item => item.category).filter(Boolean));
  return Array.from(categories) as string[];
}
