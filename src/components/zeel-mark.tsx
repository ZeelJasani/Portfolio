// 🔍 LOGO COMPONENT: This SVG component is used in both header and hero sections
// To replace with an image: Change this component to use <Image> or <img> tag
// Header location: src/components/site-header-mark.tsx
// Hero location: src/features/portfolio/components/profile-cover.tsx

export function ZeelMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 256"
      {...props}
    >
      <text
        x="140"
        y="190"
        fontSize="220"
        fontWeight="700"
        fill="currentColor"
        textAnchor="middle"
        fontFamily="'Calistoga', ui-monospace, 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace"
        letterSpacing="-0.02em"
      >
        Z
      </text>
      <text
        x="372"
        y="190"
        fontSize="220"
        fontWeight="700"
        fill="currentColor"
        textAnchor="middle"
        fontFamily="'Calistoga', ui-monospace, 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace"
        letterSpacing="-0.02em"
      >
        J
      </text>
    </svg>
  );
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 128"><text x="70" y="95" fontSize="110" fontWeight="700" fill="${color}" textAnchor="middle" fontFamily="'Calistoga', ui-monospace, 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace" letterSpacing="-0.02em">Z</text><text x="186" y="95" fontSize="110" fontWeight="700" fill="${color}" textAnchor="middle" fontFamily="'Calistoga', ui-monospace, 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace" letterSpacing="-0.02em">J</text></svg>`;
}
