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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cover: any;
  category: string;
  description: string;
  readTime: number;
  xpReward: number;
  tags: string[];
  gradientFrom: string;
  gradientTo: string;
  ideas: Idea[];
  quizzes: Quiz[];
  isCustom?: boolean;
}

export const GOALS = [
  { id: "money", label: "Earn More Money", icon: "dollar-sign" },
  { id: "habits", label: "Build Better Habits", icon: "check-square" },
  { id: "productivity", label: "Increase Productivity", icon: "zap" },
  { id: "mindset", label: "Strengthen My Mindset", icon: "shield" },
  { id: "smarter", label: "Think Smarter", icon: "book-open" },
  { id: "leadership", label: "Become a Leader", icon: "users" },
  { id: "mindfulness", label: "Find Inner Peace", icon: "heart" },
];

export const CATEGORIES = [
  "All",
  "Mindset",
  "Habits",
  "Productivity",
  "Psychology",
  "Finance",
  "Health",
  "Marketing",
  "Custom",
];

export const BOOKS: Book[] = [
  {
    id: "cant-hurt-me",
    title: "Can't Hurt Me",
    author: "David Goggins",
    cover: require("../assets/images/book_goggins.png"),
    category: "Mindset",
    description:
      "Master your mind and defy the odds. Goggins shows you're only living at 40% of your true potential.",
    readTime: 6,
    xpReward: 60,
    tags: ["mindset", "discipline", "mental toughness"],
    gradientFrom: "#374151",
    gradientTo: "#EF4444",
    ideas: [
      {
        id: "chm-1",
        title: "The 40% Rule",
        content:
          "When your mind says you're done, you're actually only at 40% of your true capacity. Your brain is designed to protect you by throwing up a wall long before you reach your actual limit.\n\nThe next time you feel like quitting, remember: you still have 60% left. Push through the mental wall, and you'll discover a version of yourself you didn't know existed.",
      },
      {
        id: "chm-2",
        title: "The Accountability Mirror",
        content:
          "Every morning, Goggins would stand in front of his bathroom mirror and face every lie, every excuse, every failure. He called them out out loud. No hiding.\n\nThe mirror doesn't lie. When you hold yourself radically accountable — not to a coach or a boss, but to your own reflection — transformation becomes unavoidable. Start there.",
      },
      {
        id: "chm-3",
        title: "Callous Your Mind",
        content:
          "Just like hands develop calluses from repeated friction, your mind can be hardened through repeated exposure to discomfort. You have to choose hard things consistently.\n\nWake up early when you don't want to. Run when it's raining. Sit with discomfort deliberately. Each time you do, your mental armor gets thicker and your threshold for quitting rises.",
      },
      {
        id: "chm-4",
        title: "The Cookie Jar Method",
        content:
          "In your darkest moments, reach into your imaginary cookie jar. It holds every hard thing you've ever conquered — every race finished, every doubt you overcame, every time you chose discipline over comfort.\n\nThese victories are evidence. Pull one out, feel it, and remember: you've been here before. You survived. You can do it again.",
      },
      {
        id: "chm-5",
        title: "Taking Souls",
        content:
          "Taking souls isn't about defeating others — it's about performing so relentlessly that those around you are forced to respect your work ethic, even if they never say so.\n\nWhen someone expects you to be average, use that as fuel. Exceed expectations so dramatically that their doubt becomes your motivation. Let your output do the talking.",
      },
    ],
    quizzes: [
      {
        id: "chm-q1",
        question: "According to Goggins, what percentage of your capacity is your mind's 'quit point'?",
        options: ["20%", "40%", "60%", "80%"],
        correctIndex: 1,
      },
      {
        id: "chm-q2",
        question: "What does the Cookie Jar Method involve?",
        options: [
          "Rewarding yourself with food after workouts",
          "Storing past victories to draw strength from in dark moments",
          "Tracking your daily calories",
          "Writing gratitude lists each morning",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    cover: require("../assets/images/book_atomic2.png"),
    category: "Habits",
    description:
      "Tiny changes, remarkable results. The proven system for building good habits and breaking bad ones.",
    readTime: 5,
    xpReward: 50,
    tags: ["habits", "productivity", "systems"],
    gradientFrom: "#F5A623",
    gradientTo: "#EF4444",
    ideas: [
      {
        id: "ah-1",
        title: "The 1% Rule",
        content:
          "Getting 1% better every single day sounds like nothing. But compound it over a year and you're 37 times better. Compound it over a decade and it's not even recognizable as the same person.\n\nThe math of improvement is asymmetric — tiny daily inputs create outsized long-term outputs. The problem is that early progress is invisible, so most people quit before the results arrive.",
      },
      {
        id: "ah-2",
        title: "Identity Over Outcomes",
        content:
          "Most people try to change their habits by focusing on outcomes: lose 20 lbs, write a book, save money. This is backwards. The most durable change starts with identity.\n\nEvery action you take is a vote for the type of person you want to become. Cast enough votes and your identity shifts. Then the habits follow naturally — not through willpower, but through who you now believe you are.",
      },
      {
        id: "ah-3",
        title: "Make It Obvious, Attractive, Easy, Satisfying",
        content:
          "The Four Laws of Behavior Change are the building blocks of every habit. To build a good habit: make it obvious (cue), make it attractive (craving), make it easy (response), make it satisfying (reward).\n\nTo break a bad habit, invert all four. Make it invisible, unattractive, difficult, and unsatisfying. The same framework works for both directions — it just depends which way you turn the dial.",
      },
      {
        id: "ah-4",
        title: "The Two-Minute Rule",
        content:
          "Any new habit should start by taking less than two minutes. Not run a marathon — put on your running shoes. Not meditate for 20 minutes — sit in your meditation spot.\n\nThis isn't about doing less. It's about mastering the art of showing up. Once you've made showing up automatic, scaling up is easy. The obstacle is always starting — remove that obstacle.",
      },
      {
        id: "ah-5",
        title: "Habit Stacking",
        content:
          "Stack a new habit onto an existing one using a simple formula: \"After I [EXISTING HABIT], I will [NEW HABIT].\"\n\nYour current habits are reliable triggers that fire every day without thinking. Attach new behaviors to them and they inherit that reliability. The trick is precision — the more specific the trigger, the more likely the new habit fires.",
      },
    ],
    quizzes: [
      {
        id: "ah-q1",
        question: "Getting 1% better every day for a year makes you how much better?",
        options: ["3.65 times", "10 times", "37 times", "100 times"],
        correctIndex: 2,
      },
      {
        id: "ah-q2",
        question: "Which of these is NOT one of the Four Laws of Behavior Change?",
        options: ["Make it obvious", "Make it social", "Make it easy", "Make it satisfying"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "12-rules",
    title: "12 Rules for Life",
    author: "Jordan B. Peterson",
    cover: require("../assets/images/book_12rules.png"),
    category: "Psychology",
    description:
      "An antidote for chaos. Ancient and modern wisdom fused into practical rules for living a meaningful life.",
    readTime: 6,
    xpReward: 60,
    tags: ["psychology", "meaning", "philosophy"],
    gradientFrom: "#1E3A5F",
    gradientTo: "#0D7377",
    ideas: [
      {
        id: "12r-1",
        title: "Stand Up Straight",
        content:
          "Lobsters establish hierarchy through posture. So do humans. When you win, serotonin rises, posture improves, and others perceive you as competent. When you lose, the reverse happens.\n\nThis isn't advice about faking confidence. It's about understanding that your body language signals your status to your own brain. Standing straight isn't vanity — it's a neurochemical choice. Carry yourself like someone worth listening to.",
      },
      {
        id: "12r-2",
        title: "Treat Yourself Like Someone You're Responsible For",
        content:
          "People are better at filling prescriptions for their dogs than for themselves. They neglect their own needs in ways they'd never neglect a loved one's.\n\nAsk yourself: What would I do for someone I genuinely cared about? Give yourself that same care. You are worth it. The world needs you functional and whole. Neglecting yourself isn't humility — it's self-destruction.",
      },
      {
        id: "12r-3",
        title: "Compare Yourself to Yesterday",
        content:
          "Stop measuring yourself against other people. It's a losing game — there will always be someone richer, smarter, fitter. Instead, ask: am I better than I was yesterday? Last month? Last year?\n\nThis is the only meaningful competition — you versus your past self. Every small improvement is a genuine victory. Focus on your trajectory, not your rank.",
      },
      {
        id: "12r-4",
        title: "Pursue Meaning, Not Happiness",
        content:
          "Happiness is a byproduct — when you chase it directly, it escapes. What doesn't escape you is meaning: the sense that what you're doing matters, that you're bearing the right kind of burden.\n\nMeaning comes from responsibility. Taking on challenges, sacrificing for others, striving for something beyond yourself. This is what makes hardship bearable and success meaningful.",
      },
      {
        id: "12r-5",
        title: "Tell the Truth",
        content:
          "Lying is a form of manipulation — you're shaping reality to what you want others to believe rather than what is. But the world organizes itself around truth, and deception generates chaos.\n\nWhen you tell the truth — especially when it's uncomfortable — you build the kind of integrity that allows you to trust yourself. And a person who can trust themselves is formidable.",
      },
    ],
    quizzes: [
      {
        id: "12r-q1",
        question: "What does Peterson use the lobster to illustrate?",
        options: [
          "The importance of diet",
          "How hierarchy and posture affect neurochemistry",
          "Why some people are aggressive",
          "The benefits of ocean living",
        ],
        correctIndex: 1,
      },
      {
        id: "12r-q2",
        question: "Peterson says you should compare yourself to whom?",
        options: [
          "The most successful person you know",
          "Your peers at work",
          "Who you were yesterday",
          "Historical role models",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "48-laws",
    title: "48 Laws of Power",
    author: "Robert Greene",
    cover: require("../assets/images/book_48laws.png"),
    category: "Psychology",
    description:
      "The definitive guide to the ruthless laws of power — extracted from 3,000 years of history.",
    readTime: 6,
    xpReward: 60,
    tags: ["power", "strategy", "psychology"],
    gradientFrom: "#1A1A1A",
    gradientTo: "#B8860B",
    ideas: [
      {
        id: "48l-1",
        title: "Never Outshine the Master",
        content:
          "Always make those above you feel comfortable and superior. If you display too much talent, you create insecurity in those above you — and insecure people with power become dangerous.\n\nYour goal isn't to look impressive to everyone. It's to make your superiors feel that their brilliance is reflected by your work. Let them have the credit; you'll have the real influence.",
      },
      {
        id: "48l-2",
        title: "Conceal Your Intentions",
        content:
          "Keep people off-balance by never revealing your actual aims. When people know your goals, they can anticipate your moves, prepare defenses, and undercut you before you've begun.\n\nDiversion is your tool. Talk enthusiastically about decoy objectives. Let people think they understand you while you quietly execute your actual plan. Opacity is a form of armor.",
      },
      {
        id: "48l-3",
        title: "Always Say Less Than Necessary",
        content:
          "When you speak too much, you dilute your authority and often reveal more than you intend. Silence is power — it creates uncertainty in others and forces them to fill the void.\n\nThe more you say, the more ordinary you appear and the more likely you are to contradict yourself. Learn to communicate impact with precision. Brief, deliberate words carry far more weight than verbose explanations.",
      },
      {
        id: "48l-4",
        title: "Guard Your Reputation",
        content:
          "Reputation is the cornerstone of power. Once it's built on the right foundations, it acts as a force multiplier — doors open, trust is extended, and influence flows naturally.\n\nDefend your reputation relentlessly. A single serious attack on it can unravel years of work. And when opportunity arises, destroy the reputations of enemies before they can move against you.",
      },
      {
        id: "48l-5",
        title: "Win Through Actions, Not Arguments",
        content:
          "In argument, even if you win intellectually, you often lose socially — the loser resents you. Convince people through demonstration rather than debate.\n\nAction is more eloquent than words. When you show results, there is nothing to argue against. Let your outcomes speak. Make people experience your value rather than being told about it.",
      },
    ],
    quizzes: [
      {
        id: "48l-q1",
        question: "Why should you never outshine the master?",
        options: [
          "It's disrespectful",
          "It creates insecurity in those above you, which is dangerous",
          "You should always try to be average",
          "Masters are always right",
        ],
        correctIndex: 1,
      },
      {
        id: "48l-q2",
        question: "Why does Greene recommend saying less than necessary?",
        options: [
          "To be polite",
          "Silence creates uncertainty and preserves your authority",
          "To save time",
          "People don't like to listen",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "8-mental-models",
    title: "8 Mental Models",
    author: "BowTiedBarbary",
    cover: require("../assets/images/book_mental.png"),
    category: "Productivity",
    description:
      "Eight time-tested thinking tools that separate average from exceptional. Applied mental carpentry.",
    readTime: 5,
    xpReward: 50,
    tags: ["thinking", "models", "strategy"],
    gradientFrom: "#6B21A8",
    gradientTo: "#1D4ED8",
    ideas: [
      {
        id: "mm-1",
        title: "Parkinson's Law",
        content:
          "Work expands to fill the time available for its completion. If you give yourself two weeks to do something, it will take two weeks. Give yourself two days and it'll take two days — often with comparable quality.\n\nStop letting timelines be comfortable. Compress them intentionally. Artificial urgency creates focus that unlimited time never will. Set a deadline and let the pressure sharpen your output.",
      },
      {
        id: "mm-2",
        title: "Sturgeon's Law: 90% Is Crap",
        content:
          "90% of everything — books, advice, content, ideas — is noise. This applies to your own thoughts as well. Most of what runs through your head in a day is reactive mental chatter with zero signal value.\n\nThe goal isn't to consume more. It's to filter better. Develop the ability to quickly identify which 10% actually moves the needle and ruthlessly ignore everything else.",
      },
      {
        id: "mm-3",
        title: "The Eisenhower Matrix",
        content:
          "Every task falls into one of four quadrants: Urgent+Important (do now), Important+Not Urgent (schedule), Urgent+Not Important (delegate), and Neither (eliminate).\n\nMost people live in the urgent quadrant. High performers live in the important-but-not-urgent quadrant — where strategy, health, relationships, and long-term thinking live. Reorganize your days around this distinction.",
      },
      {
        id: "mm-4",
        title: "Second-Order Thinking",
        content:
          "First-order thinking: What happens if I do X? Second-order thinking: And then what? And then what after that?\n\nMost people only think one step ahead. Second-order thinking forces you to visualize the chain reaction your decisions will trigger. The best decisions often look bad in the short term. The worst decisions often look good until their consequences compound.",
      },
      {
        id: "mm-5",
        title: "The Pareto Principle",
        content:
          "80% of outcomes come from 20% of inputs. 80% of your revenue from 20% of customers. 80% of your results from 20% of your habits. And it compounds: 20% of that 20% produces 80% of 80%.\n\nYour job is to find your 20% and pour resources into it. Cut the 80% that produces minimal return. This isn't laziness — it's leverage.",
      },
    ],
    quizzes: [
      {
        id: "mm-q1",
        question: "What does Parkinson's Law state?",
        options: [
          "Work is always hard",
          "Work expands to fill the time allotted for it",
          "90% of work is wasted",
          "Important work should come first",
        ],
        correctIndex: 1,
      },
      {
        id: "mm-q2",
        question: "In the Eisenhower Matrix, where should high performers spend most of their time?",
        options: [
          "Urgent and Important",
          "Urgent and Not Important",
          "Important and Not Urgent",
          "Neither Urgent nor Important",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "attached",
    title: "Attached",
    author: "Amir Levine & Rachel Heller",
    cover: require("../assets/images/book_attached.png"),
    category: "Psychology",
    description:
      "The science of adult attachment and why knowing your style can transform your relationships.",
    readTime: 5,
    xpReward: 50,
    tags: ["relationships", "psychology", "attachment"],
    gradientFrom: "#EC4899",
    gradientTo: "#F97316",
    ideas: [
      {
        id: "att-1",
        title: "The Three Attachment Styles",
        content:
          "Every adult has a primary attachment style shaped by early experiences: Secure (comfortable with intimacy and independence), Anxious (craves closeness, fears abandonment), or Avoidant (values independence, fears engulfment).\n\nKnowing your style — and your partner's — is like getting a map to your relationship dynamics. Most conflict isn't personality clashes. It's attachment systems colliding.",
      },
      {
        id: "att-2",
        title: "The Anxious Style",
        content:
          "Anxiously attached people are hyper-attuned to perceived threats to the relationship. They monitor body language, overanalyze texts, and experience intense distress at distance.\n\nThis isn't neediness — it's a nervous system set to maximum sensitivity. Understanding this removes the shame. The goal isn't to stop needing connection, but to communicate those needs clearly instead of through protest behaviors.",
      },
      {
        id: "att-3",
        title: "The Avoidant Style",
        content:
          "Avoidant people have learned that depending on others leads to disappointment. They value self-sufficiency above all, become uncomfortable with too much closeness, and tend to pull away precisely when intimacy deepens.\n\nAvoidance isn't coldness — it's protection. Understanding this helps partners not take the withdrawal personally, and helps avoidants see when their defense mechanism is sabotaging real connection.",
      },
      {
        id: "att-4",
        title: "Dependency Is Not a Flaw",
        content:
          "Modern culture glorifies self-sufficiency and pathologizes needing others. But the research is clear: our brains are wired for connection. We are biologically designed to depend on close partners for emotional regulation.\n\nHealthy dependency — relying on a secure partner — actually makes you more capable, confident, and adventurous. It's not weakness. It's the foundation from which growth is possible.",
      },
      {
        id: "att-5",
        title: "Secure Relationships Are Learnable",
        content:
          "Even if you weren't raised with secure attachment, you can develop it — through therapy, through conscious partnerships with secure individuals, or through understanding your patterns well enough to change them.\n\nSecurity isn't a fixed trait. It's a skill. People with anxious or avoidant styles consistently move toward security when they understand their patterns and find partners who actively co-create a safe emotional environment.",
      },
    ],
    quizzes: [
      {
        id: "att-q1",
        question: "Which attachment style is characterized by fear of abandonment?",
        options: ["Secure", "Avoidant", "Anxious", "Disorganized"],
        correctIndex: 2,
      },
      {
        id: "att-q2",
        question: "What does the book argue about dependency?",
        options: [
          "It is always unhealthy",
          "We should strive for complete independence",
          "Healthy dependency is natural and supports growth",
          "Only anxious people experience dependency",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "iceman",
    title: "Becoming the Iceman",
    author: "Wim Hof & Justin Rosales",
    cover: require("../assets/images/book_iceman.png"),
    category: "Health",
    description:
      "Push past perceived limits. Wim Hof proves that control over mind and body is available to everyone.",
    readTime: 5,
    xpReward: 50,
    tags: ["health", "mindset", "cold exposure"],
    gradientFrom: "#0EA5E9",
    gradientTo: "#6366F1",
    ideas: [
      {
        id: "ice-1",
        title: "The Cold Is Your Teacher",
        content:
          "The cold doesn't care about your excuses. It is immediate, non-negotiable feedback. When you step into cold water, every mental pattern you have around discomfort surfaces instantly.\n\nThe cold trains the mind to stop negotiating with difficulty and start moving through it. Each cold shower is a micro-practice in choosing action over avoidance. The skill transfers everywhere.",
      },
      {
        id: "ice-2",
        title: "Fear and Trust",
        content:
          "Fear and trust are the two fundamental components of the human psyche. Fear contracts; trust expands. When you face the cold and breathe through it, you are literally practicing the shift from fear to trust.\n\nThis isn't abstract. It's physiological. Controlled breathing during cold exposure teaches your nervous system that you can handle more than it's been letting you believe.",
      },
      {
        id: "ice-3",
        title: "Centering, Not Thinking",
        content:
          "Thinking too much during physical challenges creates resistance. Centering — focusing attention inward on breath and sensation — creates flow. This is true in the cold, in sport, and in life.\n\nWim's practice: before a cold plunge, breathe deeply, center your awareness in your body, and commit fully. Half-measures create maximum suffering. Full commitment with a clear mind creates an experience you can manage.",
      },
      {
        id: "ice-4",
        title: "Anyone Can Do This",
        content:
          "The most important claim in Wim's work isn't that he's special. It's that he isn't. Justin Rosales was an ordinary college student with zero cold training who learned the methods and began breaking records.\n\nThe ability to withstand cold, control your immune response, and push past your perceived limits is not a genetic gift. It's a learnable skill. The only requirement is willingness to be uncomfortable.",
      },
      {
        id: "ice-5",
        title: "The Four Stages of Cold",
        content:
          "Wim identifies four stages when entering cold water: the initial shock, the urge to breathe rapidly, the point of control (where you can regulate breath), and the expansion (where the cold becomes tolerable).\n\nMost people quit in stage two. The entire practice is about learning to move through stage two without panic. Once you do, the cold becomes — not comfortable — but conquerable.",
      },
    ],
    quizzes: [
      {
        id: "ice-q1",
        question: "What is the main claim Wim makes about his cold abilities?",
        options: [
          "He has a unique genetic mutation",
          "Only professional athletes can replicate them",
          "Anyone can learn these abilities with proper technique",
          "They require years of training to develop",
        ],
        correctIndex: 2,
      },
      {
        id: "ice-q2",
        question: "What are the two fundamental components of the human psyche according to Wim?",
        options: [
          "Strength and weakness",
          "Fear and trust",
          "Cold and warmth",
          "Mind and body",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "cashvertising",
    title: "Cashvertising",
    author: "Drew Eric Whitman",
    cover: require("../assets/images/book_cash.png"),
    category: "Marketing",
    description:
      "100+ ad-agency psychology secrets to make big money selling anything to anyone.",
    readTime: 5,
    xpReward: 50,
    tags: ["marketing", "psychology", "business"],
    gradientFrom: "#10B981",
    gradientTo: "#3B82F6",
    ideas: [
      {
        id: "ca-1",
        title: "The Life Force 8",
        content:
          "Every human decision is driven by eight primal desires built into us by evolution: survival, food, drink, freedom from fear, sexual companionship, comfortable living conditions, social approval, and being superior.\n\nEffective advertising doesn't create desire — it channels desires that already exist at the deepest level. Connect your product to one of these eight and you've found an almost irresistible trigger.",
      },
      {
        id: "ca-2",
        title: "The Fear Factor",
        content:
          "Fear is one of the most powerful motivators in advertising. Not fear used manipulatively, but fear that makes a real problem vivid and then offers a credible solution.\n\nThe formula: identify a pain your audience already feels → make it viscerally real → offer your product as the relief. People act to avoid loss far more powerfully than to seek gain. Loss aversion is wired in.",
      },
      {
        id: "ca-3",
        title: "Ego Morphing",
        content:
          "Ego morphing means using images and language that allow your audience to see themselves in your ads. When people recognize someone like them succeeding with your product, they instantly identify with the outcome.\n\nThis is why testimonials from ordinary people often outperform celebrity endorsements. The question in every reader's mind is: 'Does this apply to someone like me?' Your job is to make the answer an obvious yes.",
      },
      {
        id: "ca-4",
        title: "Social Proof",
        content:
          "Humans are tribal animals. We look to others to determine the correct course of action, especially in uncertain situations. This is social proof — and it's one of the six most powerful weapons of influence.\n\nReviews, testimonials, user numbers, celebrity usage — these don't just add credibility. They trigger the most fundamental human heuristic: if others are doing it and they're happy, it must be right for me.",
      },
      {
        id: "ca-5",
        title: "Benefits, Not Features",
        content:
          "People don't buy features. They buy what features do for their lives. 'This blender has a 1200-watt motor' is a feature. 'You'll have a healthy breakfast ready in 30 seconds' is a benefit.\n\nAlways translate what your product is into what it does for the person. Every feature should have a corresponding 'so what?' answer that connects directly to something they care about deeply.",
      },
    ],
    quizzes: [
      {
        id: "ca-q1",
        question: "What are the Life Force 8?",
        options: [
          "8 rules for effective advertising",
          "8 primal desires that drive all human decisions",
          "8 types of customers",
          "8 ad formats that work best",
        ],
        correctIndex: 1,
      },
      {
        id: "ca-q2",
        question: "Why does loss aversion work in advertising?",
        options: [
          "People enjoy feeling scared",
          "People act more powerfully to avoid loss than to seek gain",
          "It creates brand awareness",
          "It makes ads more memorable",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "changing-world-order",
    title: "The Changing World Order",
    author: "Ray Dalio",
    cover: require("../assets/images/book_dalio.png"),
    category: "Finance",
    description:
      "Why nations succeed and fail — the big cycles of debt, power, and empire that shape history.",
    readTime: 7,
    xpReward: 70,
    tags: ["finance", "history", "geopolitics"],
    gradientFrom: "#1E3A5F",
    gradientTo: "#7C3AED",
    ideas: [
      {
        id: "cwo-1",
        title: "The Big Cycle",
        content:
          "Throughout history, empires rise and fall in predictable patterns spanning 50–100 years. These cycles are driven by the same forces: debt, internal wealth gaps, and external challengers to the dominant power.\n\nWe are living through one of these transitions right now — the US-China dynamic mirrors past Dutch-British and British-American transitions. History doesn't repeat exactly, but it rhymes in ways that are actionable.",
      },
      {
        id: "cwo-2",
        title: "Money, Credit, and Debt",
        content:
          "All currencies throughout history have eventually been debased. When debt becomes too large to repay, governments always choose inflation over default — because inflation spreads the pain invisibly.\n\nUnderstanding this cycle is crucial for wealth preservation. Gold, productive assets, and currencies of rising powers tend to hold value as reserve currencies are diluted. History is the clearest guide.",
      },
      {
        id: "cwo-3",
        title: "The Six Stages of Empire",
        content:
          "Empires move through predictable stages: new order formation → institutional building → peace and prosperity → excess and spending → conflict over resources → decline and new order.\n\nMost great empires fail not from external attack but from internal decay: widening wealth gaps, loss of competitiveness, and excessive debt. The warning signs are always visible in advance to those who look.",
      },
      {
        id: "cwo-4",
        title: "Study History as Your Guide",
        content:
          "Dalio's greatest investing mistake came from never having lived through a currency devaluation — so he didn't recognize one when it happened. He learned that if something has happened before in history, it can happen again, even if it hasn't happened in your lifetime.\n\nRead history not as entertainment but as data. The patterns of 1930–1945 are directly relevant today. Those who studied them navigated what followed far better than those who assumed the future would resemble the recent past.",
      },
      {
        id: "cwo-5",
        title: "Wealth Gaps and Internal Conflict",
        content:
          "When wealth becomes too concentrated, the gap between those who have and those who don't reaches a breaking point. This always produces political radicalization, class conflict, and eventually revolutionary change — either through reform or collapse.\n\nThis isn't political commentary — it's pattern recognition across centuries of data. The antidote is a functioning middle class and institutions that people across the political spectrum respect.",
      },
    ],
    quizzes: [
      {
        id: "cwo-q1",
        question: "How long do Dalio's 'big cycles' typically last?",
        options: ["10–20 years", "25–30 years", "50–100 years", "200–300 years"],
        correctIndex: 2,
      },
      {
        id: "cwo-q2",
        question: "When debt becomes too large, what do governments historically choose?",
        options: ["Austerity", "Default", "Inflation/debasement", "Tax increases only"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "compound-effect",
    title: "The Compound Effect",
    author: "Darren Hardy",
    cover: require("../assets/images/book_compound.png"),
    category: "Habits",
    description:
      "Small consistent choices compound into massive results. The boring secret behind every extraordinary life.",
    readTime: 5,
    xpReward: 50,
    tags: ["habits", "success", "consistency"],
    gradientFrom: "#F59E0B",
    gradientTo: "#EF4444",
    ideas: [
      {
        id: "ce-1",
        title: "Small Choices Compound",
        content:
          "The compound effect is the strategy of reaping huge rewards from small, seemingly insignificant actions. There is no dramatic moment. No magic. Just the accumulation of consistent small choices over time.\n\nThe problem is that the early results are invisible. A tiny daily improvement looks like nothing for months. Then it looks like everything. Most people quit before the inflection point arrives.",
      },
      {
        id: "ce-2",
        title: "You Are Your Habits",
        content:
          "In any area of your life where you are producing great results, you have good habits in place. Where you're struggling, you have bad habits — or an absence of the right ones. It's that simple.\n\nHabits operate invisibly. They don't feel like decisions after they're established. The goal isn't motivation — it's building systems that run automatically while your willpower is occupied elsewhere.",
      },
      {
        id: "ce-3",
        title: "Consistency Over Intensity",
        content:
          "Everyone can sprint. Few can maintain a pace for years. The compound effect rewards consistency brutally over intensity. Working out 30 minutes every day for 3 years beats 2-hour sessions for 3 months every time.\n\nStop looking for the dramatic intervention. The unglamorous, consistent, slightly-better-than-yesterday approach is the actual formula. No one wants to hear it, which is why so few live by it.",
      },
      {
        id: "ce-4",
        title: "Momentum Is Everything",
        content:
          "Objects in motion stay in motion. Once you build momentum in a positive direction, it becomes self-sustaining. Showing up creates the next showing up. Excellence breeds excellence.\n\nThe hardest part is always starting — especially starting again after a break. This is why streaks matter. Not because missing one day is catastrophic, but because momentum is precious and rebuilding it costs more than maintaining it.",
      },
      {
        id: "ce-5",
        title: "Track Everything",
        content:
          "What gets measured gets managed. When you track your habits, your spending, your health metrics, your reading — you create accountability and data. Data removes self-deception.\n\nMost people overestimate how healthy they eat and underestimate how much they spend. Tracking reveals reality. And reality — no matter how uncomfortable — is always the best starting point for change.",
      },
    ],
    quizzes: [
      {
        id: "ce-q1",
        question: "Why do most people fail to see the compound effect work?",
        options: [
          "They don't work hard enough initially",
          "They quit before the inflection point where results become visible",
          "The compound effect doesn't actually work for most people",
          "They track too many habits at once",
        ],
        correctIndex: 1,
      },
      {
        id: "ce-q2",
        question: "What does Hardy say about consistency vs intensity?",
        options: [
          "Intensity always wins",
          "Both are equally important",
          "Consistency over long periods beats intensity over short periods",
          "It depends on the goal",
        ],
        correctIndex: 2,
      },
    ],
  },
];
