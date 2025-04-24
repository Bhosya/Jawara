
import { useState } from "react";
import { Users, UserSearch, UserCheck, UserX, Filter, Search, MapPin, HelpCircle, Phone, ArrowUpDown, SlidersHorizontal, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data
const victimSummary = {
  total: 2542,
  affected: 1820,
  missing: 95,
  rescued: 627,
  byLocation: [
    { name: "Semarang", count: 1250, percent: 49.2 },
    { name: "Temanggung", count: 342, percent: 13.5 },
    { name: "Mt. Merapi Area", count: 520, percent: 20.5 },
    { name: "Surakarta", count: 430, percent: 16.8 }
  ],
  byStatus: [
    { name: "Affected", count: 1820, percent: 71.6, color: "bg-amber-500" },
    { name: "Missing", count: 95, percent: 3.7, color: "bg-red-500" },
    { name: "Rescued", count: 627, percent: 24.7, color: "bg-green-500" }
  ]
};

const missingPersonsData = [
  {
    id: 1,
    name: "Budi Santoso",
    age: 35,
    gender: "Male",
    lastSeen: "Semarang Central District",
    lastSeenTime: "2 days ago",
    contact: "+62 812-3456-7890",
    details: "Last seen wearing blue shirt and jeans. Has a scar on right arm.",
    status: "Missing",
    priority: "High"
  },
  {
    id: 2,
    name: "Siti Rahayu",
    age: 28,
    gender: "Female",
    lastSeen: "Temanggung Market",
    lastSeenTime: "1 day ago",
    contact: "+62 813-2345-6789",
    details: "Last seen in the central market area. Wearing red hijab and black dress.",
    status: "Missing",
    priority: "High"
  },
  {
    id: 3,
    name: "Ahmad Hidayat",
    age: 42,
    gender: "Male",
    lastSeen: "Boyolali Northern Area",
    lastSeenTime: "3 days ago",
    contact: "+62 857-1234-5678",
    details: "Works as a farmer. Last seen tending to crops before landslide.",
    status: "Missing",
    priority: "Medium"
  },
  {
    id: 4,
    name: "Maya Wijaya",
    age: 31,
    gender: "Female",
    lastSeen: "Surakarta Eastern District",
    lastSeenTime: "12 hours ago",
    contact: "+62 878-9012-3456",
    details: "Traveling to work when flooding began. Driving white Honda motorcycle.",
    status: "Missing",
    priority: "High"
  },
  {
    id: 5,
    name: "Hendra Gunawan",
    age: 45,
    gender: "Male",
    lastSeen: "Mt. Merapi Eastern Slope",
    lastSeenTime: "2 days ago",
    contact: "+62 821-0987-6543",
    details: "Local guide who was assisting evacuations. Last seen helping elderly residents.",
    status: "Missing",
    priority: "Medium"
  }
];

const rescuedPersonsData = [
  {
    id: 101,
    name: "Dewi Kusuma",
    age: 29,
    gender: "Female",
    location: "Semarang Evacuation Center",
    rescuedFrom: "Northern Semarang Coastal Area",
    rescuedTime: "Yesterday",
    condition: "Stable",
    needs: ["Medical Attention", "Shelter"]
  },
  {
    id: 102,
    name: "Joko Widodo",
    age: 52,
    gender: "Male",
    location: "Temanggung Hospital",
    rescuedFrom: "Temanggung Hills",
    rescuedTime: "2 days ago",
    condition: "Minor Injuries",
    needs: ["Medical Attention"]
  },
  {
    id: 103,
    name: "Anita Susanti",
    age: 37,
    gender: "Female",
    location: "Surakarta Shelter",
    rescuedFrom: "Eastern Surakarta",
    rescuedTime: "Today",
    condition: "Stable",
    needs: ["Food", "Water", "Shelter"]
  },
  {
    id: 104,
    name: "Rudi Hartono",
    age: 61,
    gender: "Male",
    location: "Magelang Medical Center",
    rescuedFrom: "Southern Magelang",
    rescuedTime: "Yesterday",
    condition: "Critical",
    needs: ["Urgent Medical Care"]
  },
  {
    id: 105,
    name: "Rina Puspita",
    age: 22,
    gender: "Female",
    location: "Boyolali Relief Camp",
    rescuedFrom: "Western Boyolali",
    rescuedTime: "3 days ago",
    condition: "Stable",
    needs: ["Shelter", "Clothing"]
  }
];

const VictimTracking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  
  const filteredMissing = missingPersonsData.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.lastSeen.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredRescued = rescuedPersonsData.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.rescuedFrom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Victim Tracking</h1>
              <p className="text-slate-600 dark:text-slate-400">
                Monitor affected individuals, missing persons, and rescue status
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </Button>
              <Button size="sm" className="flex items-center gap-1">
                <UserSearch className="w-4 h-4" />
                <span>Find Person</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="victim-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-jawara-blue/10 flex items-center justify-center mr-4">
                      <Users className="w-5 h-5 text-jawara-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">{victimSummary.total.toLocaleString()}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Total Affected</p>
                    </div>
                  </div>
                  <Badge className="bg-jawara-blue text-white border-none">All Disasters</Badge>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                      <div className="text-2xl font-semibold text-amber-500">
                        {victimSummary.affected.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Affected</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                      <div className="text-2xl font-semibold text-red-500">
                        {victimSummary.missing.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Missing</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                      <div className="text-2xl font-semibold text-green-500">
                        {victimSummary.rescued.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Rescued</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="victim-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">By Location</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {victimSummary.byLocation.map((location, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>{location.name}</span>
                        <span className="text-slate-500">{location.count.toLocaleString()} ({location.percent}%)</span>
                      </div>
                      <Progress value={location.percent} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="victim-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">By Status</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {victimSummary.byStatus.map((status, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>{status.name}</span>
                        <span className="text-slate-500">{status.count.toLocaleString()} ({status.percent}%)</span>
                      </div>
                      <Progress value={status.percent} className={`h-2 ${status.color}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Victim Registry</CardTitle>
                  <CardDescription>Detailed information about affected individuals</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input 
                      placeholder="Search by name or location..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full md:w-auto"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="missing">Missing</SelectItem>
                      <SelectItem value="rescued">Rescued</SelectItem>
                      <SelectItem value="affected">Affected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="semarang">Semarang</SelectItem>
                      <SelectItem value="temanggung">Temanggung</SelectItem>
                      <SelectItem value="surakarta">Surakarta</SelectItem>
                      <SelectItem value="magelang">Magelang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="missing">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="missing" className="flex items-center gap-2">
                    <UserSearch className="w-4 h-4" />
                    <span>Missing Persons ({missingPersonsData.length})</span>
                  </TabsTrigger>
                  <TabsTrigger value="rescued" className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    <span>Rescued Persons ({rescuedPersonsData.length})</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="missing">
                  <div className="space-y-4">
                    {filteredMissing.map((person) => (
                      <div key={person.id} className="border rounded-lg overflow-hidden transition-all hover:shadow-md">
                        <div className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-start">
                              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                <UserX className="w-6 h-6" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{person.name}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  {person.age} years old • {person.gender}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center mt-3 md:mt-0">
                              <Badge className="bg-red-500 text-white border-none">
                                {person.status}
                              </Badge>
                              {person.priority === "High" && (
                                <Badge className="ml-2 bg-jawara-red/10 text-jawara-red border-none">
                                  High Priority
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                              <MapPin className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0 mt-0.5" />
                              <div>
                                <div className="text-sm font-medium">Last Seen</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">
                                  {person.lastSeen} • {person.lastSeenTime}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <Phone className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0 mt-0.5" />
                              <div>
                                <div className="text-sm font-medium">Emergency Contact</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">
                                  {person.contact}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-start">
                            <HelpCircle className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium">Details</div>
                              <div className="text-sm text-slate-600 dark:text-slate-300">
                                {person.details}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm" className="mr-2">Report Sighting</Button>
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="rescued">
                  <div className="space-y-4">
                    {filteredRescued.map((person) => (
                      <div key={person.id} className="border rounded-lg overflow-hidden transition-all hover:shadow-md">
                        <div className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-start">
                              <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                <UserCheck className="w-6 h-6" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{person.name}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  {person.age} years old • {person.gender}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center mt-3 md:mt-0">
                              <Badge className={`
                                ${person.condition === 'Stable' ? 'bg-green-500' : 
                                  person.condition === 'Minor Injuries' ? 'bg-amber-500' : 'bg-red-500'} 
                                text-white border-none`}
                              >
                                {person.condition}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                              <MapPin className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0 mt-0.5" />
                              <div>
                                <div className="text-sm font-medium">Current Location</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">
                                  {person.location}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <MapPin className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0 mt-0.5" />
                              <div>
                                <div className="text-sm font-medium">Rescued From</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">
                                  {person.rescuedFrom} • {person.rescuedTime}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-start">
                            <HelpCircle className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium">Current Needs</div>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {person.needs.map((need, index) => (
                                  <Badge key={index} variant="outline" className="bg-slate-100 dark:bg-slate-800">
                                    {need}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm" className="mr-2">Update Status</Button>
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <div className="text-sm text-slate-500">
                Page 1 of 1
              </div>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VictimTracking;
