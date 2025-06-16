import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";

const categories = [
  "All",
  "Computer programming",
  "Podcasts",
  "Gaming",
  "Music",
  "Femininity",
  "Live",
  "Mixes",
  "Words",
  "Sales",
  "Consumer Electronics",
  "Body-Building",
  "Belief",
  "Recently uploaded",
  "Trending",
  "Sports",
  "News",
  "Movies",
  "Comedy",
  "Education",
  "Science & Technology",
];

export function CategoriesSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-background border-b">
      <div className="relative px-4 py-3">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3 w-max">
            {categories.map((category) => (
              <Button
                key={category}
                variant={
                  selectedCategory === category ? "default" : "secondary"
                }
                className={`rounded-lg px-3 py-1.5 h-auto text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>

        {/* Gradient fade on the right */}
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent pointer-events-none flex items-center justify-end pr-4">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
