export interface GlossaryTerm {
  term: string;
  definition: string;
  category?: string;
}

export const glossary: GlossaryTerm[] = [
  {
    term: "IP Address",
    definition: "A unique numerical identifier assigned to each device connected to a computer network that uses the Internet Protocol for communication.",
    category: "Networking"
  },
  {
    term: "TCP/IP",
    definition: "Transmission Control Protocol/Internet Protocol - the fundamental communication protocols of the Internet that define how data should be packetized, addressed, transmitted, routed, and received.",
    category: "Protocols"
  },
  {
    term: "Router",
    definition: "A networking device that forwards data packets between computer networks, determining the best path for data transmission.",
    category: "Hardware"
  },
  {
    term: "Switch",
    definition: "A network device that connects devices within a local area network (LAN) and uses MAC addresses to forward data to the correct destination.",
    category: "Hardware"
  },
  {
    term: "Firewall",
    definition: "A network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules.",
    category: "Security"
  },
  {
    term: "DNS",
    definition: "Domain Name System - a hierarchical naming system that translates human-readable domain names into IP addresses.",
    category: "Protocols"
  },
  {
    term: "Subnet Mask",
    definition: "A 32-bit number that divides an IP address into network and host portions, defining which part of the address represents the network.",
    category: "Networking"
  },
  {
    term: "Gateway",
    definition: "A network node that serves as an access point to another network, often routing traffic between different networks.",
    category: "Networking"
  },
  {
    term: "MAC Address",
    definition: "Media Access Control Address - a unique identifier assigned to network interface controllers for communications at the data link layer.",
    category: "Networking"
  },
  {
    term: "DHCP",
    definition: "Dynamic Host Configuration Protocol - a network management protocol that automatically assigns IP addresses and other network configuration parameters to devices.",
    category: "Protocols"
  },
  {
    term: "VPN",
    definition: "Virtual Private Network - a secure connection that encrypts internet traffic and protects online identity by routing through a remote server.",
    category: "Security"
  },
  {
    term: "Bandwidth",
    definition: "The maximum rate of data transfer across a given path, typically measured in bits per second (bps).",
    category: "Performance"
  },
  {
    term: "Latency",
    definition: "The time delay between the cause and effect of a physical change in a system, often referring to network delay in data transmission.",
    category: "Performance"
  },
  {
    term: "Packet",
    definition: "A formatted unit of data carried by a packet-switched network, containing both payload and control information.",
    category: "Networking"
  },
  {
    term: "OSI Model",
    definition: "Open Systems Interconnection Model - a conceptual framework that standardizes network communication into seven layers, from physical to application.",
    category: "Concepts"
  },
  {
    term: "LAN",
    definition: "Local Area Network - a computer network that interconnects computers within a limited area such as a home, school, or office building.",
    category: "Networking"
  },
  {
    term: "WAN",
    definition: "Wide Area Network - a telecommunications network that extends over a large geographical area, connecting multiple LANs.",
    category: "Networking"
  },
  {
    term: "HTTP",
    definition: "Hypertext Transfer Protocol - an application protocol for distributed, collaborative, hypermedia information systems and the foundation of data communication on the web.",
    category: "Protocols"
  },
  {
    term: "HTTPS",
    definition: "Hypertext Transfer Protocol Secure - an extension of HTTP that uses encryption (SSL/TLS) to secure communications over a computer network.",
    category: "Protocols"
  },
  {
    term: "Port",
    definition: "A virtual endpoint for network communication, identified by a number, that allows multiple services to run on a single IP address.",
    category: "Networking"
  }
];

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
