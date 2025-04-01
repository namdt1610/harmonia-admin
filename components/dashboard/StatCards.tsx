import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Music, TrendingUp, ArrowUpRight, Calendar } from "lucide-react";

export function StatCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="Total Streams" 
        value="4,923,482" 
        icon={<BarChart3 className="h-4 w-4 text-spotifyGreen" />}
        trend={<span className="text-xs text-green-500 flex items-center mt-1">
          <ArrowUpRight className="h-3 w-3 mr-1" /> +25% from last month
        </span>}
      />
      
      <StatCard 
        title="Active Users" 
        value="384,291" 
        icon={<Users className="h-4 w-4 text-spotifyGreen" />}
        trend={<span className="text-xs text-green-500 flex items-center mt-1">
          <ArrowUpRight className="h-3 w-3 mr-1" /> +12% from last month
        </span>}
      />
      
      <StatCard 
        title="Total Tracks" 
        value="89,342" 
        icon={<Music className="h-4 w-4 text-spotifyGreen" />}
        trend={<span className="text-xs text-gray-400 flex items-center mt-1">
          <Calendar className="h-3 w-3 mr-1" /> Updated today
        </span>}
      />
      
      <StatCard 
        title="Revenue" 
        value="$2.4M" 
        icon={<TrendingUp className="h-4 w-4 text-spotifyGreen" />}
        trend={<span className="text-xs text-green-500 flex items-center mt-1">
          <ArrowUpRight className="h-3 w-3 mr-1" /> +18% from last month
        </span>}
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: React.ReactNode;
}

function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {trend}
      </CardContent>
    </Card>
  );
}