import { useSocket } from '@/contexts/SocketContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { BarChart, HardDrive, Loader2, MemoryStick, Network } from 'lucide-react';



const Stats = () => {
  const { stats } = useSocket();

  if (!stats) return <div className="text-center text-gray-500 min-h-screen w-full flex items-center justify-center">
    <Loader2 className="animate-spin"/>
  </div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="text-blue-500" /> CPU Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">{stats.cpu.percent}%</p>
          <Progress value={stats.cpu.percent} className="mt-2" />
          <Separator className="my-4" />
          <p>Cores: {stats.cpu.cores}</p>
          <p>Frequency: {stats.cpu.frequency} GHz</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MemoryStick className="text-green-500" /> Memory Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">{stats.memory.percent}%</p>
          <Progress value={stats.memory.percent} className="mt-2" />
          <Separator className="my-4" />
          <p>Total: {stats.memory.total} GB</p>
          <p>Available: {stats.memory.available} GB</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="text-red-500" /> Disk Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">{stats.disk.percent}%</p>
          <Progress value={stats.disk.percent} className="mt-2" />
          <Separator className="my-4" />
          <p>Total: {(stats.disk.total)} GB</p>
          <p>Used: {stats.disk.used} GB</p>
          <p>Free: {stats.disk.free} GB</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="text-purple-500" /> Network Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">Sent: {stats.network.bytes_sent} GB</p>
          <p>Received: {stats.network.bytes_recv} GB</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
