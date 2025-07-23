'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger, JSAnimation } from 'animejs';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean;
  toggleActions?: string;
}

// Custom hook for GSAP animations
export const useGSAP = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const fadeInUp = (
    targets: string | Element | Element[],
    config: AnimationConfig = {}
  ) => {
    return gsap.fromTo(
      targets,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: config.duration || 0.8,
        delay: config.delay || 0,
        ease: config.ease || 'power3.out',
        stagger: config.stagger || 0
      }
    );
  };

  const fadeInDown = (
    targets: string | Element | Element[],
    config: AnimationConfig = {}
  ) => {
    return gsap.fromTo(
      targets,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: config.duration || 0.8,
        delay: config.delay || 0,
        ease: config.ease || 'power3.out',
        stagger: config.stagger || 0
      }
    );
  };

  const slideInLeft = (
    targets: string | Element | Element[],
    config: AnimationConfig = {}
  ) => {
    return gsap.fromTo(
      targets,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: config.duration || 0.8,
        delay: config.delay || 0,
        ease: config.ease || 'power3.out',
        stagger: config.stagger || 0
      }
    );
  };

  const slideInRight = (
    targets: string | Element | Element[],
    config: AnimationConfig = {}
  ) => {
    return gsap.fromTo(
      targets,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: config.duration || 0.8,
        delay: config.delay || 0,
        ease: config.ease || 'power3.out',
        stagger: config.stagger || 0
      }
    );
  };

  const scaleIn = (
    targets: string | Element | Element[],
    config: AnimationConfig = {}
  ) => {
    return gsap.fromTo(
      targets,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: config.duration || 0.6,
        delay: config.delay || 0,
        ease: config.ease || 'back.out(1.7)',
        stagger: config.stagger || 0
      }
    );
  };

  const createScrollAnimation = (
    targets: string | Element | Element[],
    fromVars: gsap.TweenVars,
    toVars: gsap.TweenVars,
    config: ScrollAnimationConfig = {}
  ) => {
    return gsap.fromTo(targets, fromVars, {
      ...toVars,
      scrollTrigger: {
        trigger: config.trigger || targets,
        start: config.start || 'top 80%',
        end: config.end || 'bottom 20%',
        scrub: config.scrub || false,
        toggleActions: config.toggleActions || 'play none none reverse'
      }
    });
  };

  const createTimeline = (config: ScrollAnimationConfig = {}) => {
    const tl = gsap.timeline({
      scrollTrigger: config.trigger ? {
        trigger: config.trigger,
        start: config.start || 'top 80%',
        end: config.end || 'bottom 20%',
        scrub: config.scrub || false,
        toggleActions: config.toggleActions || 'play none none reverse'
      } : undefined
    });
    
    timelineRef.current = tl;
    return tl;
  };

  return {
    fadeInUp,
    fadeInDown,
    slideInLeft,
    slideInRight,
    scaleIn,
    createScrollAnimation,
    createTimeline,
    gsap
  };
};

// Custom hook for Anime.js animations
export const useAnime = () => {
  const animationRef = useRef<JSAnimation | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, []);

  const staggeredFadeIn = (
    targets: string | Element | Element[],
    config: AnimationConfig = {}
  ) => {
    const animation = animate(targets, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: config.duration || 800,
      delay: stagger(config.stagger || 100),
      easing: config.ease || 'easeOutCubic'
    });

    animationRef.current = animation;
    return animation;
  };

  const bounceIn = (
    targets: string | Element | Element[],
    config: AnimationConfig = {}
  ) => {
    const animation = animate(targets, {
      scale: [0, 1],
      opacity: [0, 1],
      duration: config.duration || 600,
      delay: config.delay || 0,
      easing: config.ease || 'easeOutElastic(1, .8)'
    });

    animationRef.current = animation;
    return animation;
  };

  const rotateIn = (
    targets: string | Element | Element[],
    config: AnimationConfig = {}
  ) => {
    const animation = animate(targets, {
      rotate: [180, 0],
      scale: [0.5, 1],
      opacity: [0, 1],
      duration: config.duration || 800,
      delay: config.delay || 0,
      easing: config.ease || 'easeOutCubic'
    });

    animationRef.current = animation;
    return animation;
  };

  const morphPath = (
    targets: string | Element | Element[],
    path: string,
    config: AnimationConfig = {}
  ) => {
    const animation = animate(targets, {
      d: path,
      duration: config.duration || 1000,
      delay: config.delay || 0,
      easing: config.ease || 'easeInOutQuad'
    });

    animationRef.current = animation;
    return animation;
  };

  const typewriter = (
    targets: string | Element | Element[],
    config: AnimationConfig = {}
  ) => {
    const animation = animate(targets, {
      width: ['0%', '100%'],
      duration: config.duration || 2000,
      delay: config.delay || 0,
      easing: config.ease || 'easeInOutQuad'
    });

    animationRef.current = animation;
    return animation;
  };

  return {
    staggeredFadeIn,
    bounceIn,
    rotateIn,
    morphPath,
    typewriter,
    animate
  };
};

// Utility functions for common animation patterns
export const animationUtils = {
  // Intersection Observer for triggering animations
  createIntersectionObserver: (
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: IntersectionObserverInit = {}
  ) => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    };

    return new IntersectionObserver(callback, defaultOptions);
  },

  // Debounce function for performance
  debounce: <T extends unknown[]>(func: (...args: T) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: T) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle: <T extends unknown[]>(func: (...args: T) => void, limit: number) => {
    let inThrottle: boolean;
    return function executedFunction(this: unknown, ...args: T) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Easing functions
  easing: {
    easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    easeInOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
    easeOutElastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
};

// Performance monitoring
export const useAnimationPerformance = () => {
  const measurePerformance = (animationName: string, callback: () => void) => {
    if (typeof window !== 'undefined' && window.performance) {
      const start = performance.now();
      callback();
      const end = performance.now();
      console.log(`Animation "${animationName}" took ${end - start} milliseconds`);
    } else {
      callback();
    }
  };

  return { measurePerformance };
};
