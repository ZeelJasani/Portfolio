// This route is disabled - use /project/[slug] instead
// Old conflicting route removed

export default function DisabledProjectPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold text-red-600">Route Disabled</h1>
      <p className="text-muted-foreground">Please use /project/[slug] instead of /projects/[slug]</p>
    </div>
  );
}