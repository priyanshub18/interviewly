import { GoogleGenerativeAI } from "@google/generative-ai";

function extractJSON(input: string | object) {
  try {
    if (typeof input === "object") return input;

    if (typeof input === "string") {
      const backtickMatch = input.match(/```json([\s\S]*?)```/);
      if (backtickMatch) {
        try {
          return JSON.parse(backtickMatch[1].trim());
        } catch (error) {
          console.error("Error parsing JSON from backticks:", error);
          return null;
        }
      }

      try {
        return JSON.parse(input);
      } catch (error) {
        console.error("Error parsing direct JSON:", error);
        return null;
      }
    }
    console.error("No valid JSON could be extracted");
    return null;
  } catch (error) {
    console.error("Unexpected error in extractJSON function:", error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    console.log("POST request received");

    // Improved error handling for request body parsing
    let requestBody;
    try {
      const text = await req.text();
      console.log("Raw request body:", text);
      requestBody = JSON.parse(text);
    } catch (error: any) {
      console.error("Error parsing request body:", error);
      return new Response(
        JSON.stringify({
          error: "Invalid JSON in request body",
          details: error.message,
          position: error.message.match(/position (\d+)/)?.[1] || "unknown",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const { problem_number, problem_description } = requestBody;

    // Validate required fields
    if (!problem_number || !problem_description) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields",
          required: [
            "job_title",
            "number_of_days",
            "hours_per_day",
            "my_current_skills",
            "required_job_skills",
          ],
          received: Object.keys(requestBody),
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key not found" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      };

      const prompt = `You are given a LeetCode problem with the following details:
•	LeetCode Problem Number: ${problem_number}
•	LeetCode Problem Title: ${problem_description} Give problem number more priority than problem title.
Your task is to create a JSON object with the following structure:{
"id": "unique-kebab-case-id",
"title": "Problem Title",
"description": "Detailed problem description with logic, format, and clarity similar to LeetCode.",
"examples": [
{ "input": "example input 1", "output": "example output 1" },
{ "input": "example input 2", "output": "example output 2" }
],
"constraints": [
"Constraint 1",
"Constraint 2",
"...and so on"
],
"starterCode": {
"javascript": "// JavaScript\nfunction solution() {\n  // Write your solution here\n}",
"python": "# Python\ndef solution():\n    # Write your solution here\n    pass",
"java": "// Java\npublic class Solution {\n    public void solution() {\n        // Write your solution here\n    }\n}",
"cpp": "// C++\nvoid solution() {\n    // Write your solution here\n}"
}
}Format your response as a pure JSON object, without any extra explanation. Make sure the id is in kebab-case format based on the problem title.`;

      try {
        const chatSession = model.startChat({
          generationConfig,
          history: [
            {
              role: "user",
              parts: [
                {
                  text: 'You are given a LeetCode problem with the following details:\n\t•\tLeetCode Problem Number: 100\n\t•\tLeetCode Problem Title: \n\nYour task is to create a JSON object with the following structure:{\n  "id": "unique-kebab-case-id",\n  "title": "Problem Title",\n  "description": "Detailed problem description with logic, format, and clarity similar to LeetCode.",\n  "examples": [\n    { "input": "example input 1", "output": "example output 1" },\n    { "input": "example input 2", "output": "example output 2" }\n  ],\n  "constraints": [\n    "Constraint 1",\n    "Constraint 2",\n    "...and so on"\n  ],\n  "starterCode": {\n    "javascript": "// JavaScript\\nfunction solution() {\\n  // Write your solution here\\n}",\n    "python": "# Python\\ndef solution():\\n    # Write your solution here\\n    pass",\n    "java": "// Java\\npublic class Solution {\\n    public void solution() {\\n        // Write your solution here\\n    }\\n}",\n    "cpp": "// C++\\nvoid solution() {\\n    // Write your solution here\\n}"\n  }\n}Format your response as a pure JSON object, without any extra explanation. Make sure the id is in kebab-case format based on the problem title.\n',
                },
              ],
            },
            {
              role: "model",
              parts: [
                {
                  text: '```json\n{\n  "id": "same-tree",\n  "title": "Same Tree",\n  "description": "Given the roots of two binary trees `p` and `q`, write a function to check if they are the same.\\n\\nTwo binary trees are considered the same if they are structurally identical, and the nodes have the same value.\\n\\nSpecifically:\\n\\n1.  If both trees are empty, they are the same.\\n2.  If only one tree is empty, they are not the same.\\n3.  If the root nodes have different values, they are not the same.\\n4.  Recursively check the left and right subtrees for equality.",\n  "examples": [\n    {\n      "input": "p = [1,2,3], q = [1,2,3]",\n      "output": "true"\n    },\n    {\n      "input": "p = [1,2], q = [1,null,2]",\n      "output": "false"\n    },\n    {\n      "input": "p = [1,2,1], q = [1,1,2]",\n      "output": "false"\n    }\n  ],\n  "constraints": [\n    "The number of nodes in both trees is in the range [0, 100].",\n    "-10^4 <= Node.val <= 10^4"\n  ],\n  "starterCode": {\n    "javascript": "// JavaScript\\n/**\\n * Definition for a binary tree node.\\n * function TreeNode(val, left, right) {\\n *     this.val = (val===undefined ? 0 : val)\\n *     this.left = (left===undefined ? null : left)\\n *     this.right = (right===undefined ? null : right)\\n * }\\n */\\n/**\\n * @param {TreeNode} p\\n * @param {TreeNode} q\\n * @return {boolean}\\n */\\nvar isSameTree = function(p, q) {\\n    if (!p && !q) return true;\\n    if (!p || !q) return false;\\n    if (p.val !== q.val) return false;\\n    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\\n};",\n    "python": "# Python\\n# Definition for a binary tree node.\\n# class TreeNode:\\n#     def __init__(self, val=0, left=None, right=None):\\n#         self.val = val\\n#         self.left = left\\n#         self.right = right\\nclass Solution:\\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\\n        if not p and not q:\\n            return True\\n        if not p or not q:\\n            return False\\n        if p.val != q.val:\\n            return False\\n        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)",\n    "java": "// Java\\n/**\\n * Definition for a binary tree node.\\n * public class TreeNode {\\n *     int val;\\n *     TreeNode left;\\n *     TreeNode right;\\n *     TreeNode() {}\\n *     TreeNode(int val) { this.val = val; }\\n *     TreeNode(int val, TreeNode left, TreeNode right) {this.val = val; this.left = left; this.right = right;}\\n * }\\n */\\nclass Solution {\\n    public boolean isSameTree(TreeNode p, TreeNode q) {\\n        if (p == null && q == null) return true;\\n        if (p == null || q == null) return false;\\n        if (p.val != q.val) return false;\\n        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\\n    }\\n}",\n    "cpp": "// C++\\n/**\\n * Definition for a binary tree node.\\n * struct TreeNode {\\n *     int val;\\n *     TreeNode *left;\\n *     TreeNode *right;\\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\\n * };\\n */\\nclass Solution {\\npublic:\\n    bool isSameTree(TreeNode* p, TreeNode* q) {\\n        if (!p && !q) return true;\\n        if (!p || !q) return false;\\n        if (p->val != q->val) return false;\\n        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);\\n    }\\n};"\n  }\n}\n```',
                },
              ],
            },
          ],
        });

        const result = await chatSession.sendMessage(prompt);
        const ans = extractJSON(result.response.text());

        if (!ans) {
          return new Response(
            JSON.stringify({
              error: "Failed to parse JSON response from Gemini",
            }),
            {
              status: 500,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        }

        return new Response(JSON.stringify(ans), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error: any) {
        console.error("Error in chatSession communication:", error);
        return new Response(
          JSON.stringify({
            error: "Failed to communicate with Gemini API",
            details: error.message,
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }
    } catch (error: any) {
      console.error("Error initializing Gemini API:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to initialize Gemini API",
          details: error.message,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  } catch (error: any) {
    console.error("Unhandled error in POST handler:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
