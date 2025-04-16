import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-gray-100 animate-pulse rounded-md", className)}
      {...props}
    />
  )
)
Skeleton.displayName = "Skeleton"

export { Skeleton }