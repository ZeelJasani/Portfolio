export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before mx-auto border-x border-edge pt-4 md:max-w-3xl">
        <div className="flex flex-col items-center justify-center gap-1 py-8 text-center text-xs text-muted-foreground">
          <p>Design & Developed by <a href="https://x.com/ZeelXCode" className="underline underline-offset-4 hover:text-foreground transition-colors">ZeelXCode</a></p>
          <p>&copy; 2025. All rights reserved.</p>
        </div>
        <div
          className="h-24"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--edge) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}
