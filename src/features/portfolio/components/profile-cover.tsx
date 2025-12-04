// "use client";

// import { motion } from "motion/react";
// import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
// import { cn } from "@/lib/utils";

// export function ProfileCover() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
//       animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
//       transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
//       className={cn(
//         "relative overflow-hidden",
//         "aspect-2/1 border-x border-edge select-none sm:aspect-3/1",
//         "flex items-center justify-center text-black dark:text-white",
//         "screen-line-before screen-line-after before:-top-px after:-bottom-px",
//         "bg-black/0.75 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]",
//         "bg-size-[10px_10px] bg-center",
//         "[--pattern-foreground:var(--color-zinc-950)]/5 dark:bg-white/0.75 dark:[--pattern-foreground:var(--color-white)]/5"
//       )}
//     >
//       <ParticleTextEffect
//         words={["ZEEL JASANI"]}
//         className="absolute inset-0 w-full h-full flex items-center justify-center"
//       />
//     </motion.div>
//   );
// }





// chat gpt code
// "use client";

// import { motion } from "motion/react";
// import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
// import { cn } from "@/lib/utils";

// export function ProfileCover() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
//       animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
//       transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
//       className={cn(
//         "relative overflow-hidden",
//         "aspect-2/1 border-x border-edge select-none sm:aspect-3/1",
//         "flex items-center justify-center text-black dark:text-white",
//         "screen-line-before screen-line-after before:-top-px after:-bottom-px",
//         "bg-black/0.75 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]",
//         "bg-size-[10px_10px] bg-center",
//         "[--pattern-foreground:var(--color-zinc-950)]/5 dark:bg-white/0.75 dark:[--pattern-foreground:var(--color-white)]/5"
//       )}
//     >
//       <ParticleTextEffect
//         words={["ZEEL", "JASANI"]}
//         className="absolute inset-0 w-full h-full flex items-center justify-center"
//       />
//     </motion.div>
//   );
// }






"use client";

import { motion } from "motion/react";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
import { cn } from "@/lib/utils";

export function ProfileCover() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      className={cn(
        "relative overflow-hidden",
        "h-64 sm:h-80 border-x border-edge select-none",
        "flex items-center justify-center text-black dark:text-white",
        "screen-line-before screen-line-after before:-top-px after:-bottom-px",
        "bg-black/0.75 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]",
        "bg-size-[10px_10px] bg-center",
        "[--pattern-foreground:var(--color-zinc-950)]/5 dark:bg-white/0.75 dark:[--pattern-foreground:var(--color-white)]/5"
      )}
    >
      <ParticleTextEffect
        words={["ZEEL", "JASANI"]}
        className="absolute inset-0 w-full h-full flex items-center justify-center"
      />
    </motion.div>
  );
}



