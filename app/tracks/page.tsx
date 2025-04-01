"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Music,
  Play,
  Pause,
  Edit,
  Trash2,
  ExternalLink,
  ArrowUpDown,
  Download,
  UploadCloud,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TrackFilters } from "@/components/tracks/TrackFilters";
import { Pagination } from "@/components/shared/Pagination";

// Mock data for tracks
const tracks = Array.from({ length: 10 }).map((_, i) => ({
  id: `TRK${(i + 1).toString().padStart(5, "0")}`,
  title: `Track ${i + 1}`,
  artist: `Artist ${(i % 4) + 1}`,
  album: `Album ${(i % 3) + 1}`,
  duration: `${Math.floor(Math.random() * 4) + 2}:${Math.floor(Math.random() * 59).toString().padStart(2, "0")}`,
  streams: Math.floor(Math.random() * 10000000),
  status: i % 5 === 0 ? "pending" : "active",
  addedDate: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
}));

export default function TracksPage() {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tracks</h1>
          <p className="text-gray-400 mt-1">Manage all tracks in your music library</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <UploadCloud className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button className="bg-spotifyGreen hover:bg-spotifyGreen/90 text-black">
            <Plus className="mr-2 h-4 w-4" /> Add Track
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search by title, artist or album..." 
            className="pl-10 bg-gray-800 border-gray-700 focus:border-spotifyGreen focus:ring-spotifyGreen text-white"
          />
        </div>
        <TrackFilters />
      </div>

      {/* Tracks Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-800">
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Album</TableHead>
                <TableHead className="hidden md:table-cell">
                  <div className="flex items-center">
                    Duration
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <div className="flex items-center">
                    Streams
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Added</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tracks.map((track) => (
                <TableRow key={track.id} className="hover:bg-gray-800">
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full text-spotifyGreen hover:text-white hover:bg-spotifyGreen"
                      onClick={() => setIsPlaying(isPlaying === track.id ? null : track.id)}
                    >
                      {isPlaying === track.id ? (
                        <Pause size={16} />
                      ) : (
                        <Play size={16} />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gray-800 rounded flex items-center justify-center">
                        <Music size={18} className="text-spotifyGreen" />
                      </div>
                      <div>
                        <div className="font-medium">{track.title}</div>
                        <div className="text-xs text-gray-400">{track.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{track.artist}</TableCell>
                  <TableCell>{track.album}</TableCell>
                  <TableCell className="hidden md:table-cell">{track.duration}</TableCell>
                  <TableCell className="hidden md:table-cell">{track.streams.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={track.status === 'active' ? "default" : "outline"} className={
                      track.status === 'active' 
                        ? "bg-green-500/20 text-green-500 hover:bg-green-500/20" 
                        : "border-yellow-500/50 text-yellow-500"
                    }>
                      {track.status === 'active' ? (
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                      ) : (
                        <XCircle className="mr-1 h-3 w-3" />
                      )}
                      {track.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-gray-400">{track.addedDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                          <Download className="mr-2 h-4 w-4" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                          <ExternalLink className="mr-2 h-4 w-4" /> View on Spotify
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem className="text-red-500 hover:bg-gray-700 cursor-pointer">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing <span className="font-medium text-white">1-10</span> of <span className="font-medium text-white">100</span> tracks
        </div>
        <Pagination totalPages={10} currentPage={1} />
      </div>
    </div>
  );
}