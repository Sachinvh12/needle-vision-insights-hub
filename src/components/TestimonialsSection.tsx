
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Investment Analyst",
    company: "Global Capital Partners",
    image: null,
    initials: "SJ",
    content: "Needl.ai has transformed our research process. We're capturing insights we would have missed before and making more informed investment decisions.",
    stars: 5
  },
  {
    name: "Michael Chen",
    role: "Strategy Director",
    company: "TechVision Inc.",
    image: null,
    initials: "MC",
    content: "The ability to consolidate intelligence from multiple sources has given us a competitive edge in identifying market trends ahead of our competitors.",
    stars: 5
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Research",
    company: "Meridian Analytics",
    image: null,
    initials: "ER",
    content: "Needl.ai delivers immediate value. Our team now spends less time searching for information and more time acting on insights.",
    stars: 5
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Decision Makers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how professionals across industries are leveraging Needl.ai to transform their information workflow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border border-gray-200 hover:border-needl-lighter transition-all duration-300 hover:shadow-md">
                <CardContent className="pt-6 px-6 pb-6 flex flex-col h-full">
                  <div className="flex items-center mb-4 space-x-1">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 flex-grow">"{testimonial.content}"</p>
                  
                  <div className="flex items-center mt-6">
                    <Avatar className="h-10 w-10 border border-gray-200">
                      {testimonial.image && <AvatarImage src={testimonial.image} alt={testimonial.name} />}
                      <AvatarFallback className="bg-needl-lighter text-needl-primary">{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{testimonial.name}</h3>
                      <p className="text-xs text-gray-500">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
