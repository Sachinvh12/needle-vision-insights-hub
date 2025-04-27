
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, UserCheck, BarChart2, Layers } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: "Real-time Intelligence",
      description: "Get instant insights from your data sources as events unfold, ensuring you're always ahead of the curve.",
      animationId: "real-time",
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50"
    },
    {
      icon: UserCheck,
      title: "Personalized Insights",
      description: "Tailored intelligence streams based on your specific role, interests, and decision-making needs.",
      animationId: "personalized",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Layers,
      title: "Integrated Sources",
      description: "Seamlessly connect your document repositories, web sources, and internal data for comprehensive analysis.",
      animationId: "integrated",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: BarChart2,
      title: "Actionable Analytics",
      description: "Convert raw data into actionable intelligence with clear recommendations and decision support.",
      animationId: "actionable",
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Intelligence for Every Decision
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform transforms how you interact with information, delivering key insights exactly when and where you need them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.animationId}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              animationId={feature.animationId}
              iconColor={feature.iconColor}
              bgColor={feature.bgColor}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
