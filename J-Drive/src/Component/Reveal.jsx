import { motion, useReducedMotion } from "motion/react";

export default function Reveal({
  children,
  delay = 0,
  duration = 0.65,
  y = 36,
  className = "",
  style = {},
  as = "div",
}) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (shouldReduceMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], 
      }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
