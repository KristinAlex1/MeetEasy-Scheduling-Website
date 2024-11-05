"use client" ;

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

const testimonials = [
    {
      name: "Emma Aldridge",
      role: "Marketing Manager",
      content:
        "MeetEasy has transformed how I manage my team's meetings. It's intuitive and saves us hours every week!",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Jackson Reed",
      role: "Freelance Designer",
      content:
        "As a freelancer, MeetEasy helps me stay organized and professional. My clients love how easy it is to book time with me.",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Zoe Landry",
      role: "Startup Founder",
      content:
        "MeetEasy streamlined our hiring process. Setting up interviews has never been easier!",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Oliver Grayson",
      role: "Sales Executive",
      content:
        "I've seen a 30% increase in my meeting bookings since using MeetEasy. It's a game-changer for sales professionals.",
      image: "https://i.pravatar.cc/150?img=4",
    },
  ];

const Testimonials = () => {
  return (
    <Carousel 
        plugins ={[
            Autoplay({
                delay: 2000,
            }),
        ]}
        className="w-full mx-auto"
    >
    <CarouselContent className="-ml-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-2xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    
  </Carousel>
  )
}

export default Testimonials;