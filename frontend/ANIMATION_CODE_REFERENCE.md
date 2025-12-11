# 🎬 Framer Motion Animation Patterns Used - Code Reference

## 📚 Reusable Animation Patterns

### 1. Stagger Container Animation
Used in: **ServicesWeOffer**, **Testimonials**
```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,      // Delay between each child
      delayChildren: 0.2          // Delay before first child
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Usage:
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* content */}
    </motion.div>
  ))}
</motion.div>
```

### 2. Scroll Trigger Animation
Used in: **All components**
```javascript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}  // Animates only once
>
  {/* Content that animates when scrolled into view */}
</motion.div>
```

### 3. Spring Physics Animation
Used in: **ServicesWeOffer cards, CTA buttons**
```javascript
<motion.div
  whileHover={{ scale: 1.15, rotate: 5 }}
  transition={{ type: 'spring', stiffness: 300 }}
>
  {/* Icon that bounces on hover */}
</motion.div>
```

### 4. Continuous Loop Animation
Used in: **CTASection background, HeroBanner overlay**
```javascript
<motion.div
  animate={{ rotate: 360 }}
  transition={{
    duration: 20,
    repeat: Infinity,
    ease: 'linear'
  }}
>
  {/* Rotating background element */}
</motion.div>
```

### 5. Animated Gradient Text
Used in: **HeroBanner**, **Section Headers**
```javascript
<motion.span
  animate={{ backgroundPosition: ['0% center', '100% center'] }}
  transition={{ duration: 3, repeat: Infinity }}
  className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text 
             text-transparent bg-size-[200%_200%]"
>
  Animated Text
</motion.span>
```

### 6. Button Interaction Animation
Used in: **Navbar, CTA buttons, Service cards**
```javascript
<motion.button
  whileHover={{
    scale: 1.08,
    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)'
  }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.3 }}
>
  Click Me
</motion.button>
```

### 7. Link Hover Animation
Used in: **Navbar, Footer**
```javascript
<motion.a
  whileHover={{ x: 5, color: '#60a5fa' }}
  className="text-gray-700 hover:text-blue-400"
>
  Link
</motion.a>
```

### 8. Scale Animation on Hover
Used in: **Testimonial cards, Service cards**
```javascript
<motion.div
  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)' }}
  className="shadow-md hover:shadow-xl transition-all"
>
  Card Content
</motion.div>
```

### 9. Icon Rotation & Scale
Used in: **Social icons, Service icons**
```javascript
<motion.a
  whileHover={{ scale: 1.2, rotate: 5 }}
  whileTap={{ scale: 0.9 }}
>
  📱
</motion.a>
```

### 10. Sequential Star Rating Animation
Used in: **Testimonials**
```javascript
{[...Array(rating)].map((_, i) => (
  <motion.span
    key={i}
    initial={{ opacity: 0, rotate: -180 }}
    whileInView={{ opacity: 1, rotate: 0 }}
    transition={{ delay: i * 0.1, duration: 0.4 }}
  >
    ⭐
  </motion.span>
))}
```

---

## 🎯 Animation Timing Values

```javascript
// Fast animations
short: 0.2s          // UI feedback, hovers
medium: 0.4-0.6s    // Card reveals, transitions
long: 0.8-1s        // Section reveals
veryLong: 2-3s      // Background loops, continuous

// Stagger patterns
card-to-card: 0.1-0.15s
section-to-section: 0.2-0.3s
element-within-card: 0.05-0.1s
```

---

## 🎨 Easing Functions Used

```javascript
ease: 'easeOut'              // Default, feels natural
ease: 'linear'               // Continuous rotations
ease: 'easeInOut'            // Smooth transitions
type: 'spring'               // Bouncy, playful
stiffness: 300               // Bounce intensity (higher = bouncier)
```

---

## 💡 Best Practices Applied

### ✅ DO
```javascript
// Use whileInView for scroll animations
whileInView={{ opacity: 1 }}
viewport={{ once: true }}

// Use spring physics for natural feel
transition={{ type: 'spring', stiffness: 300 }}

// Stagger for visual interest
transition: { staggerChildren: 0.1 }

// Combine hover + tap for better UX
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### ❌ DON'T
```javascript
// Don't animate every frame (use springs/transitions)
animate={{ x: [0, 10, 20, 30] }}

// Don't overuse animations (be tasteful)
// Limit to 2-3 animations per element max

// Don't animate position changes (causes reflow)
// Use transform instead

// Don't ignore viewport for performance
// Always use whileInView for scroll animations
```

---

## 🚀 Performance Tips

1. **Use GPU-accelerated properties only**
   - ✅ `scale`, `rotate`, `opacity`, `x`, `y`
   - ❌ `width`, `height`, `left`, `top`

2. **Lazy load animations with whileInView**
   ```javascript
   whileInView={{ opacity: 1 }}
   viewport={{ once: true, amount: 'some' }}
   ```

3. **Limit simultaneous animations**
   - Use stagger to spread them out
   - Don't animate all elements at once

4. **Optimize animation complexity**
   - Simple scale/rotate > complex paths
   - Use CSS for basic hover effects

---

## 🎬 Animation Use Cases

| Animation | Purpose | Component |
|-----------|---------|-----------|
| **Stagger** | Sequential reveal | Cards, lists |
| **Scroll trigger** | Entrance on view | All sections |
| **Spring** | Playful feedback | Icons, buttons |
| **Continuous** | Background interest | CTA section |
| **Hover scale** | Interactivity | Cards, buttons |
| **Gradient shift** | Visual interest | Text, headings |
| **Tap feedback** | Click response | Buttons |
| **Link hover** | Navigation feedback | Navbar, footer |

---

## 🔧 How to Add New Animations

### Example: Animate a New Component
```javascript
import { motion } from 'framer-motion'

export default function NewComponent() {
  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  // Use in JSX
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Content here */}
    </motion.section>
  )
}
```

---

## 📚 Resources

- **Framer Motion Docs:** https://www.framer.com/motion/
- **Easing visualizer:** https://cubic-bezier.com/
- **Animation principles:** https://www.framer.com/motion/guide-animation/

---

**Use these patterns as templates for future animations!** 🎨
