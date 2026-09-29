import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export default function MagneticButton({
  children,
  onClick,
  className = "",
  style = {},
  disabled = false,
  type = "button",
  ...props
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth restrained spring physics
  const springConfig = { damping: 20, stiffness: 150, mass: 0.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.25;
    const distanceY = (e.clientY - centerY) * 0.25;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        ...style,
        x: shouldReduceMotion ? 0 : springX,
        y: shouldReduceMotion ? 0 : springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
