"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface AutoScrollAnimateProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  animationDistance?: number;
  duration?: number;
  threshold?: number;
}

export default function SmoothScrollWrapper({
  children,
  className = "",
  staggerDelay = 0.1,
  animationDistance = 30,
  duration = 0.6,
  threshold = 0.1,
}: AutoScrollAnimateProps) {
  useEffect(() => {
    // Setup Intersection Observer untuk handle scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            // Add animation class when element enters viewport
            element.style.opacity = "1";
            element.style.transform = "translateY(0) translateX(0)";
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Function to setup elements for animation
    const setupAnimations = () => {
      // Target elements that should be animated
      const animateSelectors = [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        'div[class*="card"]',
        "section",
        "article",
        "[data-animate]",
        ".animate-on-scroll",
      ];

      animateSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
          const htmlElement = element as HTMLElement;

          // Skip if element is already being observed or is very small
          if (
            htmlElement.dataset.observed ||
            htmlElement.offsetHeight < 10 ||
            htmlElement.offsetWidth < 10
          ) {
            return;
          }

          // Set initial state
          htmlElement.style.opacity = "0";
          htmlElement.style.transform = `translateY(${animationDistance}px)`;
          htmlElement.style.transition = `all ${duration}s ease-out`;
          htmlElement.style.transitionDelay = `${index * staggerDelay}s`;

          // Mark as observed
          htmlElement.dataset.observed = "true";

          // Start observing
          observer.observe(htmlElement);
        });
      });
    };

    // Setup animations after a short delay to ensure DOM is ready
    const timeout = setTimeout(setupAnimations, 100);

    // Re-run setup when new content is added (for dynamic content)
    const mutationObserver = new MutationObserver(() => {
      clearTimeout(timeout);
      setTimeout(setupAnimations, 100);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [staggerDelay, animationDistance, duration, threshold]);

  // Initial page load animation
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        easeInOut: "easeInOut",
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}
