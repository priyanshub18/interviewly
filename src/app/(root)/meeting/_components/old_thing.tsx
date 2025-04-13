import React from "react";

const pages = () => {
  return (
    <div>
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">
            Problems<span className="text-red-500">*</span>
          </label>
          <Button
            className="bg-blue-600 hover:bg-blue-700 transition-all font-medium text-white p-2"
            onClick={() => router.push("/create-problem")}
          >
            <ArrowUpRight className="w-4 h-4 mr-1" />
            Create
          </Button>
        </div>

        {/* Selected Interviewers */}
        <div className="border border-blue-200  rounded-md p-3 min-h-24 flex flex-wrap gap-2 mb-2">
          {selectedInterviewers.length > 0 ? (
            selectedInterviewers.map((interviewer) => (
              <motion.div
                key={interviewer.clerkId}
                className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-md text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <UserInfo user={interviewer} />
                {interviewer.clerkId !== user?.id && (
                  <motion.button
                    onClick={() => removeInterviewer(interviewer.clerkId)}
                    className="hover:text-destructive transition-colors"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XIcon className="h-4 w-4" />
                  </motion.button>
                )}
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No Problems selected
            </p>
          )}
        </div>

        {/* Add Interviewers Dropdown */}
        {availableInterviewers.length > 0 && (
          <Select onValueChange={addInterviewer}>
            <SelectTrigger className="border-blue-200 focus:ring-blue-400 ">
              <SelectValue placeholder="Add interviewer" />
            </SelectTrigger>
            <SelectContent>
              {availableInterviewers.map((interviewer) => (
                <SelectItem
                  key={interviewer.clerkId}
                  value={interviewer.clerkId}
                >
                  <UserInfo user={interviewer} />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default pages;

<div className="space-y-2">
  <div className="flex items-center justify-between mb-2">
    <label className="text-sm font-medium">
      Problems<span className="text-red-500">*</span>
    </label>
    <Button
      className="bg-blue-600 hover:bg-blue-700 transition-all font-medium text-white p-2"
      onClick={() => router.push("/create-problem")}
    >
      <ArrowUpRight className="w-4 h-4 mr-1" />
      Create
    </Button>
  </div>

  {/* Selected Interviewers */}
  <div className="border border-blue-200  rounded-md p-3 min-h-24 flex flex-wrap gap-2 mb-2">
    {selectedInterviewers.length > 0 ? (
      selectedInterviewers.map((interviewer) => (
        <motion.div
          key={interviewer.clerkId}
          className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-md text-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <UserInfo user={interviewer} />
          {interviewer.clerkId !== user?.id && (
            <motion.button
              onClick={() => removeInterviewer(interviewer.clerkId)}
              className="hover:text-destructive transition-colors"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <XIcon className="h-4 w-4" />
            </motion.button>
          )}
        </motion.div>
      ))
    ) : (
      <p className="text-sm text-muted-foreground">No Problems selected</p>
    )}
  </div>

  {/* Add Interviewers Dropdown */}
  {availableInterviewers.length > 0 && (
    <Select onValueChange={addInterviewer}>
      <SelectTrigger className="border-blue-200 focus:ring-blue-400 ">
        <SelectValue placeholder="Add interviewer" />
      </SelectTrigger>
      <SelectContent>
        {availableInterviewers.map((interviewer) => (
          <SelectItem key={interviewer.clerkId} value={interviewer.clerkId}>
            <UserInfo user={interviewer} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )}
</div>;
