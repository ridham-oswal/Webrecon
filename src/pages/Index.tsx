import { useState } from "react";
import { WebsiteCard } from "@/components/WebsiteCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: websites, isLoading } = useQuery({
    queryKey: ['websites'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .order('title', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  // Get unique categories
  const categories = websites 
    ? ['All', ...new Set(websites.map(website => website.category))]
    : ['All'];

  const filteredWebsites = websites?.filter((website) => {
    const matchesCategory = selectedCategory === "All" || website.category === selectedCategory;
    const matchesSearch = website.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         website.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 font-orbitron text-black">
        Webrecon
      </h1>
      
      <div className="max-w-xl mx-auto mb-8">
        <Input
          type="search"
          placeholder="Search websites..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWebsites?.map((website) => (
            <WebsiteCard
              key={website.id}
              title={website.title}
              description={website.description}
              url={website.url}
              category={website.category}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;