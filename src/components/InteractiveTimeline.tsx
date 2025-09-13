import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, MapPin, Building, Award } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  badge?: string;
  color?: string;
  logo?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const InteractiveTimeline: React.FC<TimelineProps> = ({ items }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<{ [key: string]: boolean }>({});
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (!timelineRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (id) {
            setVisibleItems((prev) => ({
              ...prev,
              [id]: entry.isIntersecting,
            }));
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    // Get all the timeline items
    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [items]);

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div ref={timelineRef} className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 z-0">
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 w-4 h-4 rounded-full bg-blue-500 z-10" />
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-0 w-4 h-4 rounded-full bg-emerald-500 z-10" />
      </div>

      {/* Timeline Items */}
      <div className="space-y-12 relative z-10">
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (itemRefs.current[item.id] = el)}
            data-id={item.id}
            className={`timeline-item relative pl-20 transition-all duration-700 transform ${
              visibleItems[item.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            {/* Timeline Dot */}
            <div
              className={`absolute left-7 top-2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 z-20 ${
                item.color || 'bg-blue-500'
              } transition-all duration-300 ${
                expandedItem === item.id ? 'scale-125' : ''
              }`}
            />

            {/* Date Badge */}
            <div className="absolute left-0 top-1 text-sm font-mono text-gray-600 dark:text-gray-400">
              {item.duration.split('-')[0]}
            </div>

            {/* Content Card */}
            <div
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 ${
                expandedItem === item.id ? 'ring-2 ring-blue-500/30' : ''
              }`}
            >
              {/* Card Header */}
              <div
                className={`relative p-6 cursor-pointer ${
                  expandedItem === item.id
                    ? 'bg-blue-50 dark:bg-gray-700/50'
                    : 'bg-transparent'
                }`}
                onClick={() => toggleExpand(item.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {/* Company Badge */}
                    <div className="flex items-center mb-3 space-x-2">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          item.badge
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {item.badge || 'Experience'}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {item.duration}
                      </span>
                    </div>

                    {/* Title and Company */}
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                      <div className="flex items-center">
                        <Building size={16} className="mr-1 text-gray-500" />
                        <span>{item.company}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1 text-gray-500" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expand/Collapse Icon */}
                  <div
                    className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 transition-transform duration-300 ${
                      expandedItem === item.id ? 'rotate-180 bg-blue-100 dark:bg-blue-900/30' : ''
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </div>

                {/* Short Description (visible when collapsed) */}
                {expandedItem !== item.id && (
                  <p className="mt-3 text-gray-600 dark:text-gray-400 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Expanded Details */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  expandedItem === item.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pt-0 pb-6 space-y-6">
                  {/* Full Description */}
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Key Achievements */}
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                      <Award size={16} className="mr-2" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {item.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start group hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded transition-colors"
                        >
                          <ChevronRight
                            size={16}
                            className="mr-2 mt-1 text-blue-500 group-hover:text-blue-600 dark:text-blue-400 transition-transform group-hover:translate-x-1"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                      <Zap size={16} className="mr-2" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveTimeline;