import { UserCircleIcon } from "lucide-react";
import { Doc } from "../../convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type User = Doc<"users">;

type UserInfoProps = {
  user: User;
  showRole?: boolean;
  avatarSize?: "sm" | "md" | "lg";
  className?: string;
};

function UserInfo({
  user,
  showRole = false,
  avatarSize = "sm",
  className,
}: UserInfoProps) {
  // Calculate avatar sizes based on the prop
  const avatarSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  // Calculate icon sizes based on avatar size
  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  // Get role display text and color
  const getRoleStyles = () => {
    if (!showRole) return {};

    const roleConfig = {
      interviewer: {
        text: "Interviewer",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-700 dark:text-blue-300",
      },
      candidate: {
        text: "Candidate",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        textColor: "text-green-700 dark:text-green-300",
      },
      admin: {
        text: "Admin",
        bgColor: "bg-amber-100 dark:bg-amber-900/30",
        textColor: "text-amber-700 dark:text-amber-300",
      },
    };

    const defaultRole = {
      text: user.role || "User",
      bgColor: "bg-gray-100 dark:bg-gray-800",
      textColor: "text-gray-700 dark:text-gray-300",
    };

    return roleConfig[user.role as keyof typeof roleConfig] || defaultRole;
  };

  const roleStyles = getRoleStyles();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Avatar className={cn(avatarSizes[avatarSize], "ring-2 ring-background")}>
        <AvatarImage src={user.image} alt={user.name} />
        <AvatarFallback className="bg-accent text-accent-foreground font-medium">
          {user.name ? (
            user.name.charAt(0).toUpperCase()
          ) : (
            <UserCircleIcon className={iconSizes[avatarSize]} />
          )}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <span className="text-sm font-medium leading-none">{user.name}</span>

        {showRole && (
          <span
            className={cn(
              "text-xs px-1.5 py-0.5 rounded-full mt-1 inline-block",
              roleStyles.bgColor,
              roleStyles.textColor,
            )}
          >
            {roleStyles.text}
          </span>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
