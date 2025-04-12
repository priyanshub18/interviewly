import { LoaderIcon } from "lucide-react";

function LoaderUI() {
  return (
    <div className="h-[calc(100vh-4rem-1px)] flex items-center justify-center">
      <div className="container max-w-7xl mx-auto mt-24 flex items-center my-20 justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 border-4 border-t-purple-600 border-b-blue-500 border-l-purple-400 border-r-blue-300 rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    </div>
  );
}
export default LoaderUI;
