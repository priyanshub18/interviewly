import React, { useState } from "react";
import { XIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data structure for the problem statements
const SAMPLE_PROBLEMS = [
  {
    id: "two-sum",
    number: 1,
    title: "Two Sum",
    difficulty: "Easy",
  },
  {
    id: "add-two-numbers",
    number: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
  },
  {
    id: "longest-substring",
    number: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
  },
  {
    id: "median-two-arrays",
    number: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
  },
];

// Component to display problem info
const ProblemInfo = ({ problem }) => (
  <div className="flex items-center gap-1">
    <span className="font-medium">{problem.number}.</span>
    <span>{problem.title}</span>
    <span
      className={`text-xs px-1.5 py-0.5 rounded ${
        problem.difficulty === "Easy"
          ? "bg-green-100 text-green-800"
          : problem.difficulty === "Medium"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
      }`}
    >
      {problem.difficulty}
    </span>
  </div>
);

export default function ProblemSelection() {
  const [selectedProblems, setSelectedProblems] = useState([]);

  // Get problems that haven't been selected yet
  const availableProblems = SAMPLE_PROBLEMS.filter(
    (problem) => !selectedProblems.some((p) => p.id === problem.id),
  );

  const addProblem = (problemId) => {
    const problemToAdd = SAMPLE_PROBLEMS.find((p) => p.id === problemId);
    if (problemToAdd) {
      setSelectedProblems([...selectedProblems, problemToAdd]);
    }
  };

  const removeProblem = (problemId) => {
    setSelectedProblems(selectedProblems.filter((p) => p.id !== problemId));
  };

  return (
    <div className="space-y-2">
      <div className="border border-blue-200 rounded-md p-3 min-h-24 flex flex-wrap gap-2 mb-2">
        {selectedProblems.length > 0 ? (
          selectedProblems.map((problem) => (
            <motion.div
              key={problem.id}
              className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-md text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <ProblemInfo problem={problem} />
              <motion.button
                onClick={() => removeProblem(problem.id)}
                className="hover:text-destructive transition-colors"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <XIcon className="h-4 w-4" />
              </motion.button>
            </motion.div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No Problems selected</p>
        )}
      </div>

      {/* Add Problems Dropdown */}
      {availableProblems.length > 0 && (
        <Select onValueChange={addProblem}>
          <SelectTrigger className="border-blue-200 focus:ring-blue-400">
            <SelectValue placeholder="Add problem" />
          </SelectTrigger>
          <SelectContent>
            {availableProblems.map((problem) => (
              <SelectItem key={problem.id} value={problem.id}>
                <ProblemInfo problem={problem} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
