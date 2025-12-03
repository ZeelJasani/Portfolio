import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";

import type { SocialLink } from "@/features/portfolio/types/social-links";
import { cn } from "@/lib/utils";

export function SocialLinkItem({
  icon,
  title,
  description,
  href,
  index,
}: SocialLink & { index: number }) {
  return (
    <a
      className={cn(
        "group/link flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-accent2/80",
        // Mobile: all items have bottom border except last
        index < 3 && "border-b border-border/20",
        // Desktop: left column has right border, top row has bottom border
        index % 2 === 0 && "sm:border-r sm:border-border/20",
        index < 2 && "sm:border-b sm:border-border/20"
      )}
      href={href}
      target="_blank"
      rel="noopener"
    >
      <div className="relative size-12 shrink-0 flex items-center justify-center">
        <Image
          className="rounded-xl select-none corner-squircle supports-corner-shape:rounded-[50%] shadow-sm hover:shadow-md transition-all duration-200"
          src={icon}
          alt={title}
          width={48}
          height={48}
          quality={100}
          unoptimized
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="flex items-center font-medium text-foreground underline-offset-4 group-hover/link:underline transition-colors">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-muted-foreground truncate">{description}</p>
        )}
      </div>

      <ArrowUpRightIcon className="size-4 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover/link:text-foreground group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </a>
  );
}






// // chat gpt code
// import { ArrowUpRightIcon } from "lucide-react";
// import Image from "next/image";

// import type { SocialLink } from "@/features/portfolio/types/social-links";
// import { cn } from "@/lib/utils";

// export function SocialLinkItem({
//   icon,
//   title,
//   description,
//   href,
//   index,
// }: SocialLink & { index: number }) {
//   return (
//     <a
//       href={href}
//       target="_blank"
//       rel="noopener noreferrer"
//       className={cn(
//         "group/link flex items-center gap-5 p-5 cursor-pointer transition-all",
//         "hover:bg-accent2/50 hover:backdrop-blur-sm rounded-xl"
//       )}
//     >
//       {/* ICON */}
//       <div className="relative size-12 shrink-0">
//         <Image
//           src={icon}
//           alt={title}
//           width={48}
//           height={48}
//           unoptimized
//           quality={100}
//           className="rounded-xl select-none corner-squircle supports-corner-shape:rounded-[50%] shadow-lg"
//         />

//         {/* subtle glow ring */}
//         <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/5 dark:ring-white/10 corner-squircle ring-inset supports-corner-shape:rounded-[50%]" />
//       </div>

//       {/* TEXT */}
//       <div className="flex-1 min-w-0">
//         <h3 className="flex items-center font-medium text-[17px] tracking-tight underline-offset-4 group-hover/link:underline">
//           {title}
//         </h3>

//         {description && (
//           <p className="text-sm text-muted-foreground mt-0.5 truncate">
//             {description}
//           </p>
//         )}
//       </div>

//       {/* ARROW */}
//       <ArrowUpRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
//     </a>
//   );
// }
