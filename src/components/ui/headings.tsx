import { cn } from "@/lib/utils";

export function H1({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={cn("text-3xl font-semibold", className)} {...props}>
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-3xl font-semibold", className)} {...props}>
      {children}
    </h2>
  );
}

export function H3({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-3xl font-semibold", className)} {...props}>
      {children}
    </h3>
  );
}
