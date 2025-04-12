import {
  CallControls,
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LayoutListIcon, UsersIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import EndCallButton from "./EndCallButton";
import CodeEditor from "./CodeEditor";
// import CodeEditor from "./CodeEditor";

function MeetingRoom() {
  const router = useRouter();
  const [layout, setLayout] = useState<"grid" | "speaker">("speaker");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const [mounted, setMounted] = useState(false);

  const callingState = useCallCallingState();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (callingState !== CallingState.JOINED) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container max-w-7xl mx-auto mt-24 flex items-center my-20 justify-center h-64"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 border-4 border-t-indigo-600 border-b-indigo-500 border-l-indigo-400 border-r-indigo-300 rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Joining the call...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-background  h-[68px] flex items-center px-6"
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-2">
            {/* <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-400"></div> */}
            <h1 className="font-semibold text-lg"></h1>
          </div>
          <div className="text-sm text-muted-foreground bg-indigo-50/10 px-3 py-1.5 rounded-full"></div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/10"
            ></Button>
          </div>
        </div>
      </motion.nav>

      {/* Meeting Room Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-[calc(100vh-4rem-1px)]"
      >
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={35}
            minSize={25}
            maxSize={100}
            className="relative"
          >
            {/* VIDEO LAYOUT */}
            <div className="absolute inset-0">
              {layout === "grid" ? <PaginatedGridLayout /> : <SpeakerLayout />}

              {/* PARTICIPANTS LIST OVERLAY */}
              <AnimatePresence>
                {showParticipants && (
                  <motion.div
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="absolute right-0 top-0 h-full w-[300px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-l border-indigo-200/20"
                  >
                    <CallParticipantsList
                      onClose={() => setShowParticipants(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* VIDEO CONTROLS */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 left-0 right-0"
            >
              <div className="flex justify-center">
                <motion.div
                  className="bg-background/90 backdrop-blur-md p-3 rounded-xl  shadow-lg flex items-center gap-3 justify-center px-6"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CallControls onLeave={() => router.push("/")} />

                  <div className="h-8 w-px bg-gray-200/20 mx-1"></div>

                  <div className="flex items-center gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-10 hover:bg-gray-100/10"
                        >
                          <LayoutListIcon className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center">
                        <DropdownMenuItem onClick={() => setLayout("grid")}>
                          Grid View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLayout("speaker")}>
                          Speaker View
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-10 hover:bg-gray-100/10"
                      onClick={() => setShowParticipants(!showParticipants)}
                    >
                      <UsersIcon className="size-4" />
                    </Button>

                    <div>
                      <EndCallButton />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </ResizablePanel>

          <ResizableHandle
            className="bg-indigo-200/20 hover:bg-indigo-300/30"
            withHandle
          />

          <ResizablePanel
            defaultSize={65}
            minSize={25}
            className="bg-background"
          >
            <CodeEditor />
          </ResizablePanel>
        </ResizablePanelGroup>
      </motion.div>
    </>
  );
}

export default MeetingRoom;
