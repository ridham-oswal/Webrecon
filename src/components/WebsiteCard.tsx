import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface WebsiteCardProps {
  title: string;
  description: string;
  url: string;
  category: string;
}

export const WebsiteCard = ({ title, description, url, category }: WebsiteCardProps) => {
  // Function to get favicon URL
  const getFaviconUrl = (websiteUrl: string) => {
    try {
      const url = new URL(websiteUrl);
      return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
    } catch {
      return null;
    }
  };

  const faviconUrl = getFaviconUrl(url);

  return (
      <Card className="hover:shadow-[0_4px_10px_rgba(0,0,0,0.35)] transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={faviconUrl || ''} alt={title} />
              <AvatarFallback>{title[0]}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
        <Badge variant="secondary" className="w-fit">
          {category}
        </Badge>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};