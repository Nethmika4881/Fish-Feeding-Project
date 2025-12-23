import {
  BarChart2,
  Bell,
  Box,
  Calendar,
  Clock,
  Cpu,
  Eye,
  Hand,
} from "lucide-react";
import FeatureBox from "./FeatureBox";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function FeatureList() {
  const features = [
    {
      icon: <Calendar color="#0DA2E7" size={25} />,
      topic: "Automated Feeding",
      des: "Set schedules and let the system handle feeding automatically",
    },
    {
      icon: <Clock color="#0DA2E7" size={25} />,
      topic: "Scheduled Feeding",
      des: "Create complex feeding patterns for different tank requirements",
    },
    {
      icon: <Hand color="#0DA2E7" size={25} />,
      topic: "Manual Control",
      des: "Feed your fish manually with a single click anytime",
    },
    {
      icon: <Eye color="#0DA2E7" size={25} />,
      topic: "Tank Monitoring",
      des: "Real-time water quality and fish health tracking",
    },
    {
      icon: <Box color="#0DA2E7" size={25} />,
      topic: "Feed Inventory",
      des: "Track feed stock levels and get low-stock alerts",
    },
    {
      icon: <Bell color="#0DA2E7" size={25} />,
      topic: "Smart Alerts",
      des: "Get instant notifications for critical events and warnings",
    },
    {
      icon: <BarChart2 color="#0DA2E7" size={25} />,

      topic: "Analytics",
      des: "Detailed insights into feeding patterns and tank performance",
    },

    {
      icon: <Cpu color="#0DA2E7" size={25} />,
      topic: "Device Connectivity",
      des: "Seamless MQTT integration with IoT feeding devices",
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {features.map((feature, i) => (
        <FeatureBox key={i} feature={feature} />
      ))}
    </div>
  );
}

export default FeatureList;
