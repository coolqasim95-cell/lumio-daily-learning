export interface Idea {
  id: string;
  title: string;
  content: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: ReturnType<typeof require>;
  category: string;
  description: string;
  readTime: number;
  xpReward: number;
  tags: string[];
  ideas: Idea[];
  quizzes: Quiz[];
}

export const GOALS = [
  { id: "money", label: "Earn More Money", icon: "dollar-sign" },
  { id: "habits", label: "Build Better Habits", icon: "check-square" },
  { id: "productivity", label: "Increase Productivity", icon: "zap" },
  { id: "creativity", label: "Develop Your Creativity", icon: "edit-3" },
  { id: "smarter", label: "Become Smarter", icon: "book-open" },
  { id: "leadership", label: "Improve Leadership", icon: "users" },
  { id: "mindfulness", label: "Find Inner Peace", icon: "heart" },
];

export const CATEGORIES = [
  "All",
  "Habits",
  "Productivity",
  "Mindfulness",
  "Leadership",
  "Finance",
  "Psychology",
];

export const BOOKS: Book[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    cover: require("../assets/images/book_atomic.png"),
    category: "Habits",
    description:
      "Tiny changes lead to remarkable results through the power of compound habits.",
    readTime: 5,
    xpReward: 50,
    tags: ["habits", "productivity"],
    ideas: [
      {
        id: "ah-1",
        title: "The 1% Rule",
        content:
          "Getting 1% better every day doesn't sound like much. But over the course of a year, those tiny gains compound into something extraordinary — you end up 37 times better than when you started.\n\nMost people overestimate what they can do in a single day and drastically underestimate what they can accomplish in a year of consistent, small improvements.",
      },
      {
        id: "ah-2",
        title: "Identity-Based Habits",
        content:
          "The most effective way to change your habits is to change your identity first. Every action you take is a vote for the type of person you want to become.\n\nInstead of saying \"I want to run a marathon,\" say \"I am a runner.\" Your habits naturally follow your identity. The goal is to become, not just to achieve.",
      },
      {
        id: "ah-3",
        title: "The Four Laws of Behavior Change",
        content:
          "Every habit follows four steps: cue, craving, response, and reward. To build a good habit, make it obvious, attractive, easy, and satisfying.\n\nTo break a bad habit, reverse the process: make it invisible, unattractive, difficult, and unsatisfying. This simple framework works for any behavior you want to change.",
      },
      {
        id: "ah-4",
        title: "The Two-Minute Rule",
        content:
          "When you start a new habit, it should take less than two minutes to do. The idea is to make your habits as easy as possible to start — because starting is the hardest part.\n\n\"Read before bed every night\" becomes \"Read one page.\" \"Do thirty minutes of yoga\" becomes \"Take out my yoga mat.\" Scale it down, then build up naturally.",
      },
      {
        id: "ah-5",
        title: "Habit Stacking",
        content:
          "One of the best ways to build a new habit is to identify a current habit you already do each day and then stack your new behavior on top.\n\nFormula: \"After I [CURRENT HABIT], I will [NEW HABIT].\"\n\nThis links your new behavior to a reliable trigger you already have, making it far more likely to stick.",
      },
    ],
    quizzes: [
      {
        id: "ah-q1",
        question:
          "Getting 1% better every day for a year makes you approximately how much better?",
        options: [
          "10 times better",
          "37 times better",
          "100 times better",
          "365 times better",
        ],
        correctIndex: 1,
      },
      {
        id: "ah-q2",
        question:
          "According to the Identity-Based Habits concept, what should change first?",
        options: [
          "Your environment",
          "Your goals",
          "Your identity",
          "Your schedule",
        ],
        correctIndex: 2,
      },
      {
        id: "ah-q3",
        question: "What is the Two-Minute Rule about?",
        options: [
          "Spend two minutes planning your day",
          "New habits should take less than two minutes to start",
          "Work for two minutes then rest",
          "Review habits every two minutes",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    cover: require("../assets/images/book_deep.png"),
    category: "Productivity",
    description:
      "Rules for focused success in a distracted world. Master the ability to focus without distraction.",
    readTime: 5,
    xpReward: 50,
    tags: ["productivity", "focus"],
    ideas: [
      {
        id: "dw-1",
        title: "Deep Work is Rare and Valuable",
        content:
          "The ability to perform deep work — cognitively demanding tasks that push your abilities to their limit — is becoming increasingly rare at exactly the same time it is becoming increasingly valuable.\n\nThose who can cultivate this skill and harness it will thrive. Those who can't will fall behind, no matter how smart they are.",
      },
      {
        id: "dw-2",
        title: "Attention Residue",
        content:
          "When you switch tasks, part of your attention stays stuck on the previous task. This \"attention residue\" makes your next session less effective, even if you feel fully engaged.\n\nMinimizing task-switching and batching similar work together dramatically improves the quality of your thinking — and the output you produce.",
      },
      {
        id: "dw-3",
        title: "Schedule Every Minute",
        content:
          "Most people don't think deeply about how they spend their time. They react. Scheduling every minute of your workday forces you to decide in advance what matters.\n\nIf you don't have a plan, you'll default to whatever is most urgent — not most important. Time-blocking gives your deep work a fighting chance against shallow interruptions.",
      },
      {
        id: "dw-4",
        title: "Embrace Boredom",
        content:
          "If every moment of downtime is filled with your phone, you're training your brain to crave constant stimulation. You're making it harder to sustain focus during the work that matters.\n\nSchedule time away from distractions. Let yourself be bored. Your ability to concentrate is a mental muscle — it needs rest and resistance training.",
      },
      {
        id: "dw-5",
        title: "Quit Social Media",
        content:
          "Social media platforms are optimized to capture your attention indefinitely. The cost isn't the time you spend on them — it's the fragmented attention and reduced capacity for depth that follows you into your work.\n\nApply a craftsman mindset: only use tools that have substantial positive impact on your core goals. Everything else is noise.",
      },
    ],
    quizzes: [
      {
        id: "dw-q1",
        question: "What is \"attention residue\"?",
        options: [
          "Extra focus saved for later",
          "Attention stuck on a previous task after switching",
          "The ability to multitask effectively",
          "Memorizing information deeply",
        ],
        correctIndex: 1,
      },
      {
        id: "dw-q2",
        question:
          "What does Newport recommend for maximizing deep work sessions?",
        options: [
          "Frequent short breaks",
          "Working in cafes for stimulation",
          "Scheduling every minute of your day",
          "Checking email every 30 minutes",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "power-of-now",
    title: "The Power of Now",
    author: "Eckhart Tolle",
    cover: require("../assets/images/book_now.png"),
    category: "Mindfulness",
    description:
      "A guide to spiritual enlightenment — how to live fully in the present moment.",
    readTime: 5,
    xpReward: 50,
    tags: ["mindfulness", "spirituality"],
    ideas: [
      {
        id: "pn-1",
        title: "You Are Not Your Mind",
        content:
          "Most people are so identified with their mind that they don't even realize it. They believe they are their thoughts. But you are the awareness behind the thought — the silent observer watching thoughts arise and pass.\n\nThis distinction is the beginning of freedom. When you realize you are not your thoughts, you stop being controlled by them.",
      },
      {
        id: "pn-2",
        title: "The Eternal Now",
        content:
          "The present moment is the only place where life exists. The past is just a memory trace in the now. The future is an imagined now. All you ever have is this moment.\n\nAnxiety lives in the future. Regret lives in the past. Peace lives here, in the present. Train your attention to return to now — again and again.",
      },
      {
        id: "pn-3",
        title: "The Pain Body",
        content:
          "Accumulated emotional pain from the past forms what Tolle calls the \"pain body\" — a heavy energy field that can suddenly take over your thinking and reactions.\n\nWhen you feel the pain body activate — intense negativity, anger, or sadness — the key is to observe it without identifying with it. Presence dissolves the pain body's grip.",
      },
      {
        id: "pn-4",
        title: "Surrender is Strength",
        content:
          "Surrendering to what is doesn't mean passivity or giving up. It means releasing resistance to the present moment — accepting reality as it is right now.\n\nFrom a place of acceptance, you can take effective action. Resistance creates suffering and wastes energy that could fuel meaningful change.",
      },
      {
        id: "pn-5",
        title: "Inner Space",
        content:
          "True intelligence arises from stillness. When you create inner space — gaps in your thinking — something deeper than thought emerges: creativity, insight, peace, love.\n\nA simple practice: take one conscious breath. Feel it fully. In that single breath, you've stepped out of the stream of compulsive thinking and into the now.",
      },
    ],
    quizzes: [
      {
        id: "pn-q1",
        question: "According to Tolle, where does anxiety primarily live?",
        options: [
          "In the body",
          "In the present moment",
          "In the future",
          "In the past",
        ],
        correctIndex: 2,
      },
      {
        id: "pn-q2",
        question: "What is the \"pain body\"?",
        options: [
          "Physical pain from stress",
          "Accumulated emotional pain from the past",
          "Fear of the future",
          "The thinking mind",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "think-grow-rich",
    title: "Think & Grow Rich",
    author: "Napoleon Hill",
    cover: require("../assets/images/book_think.png"),
    category: "Finance",
    description:
      "The timeless classic on the psychology of success, wealth, and achievement.",
    readTime: 5,
    xpReward: 50,
    tags: ["finance", "mindset", "money"],
    ideas: [
      {
        id: "tgr-1",
        title: "Desire: The Starting Point",
        content:
          "Every achievement begins with a burning desire — not a wish, not a hope, but an obsessive, relentless desire. Hill studied 500 of the most successful people of his era and found one common starting point: definite desire.\n\nYour desire must be specific. Not \"I want more money\" but \"I will have $50,000 by December 31st by providing value through X.\"",
      },
      {
        id: "tgr-2",
        title: "The Master Mind Alliance",
        content:
          "No individual has enough knowledge, experience, or time to achieve great success alone. The Master Mind principle is the coordination of two or more minds working in harmony toward a definite purpose.\n\nWhen minds blend, a third invisible force emerges — a collective intelligence more powerful than any single mind. Surround yourself with people who elevate your thinking.",
      },
      {
        id: "tgr-3",
        title: "Autosuggestion",
        content:
          "Your subconscious mind cannot tell the difference between a real experience and one you vividly imagine. Feed it the right images deliberately.\n\nRead your definite chief aim aloud with emotion twice daily — once before sleeping, once upon waking. The subconscious acts on what it receives repeatedly and emotionally. Use it intentionally.",
      },
      {
        id: "tgr-4",
        title: "Specialized Knowledge",
        content:
          "General knowledge is almost worthless in the accumulation of wealth. It's the specialized kind — focused, organized, applied — that creates leverage.\n\nYou don't need to know everything. You need to know one thing deeply, find a way to package it into value for others, and be relentless about delivering that value. That's the formula.",
      },
      {
        id: "tgr-5",
        title: "The Sixth Sense",
        content:
          "The sixth sense — Hill's term for creative intelligence or intuition — becomes accessible only after years of applying the other principles. It's the ability to receive ideas, warnings, and solutions that seem to come from nowhere.\n\nThis is not mysticism. It's what happens when your mind is conditioned, your purpose is clear, and your subconscious is fully engaged in solving problems for you.",
      },
    ],
    quizzes: [
      {
        id: "tgr-q1",
        question: "What is the Master Mind Alliance?",
        options: [
          "Reading books by great thinkers",
          "Two or more minds working in harmony toward a definite purpose",
          "Having a personal mentor",
          "Daily self-reflection practice",
        ],
        correctIndex: 1,
      },
      {
        id: "tgr-q2",
        question:
          "How should you use autosuggestion most effectively according to Hill?",
        options: [
          "Write your goals once a week",
          "Meditate silently on your goals",
          "Read your goals aloud with emotion twice daily",
          "Tell your friends about your goals",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "start-with-why",
    title: "Start With Why",
    author: "Simon Sinek",
    cover: require("../assets/images/book_why.png"),
    category: "Leadership",
    description:
      "How great leaders inspire action by communicating from the inside out.",
    readTime: 5,
    xpReward: 50,
    tags: ["leadership", "purpose"],
    ideas: [
      {
        id: "sw-1",
        title: "The Golden Circle",
        content:
          "Most organizations communicate from the outside in: What → How → Why. But the most inspiring leaders and companies do the opposite: Why → How → What.\n\nApple doesn't say \"We make great computers. Want to buy one?\" They say \"We believe in challenging the status quo. We believe in thinking differently. We make great computers. Want to buy one?\" — and people line up around the block.",
      },
      {
        id: "sw-2",
        title: "People Don't Buy What You Do",
        content:
          "People don't buy what you do; they buy why you do it. This isn't opinion — it's biology. The part of the brain that controls decision-making (the limbic system) has no capacity for language.\n\nWhen you communicate your Why, you speak directly to the part of the brain that controls behavior. Logic alone rarely moves people to action. Belief does.",
      },
      {
        id: "sw-3",
        title: "The Law of Diffusion of Innovation",
        content:
          "Innovators and early adopters (about 15-18% of any market) are driven by beliefs. The early and late majority need social proof before they act.\n\nThe lesson: don't try to convince the majority first. Win the believers — the true fans who share your Why. They'll bring the rest. Mass adoption follows authentic belief, not mass marketing.",
      },
      {
        id: "sw-4",
        title: "Clarity, Discipline, Consistency",
        content:
          "Finding your Why requires clarity. Living your Why requires discipline — every decision, hire, and product must be consistent with your Why. Communicating your Why requires consistency in message.\n\nWhen clarity, discipline, and consistency align, trust emerges. Trust is the ultimate competitive advantage — and it's built only over time, through actions that match words.",
      },
      {
        id: "sw-5",
        title: "Leaders vs. Those Who Lead",
        content:
          "There is a difference between those who hold a position of authority and those who lead. Authority is given. Leadership is earned through the ability to inspire.\n\nThose who lead make us feel safe. They make us feel we belong to something greater than ourselves. We follow them not because we have to, but because we want to — because their Why resonates with our own.",
      },
    ],
    quizzes: [
      {
        id: "sw-q1",
        question: "What is the correct order of the Golden Circle for inspiring leaders?",
        options: [
          "What → How → Why",
          "How → Why → What",
          "Why → How → What",
          "What → Why → How",
        ],
        correctIndex: 2,
      },
      {
        id: "sw-q2",
        question: "What part of the brain controls decision-making?",
        options: [
          "The neocortex",
          "The limbic system",
          "The frontal lobe",
          "The cerebellum",
        ],
        correctIndex: 1,
      },
    ],
  },
];
