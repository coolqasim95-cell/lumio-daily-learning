export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  wisdom: string;
  quiz: QuizQuestion;
}

export interface Lesson {
  id: string;
  title: string;
  topics: Topic[];
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
  lessons: Lesson[];
  isCustom?: boolean;
}

// Legacy types kept for backward compat with custom books
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
    description: "Master your mind and defy the odds. Goggins shows you're only living at 40% of your true potential.",
    readTime: 9,
    xpReward: 90,
    tags: ["mindset", "discipline", "mental toughness"],
    gradientFrom: "#374151",
    gradientTo: "#EF4444",
    lessons: [
      {
        id: "chm-l1",
        title: "Breaking Mental Barriers",
        topics: [
          {
            id: "chm-l1-t1",
            title: "The 40% Rule",
            content: "When your mind says you're done, you're actually only at 40% of your true capacity. Your brain is designed to protect you by throwing up a wall long before you reach your actual limit.\n\nThe next time you feel like quitting, remember: you still have 60% left. Push through the mental wall, and you'll discover a version of yourself you didn't know existed.\n\nThis rule shows up in every domain — exercise, work, relationships. The body can handle far more stress than the mind allows. Train your mind to recognize the wall for what it is: a suggestion, not a command.",
            wisdom: "When you feel like quitting, you've only used 40% of your capacity. The other 60% is unlocked only by pushing through the mental barrier.",
            quiz: {
              id: "chm-l1-t1-q",
              question: "According to Goggins, what percentage of your capacity is your mind's 'quit point'?",
              options: ["20%", "40%", "60%", "80%"],
              correctIndex: 1,
            },
          },
          {
            id: "chm-l1-t2",
            title: "The Accountability Mirror",
            content: "Every morning, Goggins would stand in front of his bathroom mirror and face every lie, every excuse, every failure — out loud. No hiding, no sugarcoating.\n\nThe mirror doesn't lie. When you hold yourself radically accountable — not to a coach or a boss, but to your own reflection — transformation becomes unavoidable.\n\nThis practice cuts through self-deception. Post your goals there. Write your failures there. Make your reflection a daily reckoning. Start there, and watch what changes.",
            wisdom: "Radical self-honesty in front of a mirror — naming every lie and excuse out loud — is the starting point of all lasting transformation.",
            quiz: {
              id: "chm-l1-t2-q",
              question: "What is the main purpose of Goggins' Accountability Mirror practice?",
              options: [
                "To build confidence by celebrating wins",
                "To face your lies, excuses, and failures with radical honesty",
                "To track your physical progress over time",
                "To visualize future success",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "chm-l1-t3",
            title: "Callous Your Mind",
            content: "Just like hands develop calluses from repeated friction, your mind can be hardened through repeated exposure to discomfort. You have to choose hard things — consistently.\n\nWake up early when you don't want to. Run when it's raining. Sit with discomfort deliberately. Each time you do, your mental armor gets thicker and your threshold for quitting rises.\n\nThe goal isn't to enjoy suffering. It's to stop fearing it. Once discomfort loses its power over you, you become genuinely free — because nothing can stop you.",
            wisdom: "Mental toughness is a skill built by repeatedly choosing discomfort — each hard choice adds another layer of armor to your mind.",
            quiz: {
              id: "chm-l1-t3-q",
              question: "How does Goggins say you build mental calluses?",
              options: [
                "By visualizing success daily",
                "By choosing comfort and allowing your body to recover",
                "By repeatedly exposing yourself to discomfort on purpose",
                "By surrounding yourself with tough people",
              ],
              correctIndex: 2,
            },
          },
        ],
      },
      {
        id: "chm-l2",
        title: "Tactical Mental Weapons",
        topics: [
          {
            id: "chm-l2-t1",
            title: "The Cookie Jar Method",
            content: "In your darkest moments, reach into your imaginary cookie jar. It holds every hard thing you've ever conquered — every race finished, every doubt you overcame, every time you chose discipline over comfort.\n\nThese victories are evidence. Pull one out, feel it, and remember: you've been here before. You survived. You can do it again.\n\nThe cookie jar isn't nostalgia — it's a tactical tool. When your body is broken and your mind is screaming quit, the jar reminds you of the person you've already proven yourself to be.",
            wisdom: "Keep a mental record of every hard thing you've overcome — in dark moments, pull one out to remind yourself of who you've already proven yourself to be.",
            quiz: {
              id: "chm-l2-t1-q",
              question: "What does the Cookie Jar Method involve?",
              options: [
                "Rewarding yourself with food after workouts",
                "Storing past victories mentally to draw strength from in hard moments",
                "Tracking daily calorie intake",
                "Writing a gratitude list each morning",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "chm-l2-t2",
            title: "Taking Souls",
            content: "Taking souls isn't about defeating others — it's about performing so relentlessly that those around you are forced to respect your work ethic, even if they never say so.\n\nWhen someone expects you to be average, use that as fuel. Exceed expectations so dramatically that their doubt becomes your motivation. Let your output do the talking.\n\nThis isn't revenge — it's excellence used as a weapon against mediocrity. It transforms envy and doubt from poison into rocket fuel.",
            wisdom: "When someone doubts you, exceed their expectations so dramatically that their doubt becomes your greatest source of motivation.",
            quiz: {
              id: "chm-l2-t2-q",
              question: "What does 'Taking Souls' actually mean in Goggins' philosophy?",
              options: [
                "Defeating rivals in competition",
                "Performing so relentlessly that others are forced to respect your work ethic",
                "Building a loyal following of people",
                "Proving haters wrong on social media",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "chm-l2-t3",
            title: "The Governor Theory",
            content: "Your brain acts as a governor — like the speed limiters on trucks — designed to stop you well before actual danger. It is programmed for survival, not peak performance.\n\nThe governor fires early warning signals: muscle burn, labored breathing, emotional exhaustion. These signals are real, but they're not maximums. They're safety margins built in by evolution.\n\nTo override the governor, you must practice doing more than you think you can — repeatedly — until the brain recalibrates its limits upward. This is the literal neuroscience of becoming harder to kill.",
            wisdom: "Your brain fires quit signals at 40% capacity as a survival mechanism — overriding it repeatedly forces it to recalibrate your true ceiling upward.",
            quiz: {
              id: "chm-l2-t3-q",
              question: "What does Goggins compare the brain's self-limiting mechanism to?",
              options: [
                "A fire alarm",
                "A speed governor on a truck",
                "A circuit breaker",
                "A smoke detector",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
      {
        id: "chm-l3",
        title: "Uncommon Living",
        topics: [
          {
            id: "chm-l3-t1",
            title: "Uncommon Amongst Uncommon",
            content: "Most people are willing to do what's hard when it's required — when the boss is watching, when the race is on, when the stakes are obvious. Very few choose hardness when no one is looking.\n\nThat gap — between performed toughness and chosen toughness — is where the truly uncommon are forged. Goggins calls this being uncommon amongst the uncommon.\n\nIt means applying the same obsessive standard to your smallest daily choices as to your biggest public moments. The standard doesn't drop when the crowd leaves.",
            wisdom: "True greatness isn't about being tough when required — it's about choosing the hard path when no one is watching and nothing is at stake.",
            quiz: {
              id: "chm-l3-t1-q",
              question: "What separates the 'uncommon amongst uncommon' according to Goggins?",
              options: [
                "Having the best genetics and natural talent",
                "Training with elite coaches and teams",
                "Choosing hardness when no one is watching",
                "Winning the most competitions",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "chm-l3-t2",
            title: "Suffer Well",
            content: "Suffering is inevitable — the only question is whether you suffer on your own terms or someone else's. Goggins chose to manufacture his own suffering before life could impose it on him.\n\nBy voluntarily entering discomfort — cold, pain, exhaustion — you inoculate yourself against involuntary suffering. You build a reference library of hard experiences that tells you: I can handle this.\n\nSuffering well doesn't mean enjoying pain. It means accepting that growth requires discomfort, and choosing to walk toward it rather than run from it.",
            wisdom: "Voluntarily choosing suffering on your own terms builds the resilience to handle any suffering life imposes — you stop fearing what you've already survived.",
            quiz: {
              id: "chm-l3-t2-q",
              question: "Why does Goggins voluntarily seek out suffering?",
              options: [
                "Because he enjoys physical pain",
                "To build a library of hard experiences that proves he can handle anything",
                "To show others how tough he is",
                "Because pain releases dopamine",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "chm-l3-t3",
            title: "The After Action Report",
            content: "After every hard event — race, failure, embarrassment — Goggins conducts an After Action Report (AAR): What went right? What went wrong? What must change?\n\nThis military practice converts pain into data. Without the AAR, suffering is just suffering. With it, suffering becomes tuition.\n\nThe key is brutal honesty. No excuses, no self-pity, no blame-shifting. Just an objective analysis of what happened and a concrete plan for what's next. The AAR is how failure becomes forward motion.",
            wisdom: "After every failure or hard event, conduct an honest review: what went right, what went wrong, what changes — this converts pain into actionable data.",
            quiz: {
              id: "chm-l3-t3-q",
              question: "What is the purpose of an After Action Report in Goggins' method?",
              options: [
                "To celebrate what went well after a race",
                "To share your story with others online",
                "To convert suffering into data by honestly analyzing what went wrong and what must change",
                "To track your physical metrics over time",
              ],
              correctIndex: 2,
            },
          },
        ],
      },
    ],
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    cover: require("../assets/images/book_atomic2.png"),
    category: "Habits",
    description: "Tiny changes, remarkable results. The proven system for building good habits and breaking bad ones.",
    readTime: 9,
    xpReward: 90,
    tags: ["habits", "productivity", "systems"],
    gradientFrom: "#F5A623",
    gradientTo: "#EF4444",
    lessons: [
      {
        id: "ah-l1",
        title: "The Science of Tiny Changes",
        topics: [
          {
            id: "ah-l1-t1",
            title: "The 1% Rule",
            content: "Getting 1% better every single day sounds like nothing. But compound it over a year and you're 37 times better. Compound it over a decade and you're not even recognizable as the same person.\n\nThe math of improvement is asymmetric — tiny daily inputs create outsized long-term outputs. The problem is that early progress is invisible, so most people quit before the results arrive.\n\nConversely, getting 1% worse every day leaves you nearly at zero after a year. The direction of your daily habits matters far more than the intensity of occasional efforts.",
            wisdom: "Improving 1% daily compounds to 37x better in a year — the direction of your daily habits matters far more than the size of any single effort.",
            quiz: {
              id: "ah-l1-t1-q",
              question: "Getting 1% better every day for a year makes you how much better?",
              options: ["3.65 times", "10 times", "37 times", "100 times"],
              correctIndex: 2,
            },
          },
          {
            id: "ah-l1-t2",
            title: "The Plateau of Latent Potential",
            content: "Habits often produce no visible results for a very long time — then suddenly deliver an explosion of change. James Clear calls this the Plateau of Latent Potential.\n\nImagine an ice cube sitting in a cold room. The temperature rises: 25°F, 28°F, 31°F — nothing happens. Then 32°F. The ice melts. The work was always compounding; the result was just invisible until a threshold was crossed.\n\nMost people abandon their habits during the plateau — right before the breakthrough. The work is never wasted. Results always lag the input. Trust the process through the valley of disappointment.",
            wisdom: "Results lag behind effort — just like ice doesn't melt until 32°F, habits produce invisible gains that suddenly compound into breakthrough results.",
            quiz: {
              id: "ah-l1-t2-q",
              question: "What does the Plateau of Latent Potential explain?",
              options: [
                "Why you should try multiple habits at once",
                "Why habits feel hard at first and get easier",
                "Why visible results lag behind consistent effort and then suddenly appear",
                "Why motivation is the key to habit success",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "ah-l1-t3",
            title: "Systems Beat Goals",
            content: "Goals are what you want to achieve. Systems are the processes that lead to those results. Clear's core insight: winners and losers have the same goals — what separates them is their systems.\n\nGoals create a temporary rush, then leave you stranded when you either achieve them (now what?) or fail (now nothing). Systems create ongoing satisfaction because you fall in love with the process.\n\nThe goal was never to run a marathon. The goal was to become a runner. Once the identity shifts, the behaviors follow automatically — and the marathons are just evidence.",
            wisdom: "Goals tell you what to want; systems determine whether you get there — fall in love with the process and the results become almost inevitable.",
            quiz: {
              id: "ah-l1-t3-q",
              question: "Why does Clear say systems beat goals?",
              options: [
                "Because goals are too easy to achieve",
                "Because winners and losers share the same goals — systems are what separate them",
                "Because goals create too much pressure",
                "Because systems are more motivating than goals",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
      {
        id: "ah-l2",
        title: "Build Habits That Last",
        topics: [
          {
            id: "ah-l2-t1",
            title: "Identity-Based Habits",
            content: "Most people try to change their habits by focusing on outcomes: lose 20 lbs, write a book, save money. This is backwards. The most durable change starts with identity.\n\nEvery action you take is a vote for the type of person you want to become. Cast enough votes and your identity shifts. Then the habits follow naturally — not through willpower, but through who you now believe you are.\n\nInstead of 'I want to quit smoking,' say 'I'm not a smoker.' Instead of 'I want to run,' say 'I'm a runner.' Identity leads, behavior follows.",
            wisdom: "Every action you take is a vote for who you want to become — cast enough votes and your identity shifts, making good habits feel automatic.",
            quiz: {
              id: "ah-l2-t1-q",
              question: "According to Clear, what is the most durable foundation for lasting habit change?",
              options: [
                "Setting outcome-based goals",
                "Building strong motivation and willpower",
                "Shifting your identity to match who you want to become",
                "Tracking your progress in a journal",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "ah-l2-t2",
            title: "The Habit Loop",
            content: "Every habit runs on a four-stage loop: Cue → Craving → Response → Reward. Understanding this loop is the foundation of all habit change.\n\nThe cue triggers a craving. The craving motivates a response. The response delivers a reward. The reward satisfies the craving and closes the loop.\n\nTo build a habit, strengthen each stage: make the cue obvious, make the craving attractive, make the response easy, make the reward satisfying. To break a habit, disrupt any stage — remove the cue, reframe the craving, make the response hard, or eliminate the reward.",
            wisdom: "Every habit runs on Cue → Craving → Response → Reward — build good habits by optimizing each stage, break bad ones by disrupting any stage.",
            quiz: {
              id: "ah-l2-t2-q",
              question: "What is the correct order of the habit loop?",
              options: [
                "Craving → Cue → Response → Reward",
                "Cue → Response → Craving → Reward",
                "Cue → Craving → Response → Reward",
                "Response → Cue → Reward → Craving",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "ah-l2-t3",
            title: "The Two-Minute Rule",
            content: "Any new habit should start by taking less than two minutes. Not run a marathon — put on your running shoes. Not meditate for 20 minutes — sit in your meditation spot.\n\nThis isn't about doing less. It's about mastering the art of showing up. Once you've made showing up automatic, scaling up is easy. The obstacle is always starting — remove that obstacle.\n\nThe two-minute version is a gateway habit. You almost never stop after two minutes. But even if you do, the ritual of showing up is more valuable than the duration of any single session.",
            wisdom: "Start every new habit in under two minutes — mastering the art of showing up is more powerful than any single long session.",
            quiz: {
              id: "ah-l2-t3-q",
              question: "What is the main purpose of the Two-Minute Rule?",
              options: [
                "To keep habits short forever",
                "To make showing up automatic by removing the starting barrier",
                "To build habits faster by doing them quickly",
                "To save time by combining habits",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
      {
        id: "ah-l3",
        title: "Advanced Habit Science",
        topics: [
          {
            id: "ah-l3-t1",
            title: "The Four Laws of Behavior Change",
            content: "The Four Laws are the master framework for all habit formation. To build a good habit: Make it Obvious (cue), Make it Attractive (craving), Make it Easy (response), Make it Satisfying (reward).\n\nTo break a bad habit, invert all four: Make it Invisible, Make it Unattractive, Make it Hard, Make it Unsatisfying.\n\nThese laws are not opinions — they're based on decades of behavioral science research. Design your environment around them and habits become almost automatic. Ignore them and you're fighting human nature.",
            wisdom: "The Four Laws — Obvious, Attractive, Easy, Satisfying — are the complete toolkit for building any habit; invert them to break any habit.",
            quiz: {
              id: "ah-l3-t1-q",
              question: "Which of these is NOT one of the Four Laws of Behavior Change?",
              options: ["Make it Obvious", "Make it Social", "Make it Easy", "Make it Satisfying"],
              correctIndex: 1,
            },
          },
          {
            id: "ah-l3-t2",
            title: "Habit Stacking",
            content: "Stack a new habit onto an existing one using this formula: 'After I [CURRENT HABIT], I will [NEW HABIT].'\n\nYour current habits are reliable triggers that fire every day without thinking. Attach new behaviors to them and they inherit that reliability. The trick is precision — the more specific the trigger, the more likely the new habit fires.\n\nExamples: 'After I pour my morning coffee, I will write one sentence.' 'After I sit down at my desk, I will open my task list.' The existing habit carries the new one forward.",
            wisdom: "Stack new habits onto existing ones using 'After I [X], I will [Y]' — existing habits act as reliable automatic triggers for new behaviors.",
            quiz: {
              id: "ah-l3-t2-q",
              question: "What is the correct formula for habit stacking?",
              options: [
                "'When I feel like [new habit], I will do [current habit]'",
                "'After I [current habit], I will [new habit]'",
                "'Before I [current habit], I will [new habit]'",
                "'While I do [new habit], I will [current habit]'",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "ah-l3-t3",
            title: "The Goldilocks Rule",
            content: "Humans experience peak motivation when working on tasks that are right at the edge of their current abilities — not too easy, not too hard. James Clear calls this the Goldilocks Rule.\n\nTasks too easy lead to boredom. Tasks too hard lead to anxiety. The sweet spot — about 4% beyond your current skill — creates flow and intrinsic motivation.\n\nThis is why good coaches keep raising the bar incrementally. This is why video games are so addictive. Design your habits to sit in the Goldilocks zone and motivation becomes self-sustaining.",
            wisdom: "Peak motivation comes from challenges at the edge of your ability — design habits to always be slightly above your current skill level.",
            quiz: {
              id: "ah-l3-t3-q",
              question: "According to the Goldilocks Rule, when do humans experience peak motivation?",
              options: [
                "When tasks are very easy and feel relaxing",
                "When tasks are extremely challenging and require maximum effort",
                "When tasks are right at the edge of current abilities — not too easy, not too hard",
                "When tasks are completely new and unfamiliar",
              ],
              correctIndex: 2,
            },
          },
        ],
      },
    ],
  },
  {
    id: "12-rules",
    title: "12 Rules for Life",
    author: "Jordan Peterson",
    cover: require("../assets/images/book_12rules.png"),
    category: "Mindset",
    description: "An antidote to chaos. Ancient wisdom meets modern psychology in this guide to meaning and responsibility.",
    readTime: 9,
    xpReward: 90,
    tags: ["philosophy", "psychology", "meaning"],
    gradientFrom: "#1E3A5F",
    gradientTo: "#7C5CFC",
    lessons: [
      {
        id: "12r-l1",
        title: "Order, Self & Discipline",
        topics: [
          {
            id: "12r-l1-t1",
            title: "Stand Up Straight",
            content: "Posture isn't just physical — it's a social signal that influences how others treat you and how you feel about yourself. Lobsters with high serotonin hold themselves upright; defeated lobsters slump.\n\nHumans share the same ancient neurochemistry. When you stand tall, your brain releases more serotonin, you feel more confident, and others respond to you differently. Dominance hierarchies are ancient — they predate language, civilization, and even vertebrates.\n\nTaking up space, making eye contact, and speaking clearly isn't arrogance — it's claiming your legitimate place in the social world. It's the first act of self-respect.",
            wisdom: "Your posture signals your position to both your own brain and the world — standing tall releases serotonin and shifts how both you and others treat you.",
            quiz: {
              id: "12r-l1-t1-q",
              question: "Why does Peterson use lobsters to explain dominance hierarchies?",
              options: [
                "Because lobsters are the most intelligent sea creatures",
                "Because humans and lobsters share ancient neurochemistry that governs social hierarchies",
                "Because lobster dominance hierarchies are identical to human ones",
                "Because lobsters were the first animals to develop language",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "12r-l1-t2",
            title: "Clean Your Room",
            content: "Before you try to change the world, fix what you can fix. Start with your room. Make your bed. Organize your space. These small acts of order push back against the chaos that surrounds us.\n\nWhen you bring order to your immediate environment, something shifts internally. You become a person who creates order rather than submits to chaos. That identity — built through small, concrete actions — makes larger transformations possible.\n\nPeterson's deeper point: you cannot reasonably criticize society while your own life is a mess. Hypocrisy is the enemy of credibility. Fix the things within your immediate control first.",
            wisdom: "Cleaning your room is not trivial — it's the practice of imposing order on chaos, starting with what you can control before reaching further.",
            quiz: {
              id: "12r-l1-t2-q",
              question: "What is Peterson's deeper point about cleaning your room?",
              options: [
                "That physical cleanliness prevents disease",
                "That you should hire a cleaner to reduce stress",
                "That you cannot credibly criticize the world while your own life is disordered",
                "That tidiness is a sign of high intelligence",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "12r-l1-t3",
            title: "Compare Yourself to Who You Were",
            content: "The most toxic habit is comparing yourself to others — it always finds someone richer, smarter, more attractive, more successful. It's a race with no finish line and no winner.\n\nPeterson's remedy: compare yourself only to who you were yesterday. The only meaningful competition is with your past self. Did you do slightly better today? Learn something you didn't know yesterday? Fix a small thing you avoided before?\n\nThis metric is always available, always honest, and always under your control. Progress measured against your own past is the only kind that doesn't corrupt.",
            wisdom: "Stop comparing yourself to others — the only meaningful competition is with who you were yesterday, a metric entirely within your control.",
            quiz: {
              id: "12r-l1-t3-q",
              question: "Who does Peterson say you should compare yourself to?",
              options: [
                "The top performers in your field",
                "Your peers at the same life stage",
                "Who you were yesterday",
                "The person you want to become",
              ],
              correctIndex: 2,
            },
          },
        ],
      },
      {
        id: "12r-l2",
        title: "Responsibility & Meaning",
        topics: [
          {
            id: "12r-l2-t1",
            title: "Pursue Meaning Over Happiness",
            content: "Happiness is a feeling — it comes and goes, dependent on circumstance. Meaning is something deeper. It's found in voluntarily shouldering responsibility, in choosing the harder path, in doing what is necessary even when it's painful.\n\nPeterson argues that the person who pursues happiness above all else is guaranteed to suffer when life inevitably delivers hardship. But the person who pursues meaning finds that suffering itself can become purposeful.\n\nThe meaningful life isn't about feeling good. It's about carrying a heavy load willingly — raising children, building something, caring for others — and discovering that the weight is what gives life its substance.",
            wisdom: "Happiness is temporary and circumstance-dependent; meaning is built by voluntarily shouldering responsibility and choosing the harder path on purpose.",
            quiz: {
              id: "12r-l2-t1-q",
              question: "Why does Peterson say to pursue meaning over happiness?",
              options: [
                "Because happiness is immoral",
                "Because happiness is circumstantial and temporary, while meaning is built through purposeful responsibility",
                "Because meaningful people earn more money",
                "Because happiness is only found in social approval",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "12r-l2-t2",
            title: "Tell the Truth",
            content: "Lies corrupt reality — not just for others, but for yourself. Each small lie you tell requires three more to maintain. Over time, a web of lies creates a false self that is increasingly disconnected from what is real.\n\nPeterson's rule is radical: say only what you truly believe. Don't say what you think people want to hear. Don't manipulate. Don't perform. Speak your actual thoughts, even when they're unpopular.\n\nThe strange reward of truth-telling is that it builds a coherent self. You know who you are because your words match your beliefs. That coherence is the foundation of genuine confidence.",
            wisdom: "Each lie requires more lies to maintain and corrupts your sense of self — only by speaking your genuine truth do you build the coherent identity confidence requires.",
            quiz: {
              id: "12r-l2-t2-q",
              question: "What is Peterson's core advice about truth-telling?",
              options: [
                "Say only what is socially appropriate and kind",
                "Avoid difficult truths to protect others' feelings",
                "Say only what you genuinely believe, even when unpopular",
                "Tell the truth only when directly asked",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "12r-l2-t3",
            title: "Be Precise in Your Speech",
            content: "Vague complaints are a form of dishonesty. When you say 'everything is wrong' or 'life is terrible,' you're expressing an emotional state while avoiding the actual problem that needs solving.\n\nPeterson insists on precision: name the exact problem. Say exactly what is bothering you. Define the specific thing you want to change. The act of defining a problem clearly is the first step toward solving it.\n\nImprecise speech creates imprecise thinking, which creates imprecise action, which creates chronic dissatisfaction. When you name a dragon, it becomes finite — and finite things can be fought.",
            wisdom: "Vague complaints keep problems unsolvable — precisely naming what is wrong is the first act of confronting it, because finite things can be fought.",
            quiz: {
              id: "12r-l2-t3-q",
              question: "Why does Peterson emphasize precision in speech?",
              options: [
                "Because precise language impresses others",
                "Because vague complaints keep problems undefined and therefore unsolvable",
                "Because it demonstrates high intelligence",
                "Because precise speech reduces conflict",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
      {
        id: "12r-l3",
        title: "Relationships & Connection",
        topics: [
          {
            id: "12r-l3-t1",
            title: "Make Friends With Those Who Want the Best For You",
            content: "Not everyone who appears supportive actually wants you to improve. Some people subtly encourage your worst habits because your improvement would reveal their own stagnation.\n\nPeterson argues that you have an ethical obligation to yourself to choose friends who genuinely celebrate your growth — people who call you out when you're wrong, who push you toward better choices, who refuse to be complicit in your self-destruction.\n\nChoosing better friends isn't elitist — it's one of the highest forms of self-care. The people around you shape your behavior, your aspirations, and your sense of what's possible.",
            wisdom: "Choose friends who genuinely want you to improve — people who celebrate your growth and refuse to enable your worst habits are rare and essential.",
            quiz: {
              id: "12r-l3-t1-q",
              question: "Why might some people subtly discourage your improvement, according to Peterson?",
              options: [
                "Because they are inherently malicious",
                "Because your improvement would reveal their own stagnation",
                "Because they don't understand your goals",
                "Because they want you to be happy as you are",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "12r-l3-t2",
            title: "Assume the Other Person Knows Something You Don't",
            content: "In conversation, most people are just waiting for their turn to talk. Real listening — the kind that actually changes you — requires assuming the other person knows something you don't.\n\nPeterson calls this charitable listening: approaching conversations with genuine curiosity rather than debate mode. You might actually be wrong. The person across from you has lived a life full of experiences and insights that your own life didn't provide.\n\nThis posture transforms conversations from competitions into collaborations. It's also the foundation of good therapy, good leadership, and good science — all of which require comfort with not knowing.",
            wisdom: "Approach every conversation assuming the other person knows something you don't — genuine curiosity turns discussions from debates into discoveries.",
            quiz: {
              id: "12r-l3-t2-q",
              question: "What is Peterson's advice for improving conversations?",
              options: [
                "Prepare your arguments in advance",
                "Assume the other person knows something you don't and listen with genuine curiosity",
                "Speak more than you listen to demonstrate confidence",
                "Avoid controversial topics to maintain harmony",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "12r-l3-t3",
            title: "Pet a Cat When You Meet One on the Street",
            content: "Life is filled with tragedy, limitation, and suffering — things no amount of productivity or philosophy fully solves. Peterson's last rule is about finding small moments of beauty in the middle of hardship.\n\nWhen you encounter something genuinely good — a cat in the street, a sunset, a child laughing — pay attention. Don't rush past it because you're busy or suffering. These small moments of grace are not trivial. They are evidence that goodness exists alongside pain.\n\nThis rule is about gratitude, attention, and the courage to experience joy even when life is hard. It's the antidote to nihilism: not grand solutions, but small, real, present goods.",
            wisdom: "In the middle of unavoidable suffering, paying attention to small moments of genuine beauty is not trivial — it's an act of resistance against despair.",
            quiz: {
              id: "12r-l3-t3-q",
              question: "What deeper message does Peterson convey with 'pet a cat when you meet one'?",
              options: [
                "That animals are better companions than humans",
                "That you should take breaks from work regularly",
                "That noticing and appreciating small moments of beauty is an act of courage against despair",
                "That mindfulness meditation requires focusing on small things",
              ],
              correctIndex: 2,
            },
          },
        ],
      },
    ],
  },
  {
    id: "48-laws",
    title: "48 Laws of Power",
    author: "Robert Greene",
    cover: require("../assets/images/book_48laws.png"),
    category: "Psychology",
    description: "A ruthless guide to power, strategy, and human nature drawn from 3,000 years of history.",
    readTime: 9,
    xpReward: 90,
    tags: ["power", "strategy", "psychology"],
    gradientFrom: "#1A1A2E",
    gradientTo: "#C62828",
    lessons: [
      {
        id: "48l-l1",
        title: "Control & Positioning",
        topics: [
          {
            id: "48l-l1-t1",
            title: "Never Outshine the Master",
            content: "Those in power are extremely sensitive to feeling overshadowed. When you make your superiors feel insecure by displaying too much talent or knowledge, you invite resentment — sometimes career-ending resentment.\n\nGreene's advice: make those above you feel brilliantly superior. If you need to display talent, frame it as a reflection of their mentorship. Let them take credit. Let them feel needed.\n\nThis isn't submission — it's strategy. Those who understand this law move upward smoothly. Those who ignore it often find themselves mysteriously sidelined despite obvious ability.",
            wisdom: "Making superiors feel superior is not weakness — it's the strategic choice that keeps you advancing when displaying dominance would only invite retaliation.",
            quiz: {
              id: "48l-l1-t1-q",
              question: "Why does Greene warn against outshining the master?",
              options: [
                "Because humility is always morally superior",
                "Because superiors resent being overshadowed and can sabotage your advancement",
                "Because hiding talent saves it for when it's truly needed",
                "Because outshining others creates envy in peers",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "48l-l1-t2",
            title: "Always Say Less Than Necessary",
            content: "Power is often lost through words. The more you say, the more you reveal — your insecurities, your plans, your weaknesses. Silence is power because it forces others to fill the void with their own projections.\n\nGreene observes that powerful people tend to be economical with speech. When you say less, you appear more controlled, more mysterious, more deliberate. Others try to interpret you and in doing so, attribute qualities to you that you may or may not possess.\n\nPractice the discipline of saying only what is essential. Let your words carry weight by making them scarce. Never explain yourself more than necessary.",
            wisdom: "Each unnecessary word reveals something about you — saying less creates mystery, authority, and forces others to fill the silence with their own projections.",
            quiz: {
              id: "48l-l1-t2-q",
              question: "Why does Greene advise saying less than necessary?",
              options: [
                "Because talking too much wastes time",
                "Because silence creates mystery and authority while words reveal weaknesses",
                "Because quiet people are more respected in all cultures",
                "Because oversharing leads to misunderstandings",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "48l-l1-t3",
            title: "Make Others Come to You",
            content: "When you go to others — chasing them, responding immediately, being always available — you surrender your power. The person who makes others come to them holds the positional advantage.\n\nThis applies to negotiation, relationships, and business. When you chase someone, you signal need. When they come to you, they signal desire. These are opposite power positions.\n\nGreene advises creating situations where others feel compelled to seek you out. This requires patience, the appearance of being in demand, and willingness to let silence do its work.",
            wisdom: "The one who initiates the chase surrenders positional power — engineering situations where others come to you signals value and shifts the power dynamic.",
            quiz: {
              id: "48l-l1-t3-q",
              question: "What power principle does Greene illustrate with 'make others come to you'?",
              options: [
                "That being unavailable makes you more efficient",
                "That chasing others signals need while being sought signals value",
                "That introverts naturally have more social power",
                "That meetings are more productive in your own space",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
      {
        id: "48l-l2",
        title: "Strategy & Reputation",
        topics: [
          {
            id: "48l-l2-t1",
            title: "Guard Your Reputation",
            content: "Reputation is the cornerstone of power. It precedes you into every room and shapes every interaction before you've said a word. Once damaged, reputation is almost impossible to repair.\n\nGreene argues that you must actively tend to your reputation — not just avoid scandal, but deliberately build a specific image that works in your favor. Choose the quality you want to be known for and embody it consistently.\n\nWhen someone attacks your reputation, respond immediately and decisively. Let the attack linger and it calcifies into public perception. The speed and force of your response sends its own signal.",
            wisdom: "Reputation precedes you everywhere and shapes every outcome — actively build it as a deliberate strategy, not a byproduct, and defend it immediately when threatened.",
            quiz: {
              id: "48l-l2-t1-q",
              question: "How does Greene say you should respond when your reputation is attacked?",
              options: [
                "Ignore it — responding gives it more attention",
                "Respond privately to avoid escalation",
                "Respond immediately and decisively to prevent the attack from hardening into perception",
                "Wait for others to defend you",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "48l-l2-t2",
            title: "Use Absence to Increase Respect",
            content: "Presence is taken for granted; absence creates longing. When you are always available, always seen, always accessible, you become ordinary. Scarcity creates value in human psychology just as in economics.\n\nGreene notes that the most powerful figures in history understood how to manage their visibility. Disappear at the right moment and people begin to imagine your greatness. Return and your presence is electric.\n\nThis applies to relationships, professional life, and social dynamics. Deliberately create periods of absence and observe how it shifts your perceived value.",
            wisdom: "Constant presence breeds contempt; strategic absence creates longing — scarcity is as powerful in human relationships as it is in economics.",
            quiz: {
              id: "48l-l2-t2-q",
              question: "Why does Greene say absence increases respect?",
              options: [
                "Because people respect those who are busy",
                "Because scarcity increases perceived value — what is rarely seen is imagined as greater",
                "Because absence gives others time to reflect on your qualities",
                "Because unavailable people are more mysterious and therefore attractive",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "48l-l2-t3",
            title: "Win Through Actions, Not Argument",
            content: "Arguing rarely changes minds. It triggers ego, creates defensiveness, and makes the loser bitter and resentful — even when you're factually correct. Winning an argument often means losing the relationship or the political battle.\n\nGreene's alternative: demonstrate your point through action. Let results speak. Let others see with their own eyes rather than be told with your words.\n\nThis is slower but more durable. People believe what they experience. They resist what they're told. The demonstration is always more powerful than the declaration.",
            wisdom: "Arguments trigger ego and breed resentment even when you're right — demonstrating your point through action produces durable belief without creating enemies.",
            quiz: {
              id: "48l-l2-t3-q",
              question: "Why does Greene prefer action over argument?",
              options: [
                "Because actions are always faster than words",
                "Because arguing is considered rude in most cultures",
                "Because people believe what they experience, and arguments trigger ego even when you're right",
                "Because actions are more creative than words",
              ],
              correctIndex: 2,
            },
          },
        ],
      },
      {
        id: "48l-l3",
        title: "Long-Game Mastery",
        topics: [
          {
            id: "48l-l3-t1",
            title: "Enter Actions with Boldness",
            content: "Timid, half-hearted actions are more dangerous than bold ones. They invite resistance, reveal uncertainty, and embolden opponents. When you must act, act with complete commitment.\n\nGreene's historical examples show that bold entry creates its own momentum. People fear decisiveness. They're disarmed by those who act without hesitation.\n\nBoldness is also a mindset. The person who acts boldly often creates outcomes that justify the boldness — a self-fulfilling confidence that timidity can never manufacture.",
            wisdom: "Timid actions invite resistance and reveal weakness — bold entry creates momentum and disarms opponents who fear decisive commitment.",
            quiz: {
              id: "48l-l3-t1-q",
              question: "Why does Greene say timid actions are more dangerous than bold ones?",
              options: [
                "Because timid people are less respected",
                "Because timid actions invite resistance and reveal uncertainty to opponents",
                "Because boldness is always rewarded with success",
                "Because hesitation causes missed opportunities",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "48l-l3-t2",
            title: "Plan All the Way to the End",
            content: "Most people plan for the beginning of their actions but give little thought to the ending. They get swept up in immediate results and fail to see the chain of consequences that follows.\n\nGreene insists on thinking through the complete arc: if this works, then what? If I win this battle, what does my position look like? Who benefits, who loses, and how will they respond?\n\nThis is the difference between tactical and strategic thinking. Tacticians win individual battles; strategists shape the entire war. Think further ahead than anyone else in the room.",
            wisdom: "Planning only the beginning is planning to fail — thinking through the complete chain of consequences separates tacticians from strategists.",
            quiz: {
              id: "48l-l3-t2-q",
              question: "What does Greene mean by 'plan all the way to the end'?",
              options: [
                "Set a clear deadline for completing your goals",
                "Think through the full chain of consequences of your actions — not just immediate results",
                "Have a backup plan for when things go wrong",
                "Plan in detail rather than improvising",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "48l-l3-t3",
            title: "Keep Your Hands Clean",
            content: "Powerful people avoid getting their hands dirty in ways that would damage their reputation or create direct enemies. Instead, they use intermediaries — 'cat's-paws' — to carry out difficult tasks.\n\nThis isn't about avoiding responsibility — it's about protecting your image while still getting things done. When necessary dirty work is delegated, you maintain the moral high ground while the outcome still benefits you.\n\nGreene's deeper point: those with lasting power are architects, not laborers. They design systems, mobilize others, and stay above the fray.",
            wisdom: "Lasting power belongs to architects who design and delegate, not laborers who expose themselves to every conflict — keep your image clean while still getting results.",
            quiz: {
              id: "48l-l3-t3-q",
              question: "What is the main strategic advantage of keeping your hands clean?",
              options: [
                "It allows you to avoid all forms of conflict",
                "It maintains your reputation and image while outcomes still benefit you through others",
                "It shows you have strong ethical principles",
                "It builds loyalty among those who do your work",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
    ],
  },
  {
    id: "8-mental-models",
    title: "8 Mental Models",
    author: "Nelson Wang",
    cover: require("../assets/images/book_mental.png"),
    category: "Productivity",
    description: "Think smarter, decide faster, live better. The mental frameworks used by the world's best thinkers.",
    readTime: 9,
    xpReward: 90,
    tags: ["thinking", "models", "decision-making"],
    gradientFrom: "#0F4C75",
    gradientTo: "#1B98E0",
    lessons: [
      {
        id: "mm-l1",
        title: "First Principles Thinking",
        topics: [
          {
            id: "mm-l1-t1",
            title: "Break It Down to Basics",
            content: "First principles thinking means stripping a problem down to its most fundamental truths — the things you know to be absolutely true — and building up from there.\n\nElon Musk used this to reimagine rockets. Instead of asking 'how do we build a cheaper rocket?' he asked 'what is a rocket made of?' The raw materials were 2% of the market price. He built SpaceX from that truth.\n\nMost people think by analogy — they see what others have done and slightly modify it. First principles thinkers start from scratch and often reach radically different and better conclusions.",
            wisdom: "First principles thinking strips away assumptions and starts from fundamental truths — it's how innovators find solutions that analogical thinkers never reach.",
            quiz: {
              id: "mm-l1-t1-q",
              question: "What is the key difference between first principles thinking and reasoning by analogy?",
              options: [
                "First principles is faster; analogy is more accurate",
                "First principles starts from fundamental truths; analogy modifies existing solutions",
                "First principles is used in science; analogy is used in business",
                "First principles requires more data; analogy uses intuition",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "mm-l1-t2",
            title: "Inversion",
            content: "Instead of asking 'how do I succeed?' ask 'what guarantees failure?' — then avoid those things. Inversion is the practice of thinking backward to find what NOT to do.\n\nCharlie Munger famously said: 'All I want to know is where I'm going to die, so I'll never go there.' By mapping the territory of failure clearly, you can navigate around it.\n\nInversion is powerful because humans are wired to pursue goals directly. Thinking in reverse surfaces pitfalls that forward-thinking misses. Many of the best decisions in history were made by someone who simply refused to do what was obviously stupid.",
            wisdom: "Thinking backward — asking what guarantees failure and avoiding it — often surfaces more actionable insights than asking how to succeed directly.",
            quiz: {
              id: "mm-l1-t2-q",
              question: "What is the core technique of inversion thinking?",
              options: [
                "Thinking about the opposite of your goal to find what you truly want",
                "Asking what guarantees failure and avoiding those things",
                "Reversing the order of steps in a process",
                "Looking at problems from an opponent's perspective",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "mm-l1-t3",
            title: "Second-Order Thinking",
            content: "First-order thinking: this action causes this result. Second-order thinking: this action causes this result, which causes this result, which causes this outcome three steps down the line.\n\nMost people stop at first-order consequences. Great thinkers — and great investors — ask 'and then what?' repeatedly. They think about the knock-on effects that most people don't see.\n\nExample: introducing new pain medication (first order: less pain). Second order: people become dependent. Third order: opioid epidemic. The tragedy was predictable to anyone who thought past step one.",
            wisdom: "Ask 'and then what?' repeatedly — second and third-order consequences are where most decision-making failures hide.",
            quiz: {
              id: "mm-l1-t3-q",
              question: "What distinguishes second-order thinking from first-order thinking?",
              options: [
                "Second-order thinking is slower and less practical",
                "Second-order thinking considers the downstream consequences of consequences, not just immediate effects",
                "Second-order thinking uses more data points",
                "Second-order thinking is used only in finance and investing",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
      {
        id: "mm-l2",
        title: "Systems & Probability",
        topics: [
          {
            id: "mm-l2-t1",
            title: "Circle of Competence",
            content: "Warren Buffett's core operating principle: know exactly what you know and — crucially — know what you don't know. The circle of competence is your area of genuine expertise.\n\nThe dangerous zone is the edge of the circle where you think you know but don't. Catastrophic decisions almost always happen when people act outside their circle of competence while believing they're inside it.\n\nThe remedy isn't to never explore new areas — it's to know when you're a beginner and act accordingly. Humility at the edges of knowledge prevents the overconfidence that destroys otherwise smart people.",
            wisdom: "Know your circle of competence precisely — the most dangerous position is acting outside it while believing you're inside it.",
            quiz: {
              id: "mm-l2-t1-q",
              question: "What is the 'circle of competence' mental model about?",
              options: [
                "Staying within your comfort zone to avoid risk",
                "Knowing exactly what you know and being aware of where your genuine expertise ends",
                "Building expertise in as many areas as possible",
                "Competing only in areas where you have natural talent",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "mm-l2-t2",
            title: "Probabilistic Thinking",
            content: "Most people think in certainties: this will happen, that won't. Sophisticated thinkers think in probabilities: this has a 70% chance, that has a 30% chance.\n\nProbabilistic thinking prevents two kinds of errors: overconfidence (acting as if uncertain things are certain) and paralysis (refusing to act because nothing is guaranteed).\n\nThe goal isn't to predict the future — it's to make better bets. A good decision with a bad outcome is still a good decision. A bad decision with a good outcome is still a bad decision. Evaluate your process, not just your results.",
            wisdom: "Think in probabilities, not certainties — a good decision with a bad outcome is still a good decision; evaluate your process, not just results.",
            quiz: {
              id: "mm-l2-t2-q",
              question: "What does probabilistic thinking help you avoid?",
              options: [
                "Making decisions with incomplete information",
                "Both overconfidence (treating uncertain things as certain) and paralysis",
                "Taking too many risks in uncertain situations",
                "Overthinking simple decisions",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "mm-l2-t3",
            title: "Map vs Territory",
            content: "The map is not the territory. Your mental model of reality is a simplification — it leaves things out, emphasizes some aspects, and misses others. Confusing the map for the actual territory leads to poor decisions.\n\nThis is why experts sometimes fail spectacularly: they mistake their model of a situation for the situation itself. When reality doesn't match the model, the model needs updating — not reality.\n\nGreat thinkers hold their mental models loosely. They know their models are useful simplifications, not perfect representations. They update constantly as new information arrives.",
            wisdom: "Your mental model is always a simplified map — never mistake it for the actual territory, and update it aggressively when reality contradicts it.",
            quiz: {
              id: "mm-l2-t3-q",
              question: "What does 'the map is not the territory' mean in mental models?",
              options: [
                "That geographic maps are often inaccurate",
                "That your mental model of reality is a simplification, not reality itself",
                "That planning and execution are always different",
                "That words cannot accurately describe physical objects",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
      {
        id: "mm-l3",
        title: "Decision-Making Frameworks",
        topics: [
          {
            id: "mm-l3-t1",
            title: "Occam's Razor",
            content: "When two explanations equally account for the facts, prefer the simpler one. Occam's Razor is the principle of parsimony — don't multiply complexity beyond necessity.\n\nThis isn't just philosophical elegance. Simpler explanations are more often correct because they involve fewer assumptions, each of which could be wrong. Complex theories are more fragile.\n\nOccam's Razor also cuts through conspiracy thinking. When something goes wrong, the most likely explanation is human error, misalignment of incentives, or bad luck — not a perfectly coordinated secret plot.",
            wisdom: "When explanations compete, prefer the simpler one — simpler models involve fewer assumptions and are more likely to survive contact with new evidence.",
            quiz: {
              id: "mm-l3-t1-q",
              question: "What does Occam's Razor advise when multiple explanations fit the facts?",
              options: [
                "Choose the most creative explanation",
                "Choose the explanation with the most evidence",
                "Choose the simpler explanation that involves fewer assumptions",
                "Choose the most pessimistic explanation to prepare for worst cases",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "mm-l3-t2",
            title: "Hanlon's Razor",
            content: "Never attribute to malice what can be adequately explained by stupidity — or more charitably, by ignorance, carelessness, or incompetence.\n\nMost bad things that happen to you are not the result of someone deliberately targeting you. They're the result of people acting in their own interest carelessly, or simply not thinking about consequences.\n\nHanlon's Razor is both practically useful (it prevents unnecessary enemy-making) and psychologically freeing (most of life's frustrations aren't personal attacks). It lets you respond to situations rather than react to imagined conspiracies.",
            wisdom: "Most negative outcomes result from carelessness or incompetence, not malice — assuming bad intent when none exists creates unnecessary conflict and enemies.",
            quiz: {
              id: "mm-l3-t2-q",
              question: "What does Hanlon's Razor primarily help you avoid?",
              options: [
                "Making overly simple decisions",
                "Attributing malice to actions that are simply careless or incompetent",
                "Taking too many risks based on assumptions",
                "Overthinking other people's motivations",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "mm-l3-t3",
            title: "The 10-10-10 Rule",
            content: "Before making a difficult decision, ask three questions: How will I feel about this in 10 minutes? How will I feel about it in 10 months? How will I feel about it in 10 years?\n\nThis simple framework zooms out from immediate emotion and forces you to consider your future self's perspective. Many decisions that feel urgent in the moment look trivial from 10 months out — and many decisions that feel small now are hugely significant from 10 years out.\n\nThe 10-10-10 rule is a vaccine against short-termism and emotional reactivity. It doesn't tell you what to decide — it helps you see the decision clearly across multiple time horizons.",
            wisdom: "Before any big decision, ask how you'll feel in 10 minutes, 10 months, and 10 years — time-shifting your perspective reveals what truly matters.",
            quiz: {
              id: "mm-l3-t3-q",
              question: "What is the main benefit of the 10-10-10 decision framework?",
              options: [
                "It makes decision-making faster by giving a clear formula",
                "It forces you to consider your future self's perspective and avoids short-term emotional reactivity",
                "It helps you gather input from 10 different people",
                "It ensures you spend at least 10 minutes on every decision",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
    ],
  },
  {
    id: "attached",
    title: "Attached",
    author: "Amir Levine & Rachel Heller",
    cover: require("../assets/images/book_attached.png"),
    category: "Psychology",
    description: "The science of adult attachment and how it shapes every relationship you'll ever have.",
    readTime: 9,
    xpReward: 90,
    tags: ["relationships", "psychology", "attachment"],
    gradientFrom: "#BE185D",
    gradientTo: "#7C3AED",
    lessons: [
      {
        id: "att-l1",
        title: "The Three Attachment Styles",
        topics: [
          {
            id: "att-l1-t1",
            title: "Secure Attachment",
            content: "About 50% of people have a secure attachment style. They are comfortable with intimacy, don't fear abandonment, and can communicate needs directly without manipulation.\n\nSecure people are relationship assets — they give their partners space without feeling threatened, respond to conflict without escalating, and communicate vulnerably without performing.\n\nThe good news: exposure to secure relationships — romantic or platonic — can gradually shift your attachment style toward security. You are not locked into the style you developed in childhood.",
            wisdom: "Secure attachment allows intimacy without losing self — and it can be developed at any age through consistent, safe relationship experiences.",
            quiz: {
              id: "att-l1-t1-q",
              question: "What percentage of people roughly have a secure attachment style?",
              options: ["25%", "50%", "75%", "90%"],
              correctIndex: 1,
            },
          },
          {
            id: "att-l1-t2",
            title: "Anxious Attachment",
            content: "Anxiously attached people crave closeness but chronically fear losing it. They read into small signals, imagine worst-case scenarios, and tend to engage in 'protest behaviors' — actions designed to re-establish closeness when they feel threatened.\n\nThis style usually develops from inconsistent caregiving in childhood. The child learned that love was unpredictable — sometimes abundant, sometimes withdrawn — and became hypervigilant to its presence or absence.\n\nIn adult relationships, this manifests as frequent texting, difficulty being alone, sensitivity to perceived rejection, and a tendency to find anxious-avoidant partners who recreate the familiar inconsistency.",
            wisdom: "Anxious attachment creates a constant background alert for relationship threats — understanding this pattern is the first step to responding rather than reacting.",
            quiz: {
              id: "att-l1-t2-q",
              question: "What experience typically develops an anxious attachment style in childhood?",
              options: [
                "Overprotective parenting that never allowed independence",
                "Inconsistent caregiving — love that was sometimes abundant and sometimes withdrawn",
                "Parents who worked long hours and were rarely home",
                "Too much structure and not enough spontaneity",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "att-l1-t3",
            title: "Avoidant Attachment",
            content: "Avoidantly attached people value independence above almost everything. They become uncomfortable with too much closeness, tend to suppress emotional needs, and often feel smothered when partners seek intimacy.\n\nThis style develops from caregivers who were emotionally unavailable or who pushed for independence too early. The child learned that expressing emotional needs led to rejection — so they stopped expressing them.\n\nIn relationships, avoidants often send mixed signals: pursuing potential partners from a distance then withdrawing when real intimacy approaches. They may genuinely want closeness but find it threatening when they get it.",
            wisdom: "Avoidant attachment is not indifference — it's a learned strategy of emotional self-sufficiency developed when closeness felt unsafe or punished.",
            quiz: {
              id: "att-l1-t3-q",
              question: "What is the core fear for someone with avoidant attachment?",
              options: [
                "Fear of abandonment and rejection",
                "Fear that intimacy and closeness will feel suffocating or threatening",
                "Fear of commitment and long-term relationships",
                "Fear of being misunderstood by partners",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
      {
        id: "att-l2",
        title: "Relationship Dynamics",
        topics: [
          {
            id: "att-l2-t1",
            title: "The Anxious-Avoidant Trap",
            content: "The most common — and most painful — relationship dynamic is the anxious-avoidant pair. The anxious partner craves more closeness; the avoidant partner needs more space. Each response triggers the other's deepest fear.\n\nThe anxious person pursues harder when the avoidant withdraws. The avoidant withdraws further when the anxious person pursues. Both are reacting to deeply wired attachment programming, not to each other as people.\n\nThis cycle can feel like intense, passionate love — because the inconsistency creates exactly the unpredictability that anxious attachment systems are hypervigilant to. Breaking the cycle requires both partners to recognize their role in it.",
            wisdom: "The anxious-avoidant cycle feels like passion but is actually two nervous systems activating each other's deepest fears — recognition is the only exit.",
            quiz: {
              id: "att-l2-t1-q",
              question: "Why does the anxious-avoidant relationship cycle feel like intense love?",
              options: [
                "Because both partners are highly attractive to each other",
                "Because the inconsistency mirrors what anxious attachment systems are wired to seek",
                "Because opposites attract in attachment theory",
                "Because avoidants are more passionate when they do engage",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "att-l2-t2",
            title: "Protest Behaviors",
            content: "Protest behaviors are actions anxiously attached people use to re-establish emotional closeness when they feel disconnected. They include: excessive texting, withdrawing to make the partner pursue, threatening to leave, and emotional outbursts.\n\nThese behaviors are counterproductive — they usually produce the opposite of their intended effect by pushing avoidant partners further away or creating more distance.\n\nRecognizing your own protest behaviors is the first step to interrupting them. Instead of protesting, the anxious attachment system needs to learn to communicate needs directly: 'I feel disconnected from you right now and I need reassurance.'",
            wisdom: "Protest behaviors are attempts to force closeness that always backfire — replacing them with direct communication of emotional needs is the healthier path.",
            quiz: {
              id: "att-l2-t2-q",
              question: "What is the most effective replacement for protest behaviors?",
              options: [
                "Giving your partner more space to come to you naturally",
                "Setting clear ultimatums about your needs",
                "Directly communicating your emotional needs without manipulation",
                "Ending the relationship if protest behaviors don't work",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "att-l2-t3",
            title: "Effective Communication in Attachment",
            content: "The antidote to attachment dysfunction is effective communication — and the book provides a specific framework: be direct, don't make it about winning, and focus on what you need rather than what your partner is doing wrong.\n\n'I feel anxious when I don't hear from you' is effective. 'You never text me back and you obviously don't care' is not.\n\nThe first focuses on your internal experience. The second attacks and creates defensiveness. Levine and Heller argue that most relationship problems are communication problems in disguise — specifically, the inability of both partners to express attachment needs without triggering defenses.",
            wisdom: "Express attachment needs as 'I feel X when Y' rather than 'You always/never Z' — the first invites connection, the second creates defensiveness.",
            quiz: {
              id: "att-l2-t3-q",
              question: "According to Attached, what is the most effective way to communicate attachment needs?",
              options: [
                "Write them in a letter to avoid emotional reactions",
                "Use 'I feel X when Y' statements focused on your experience rather than your partner's behavior",
                "Have the conversation only when both partners are calm and rested",
                "Start by listing specific examples of when your partner failed to meet your needs",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
      {
        id: "att-l3",
        title: "Building Secure Relationships",
        topics: [
          {
            id: "att-l3-t1",
            title: "Choosing a Secure Partner",
            content: "The authors make a practical argument: if you have an insecure attachment style, the most impactful thing you can do is choose a secure partner. Secure people deactivate anxious and avoidant systems because they respond consistently and without games.\n\nThe challenge: avoidants and anxious people often find secure partners less exciting than the push-pull of insecure relationships. Consistency feels boring when you're wired for unpredictability.\n\nThis is attachment science's hardest lesson: the relationship that feels most alive may actually be the least healthy, and the relationship that feels safe may take learning to appreciate.",
            wisdom: "Secure partners deactivate insecure attachment systems — the relationship that feels most exciting may be the least healthy, and the safe one may take learning to value.",
            quiz: {
              id: "att-l3-t1-q",
              question: "Why might an anxious person find a secure partner less exciting initially?",
              options: [
                "Because secure people are less physically attractive",
                "Because consistency feels boring when your attachment system is wired for unpredictability",
                "Because secure people are less emotionally intelligent",
                "Because anxious people prefer partners with similar attachment styles",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "att-l3-t2",
            title: "Becoming More Secure",
            content: "Attachment styles are not destiny. Research shows that earned security is possible — the process of becoming secure through intentional relationship practices.\n\nStrategies include: identifying your attachment style honestly, recognizing triggers before reacting, communicating needs directly, and seeking therapy or coaching to process childhood attachment wounds.\n\nBeing in a relationship with a securely attached partner accelerates this process dramatically. Their consistent, non-reactive responses gradually teach your nervous system that closeness is safe and needs can be met.",
            wisdom: "Attachment styles can change — earned security is possible through self-awareness, direct communication, and exposure to consistently safe relationships.",
            quiz: {
              id: "att-l3-t2-q",
              question: "What is 'earned security' in attachment theory?",
              options: [
                "Security that comes from financial stability in a relationship",
                "The process of becoming securely attached through intentional practices and safe relationship experiences",
                "Security that develops only after several years in a relationship",
                "A secure attachment style that develops naturally without effort",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "att-l3-t3",
            title: "The Relationship Inventory",
            content: "Levine and Heller suggest regularly taking stock of your relationship: Does your partner make you feel safe and secure consistently? Do you feel worse about yourself in this relationship? Are your needs being chronically ignored?\n\nThis isn't about demanding perfection. Every relationship has friction. But there's a difference between temporary friction and chronic unmet needs that erode your sense of self-worth.\n\nThe most important question is: does this relationship serve as a secure base from which you can go out and engage with the world confidently? If not, that's diagnostic information worth acting on.",
            wisdom: "A healthy relationship serves as a secure base that makes you more capable in the world — chronic unmet needs and self-worth erosion are warning signs worth acting on.",
            quiz: {
              id: "att-l3-t3-q",
              question: "What is the most important function of a healthy relationship according to Attached?",
              options: [
                "Providing consistent excitement and novelty",
                "Serving as a secure base from which you can engage with the world more confidently",
                "Meeting all of each partner's needs all of the time",
                "Eliminating all conflict through effective communication",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
    ],
  },
  {
    id: "becoming-iceman",
    title: "Becoming the Iceman",
    author: "Wim Hof & Justin Rosales",
    cover: require("../assets/images/book_iceman.png"),
    category: "Health",
    description: "Unlock your body's potential through cold exposure, breathwork, and mental focus.",
    readTime: 9,
    xpReward: 90,
    tags: ["health", "cold", "breathing", "willpower"],
    gradientFrom: "#0891B2",
    gradientTo: "#0F172A",
    lessons: [
      {
        id: "ice-l1",
        title: "The Science of Cold",
        topics: [
          {
            id: "ice-l1-t1",
            title: "Why Cold Exposure Works",
            content: "Cold exposure triggers a cascade of physiological responses: vasoconstriction followed by vasodilation, release of norepinephrine (a powerful mood-regulating hormone), and activation of brown adipose tissue that burns calories to generate heat.\n\nNorepinephrine release from cold exposure can increase by 300-500%. This accounts for the euphoria, focus, and elevated mood that regular cold practitioners report. It's biology, not willpower.\n\nThe body also adapts — repeated cold exposure increases the density of mitochondria in cells, improves thermoregulation, and trains the nervous system to stay calm under physiological stress.",
            wisdom: "Cold exposure triggers norepinephrine release up to 500% above baseline — this explains the mood, focus, and energy that practitioners experience, and the body adapts to become more efficient.",
            quiz: {
              id: "ice-l1-t1-q",
              question: "What hormone is massively released during cold exposure?",
              options: ["Cortisol", "Serotonin", "Norepinephrine", "Dopamine"],
              correctIndex: 2,
            },
          },
          {
            id: "ice-l1-t2",
            title: "The Wim Hof Method Overview",
            content: "The Wim Hof Method consists of three pillars: Cold Therapy, Breathing, and Commitment (mindset). No pillar works as well alone — they're designed to interact.\n\nThe breathing technique increases oxygen and CO2 levels in specific sequences, alkalizing the blood and creating a physiological state in which cold feels more manageable and meditation comes more easily.\n\nThe cold then tests and reinforces the mental skills developed through breathing. The commitment pillar — consistent daily practice — is what converts the occasional experience into a genuine lifestyle and physiological transformation.",
            wisdom: "The Wim Hof Method is three pillars — Cold, Breathing, Commitment — designed to interact: each one makes the others more effective.",
            quiz: {
              id: "ice-l1-t2-q",
              question: "What are the three pillars of the Wim Hof Method?",
              options: [
                "Cold, Fasting, Meditation",
                "Cold Therapy, Breathing, Commitment",
                "Ice Baths, Hyperventilation, Exercise",
                "Cold, Heat, Breathing",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "ice-l1-t3",
            title: "Cold as a Teacher",
            content: "Cold is perhaps the most honest feedback system in existence. You cannot fake your way through an ice bath. The body either has the physiological resources and nervous system control — or it doesn't.\n\nHof uses cold as a mirror: your reaction to cold water reveals your relationship with discomfort, urgency, and presence. Most people immediately begin shallow, panicked breathing. The practice teaches you to slow down, breathe deeply, and find calm inside an objectively uncomfortable situation.\n\nThis skill — staying calm inside chaos — transfers directly to every domain of life where stress appears.",
            wisdom: "Cold is the most honest teacher — you cannot fake your way through it, and the calm you learn to find inside discomfort transfers directly to every area of life.",
            quiz: {
              id: "ice-l1-t3-q",
              question: "What life skill does practicing cold exposure most directly develop?",
              options: [
                "Physical endurance and pain tolerance",
                "The ability to stay calm and breathe deeply inside objectively uncomfortable situations",
                "Improved immune system function",
                "Greater tolerance for social discomfort",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
      {
        id: "ice-l2",
        title: "The Breathing Technique",
        topics: [
          {
            id: "ice-l2-t1",
            title: "The Mechanics of the Breath",
            content: "The Wim Hof breathing technique involves 30-40 deep controlled breaths followed by a breath hold after a full exhale. This creates controlled hyperventilation that changes blood chemistry.\n\nThe heavy breathing increases oxygen saturation and flushes CO2. The hold after exhale — when lungs are empty — can last several minutes in practiced individuals, far beyond what normal breath holding allows.\n\nDuring the hold, the blood is alkaline, the body is flooded with oxygen from the heavy breathing phase, and a unique state of physiological calm arises. This is when deep meditation and profound mental clarity are most accessible.",
            wisdom: "30-40 deep breaths followed by a full-exhale hold floods the body with oxygen and alkalizes blood, creating a unique physiological state of calm and clarity.",
            quiz: {
              id: "ice-l2-t1-q",
              question: "What happens to the body during the breath-hold phase of the Wim Hof technique?",
              options: [
                "The body goes into emergency mode and releases adrenaline",
                "The blood becomes alkaline and the body enters a state of physiological calm",
                "The brain experiences oxygen deprivation leading to hallucinations",
                "Muscles relax due to reduced oxygen supply",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "ice-l2-t2",
            title: "Breathwork and Stress",
            content: "Most people breathe too shallowly — taking short chest breaths that keep the nervous system in a low-grade activated state. This chronic shallow breathing literally keeps the body in a mild stress response.\n\nDeep diaphragmatic breathing activates the parasympathetic nervous system — the rest-and-digest response — rapidly dropping heart rate and cortisol levels. The breath is the only autonomic function you can consciously control, making it the fastest direct lever into your nervous system state.\n\nHof's insight is that by taking control of the breath, you take control of your stress response — and ultimately, your health, mood, and performance.",
            wisdom: "Breathing is the only autonomic nervous system function under conscious control — mastering it gives you a direct lever over stress, mood, and performance.",
            quiz: {
              id: "ice-l2-t2-q",
              question: "Why is breathwork the fastest way to change your nervous system state?",
              options: [
                "Because lungs are the largest organ in the body",
                "Because breathing is the only autonomic function you can consciously control",
                "Because breath holds create beneficial oxygen deprivation",
                "Because deep breathing increases CO2 which calms the brain",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "ice-l2-t3",
            title: "Immune System and Cold",
            content: "For decades, science assumed the immune system could not be voluntarily controlled. Hof's studies at Radboud University changed that assumption. Trained practitioners were able to suppress inflammatory responses to injected bacteria — something previously considered impossible.\n\nThe mechanism: the combination of Hof's breathing and cold exposure raises cortisol levels in a controlled, acute way. This acute cortisol spike suppresses the immune system's inflammatory response, unlike the chronic cortisol of stress which damages health over time.\n\nThe distinction between acute and chronic stress exposure is critical: short bursts of physiological stress, followed by recovery, build resilience. Chronic unrelenting stress destroys it.",
            wisdom: "Acute, voluntary stress (cold + breath) builds immune resilience — chronic uncontrolled stress destroys it; the difference is control and recovery.",
            quiz: {
              id: "ice-l2-t3-q",
              question: "What did Hof's Radboud University study prove about the immune system?",
              options: [
                "That cold exposure eliminates all viral infections",
                "That breathing techniques permanently improve immune function",
                "That the immune system can be voluntarily influenced through breathing and cold",
                "That immune function is entirely genetic and cannot be trained",
              ],
              correctIndex: 2,
            },
          },
        ],
      },
      {
        id: "ice-l3",
        title: "Mental Mastery & Practice",
        topics: [
          {
            id: "ice-l3-t1",
            title: "The Power of Focus",
            content: "Hof's records — swimming under ice, running marathons barefoot in Arctic temperatures — are not primarily feats of physical conditioning. They are feats of focus.\n\nHis technique for cold endurance: keep attention strictly in the body, breathe consciously, and never let the mind catastrophize. The moment attention wanders to 'how much longer' or 'what if something goes wrong,' the physiological response degrades.\n\nPresence — not willpower — is what allows extreme performance. The focused mind maintains physiological control that the distracted mind cannot. This is the unified lesson of both the breathing and cold pillars.",
            wisdom: "Extreme performance in the cold is a feat of presence, not willpower — focused attention maintains physiological control that distraction immediately undermines.",
            quiz: {
              id: "ice-l3-t1-q",
              question: "What mental quality does Hof say is most critical for cold endurance?",
              options: [
                "Willpower and mental toughness",
                "Positive self-talk and affirmation",
                "Presence and focused attention that prevents catastrophizing",
                "Visualization of warm environments",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "ice-l3-t2",
            title: "Willpower as a Trainable Muscle",
            content: "Hof's central philosophical claim: the mind-body connection has been severed by modern comfort, and the Wim Hof Method is a way to re-establish it.\n\nEvolutionarily, humans were regularly exposed to temperature extremes, physical hardship, and food scarcity. These stressors kept the connection between mental intention and physical response robust and active.\n\nModern comfort has numbed this connection. But like a muscle, it can be retrained. Each cold shower, each breath hold, each voluntary hard thing — these are reps in the gym of mind-body control. The results accumulate over months and years.",
            wisdom: "Modern comfort severs the mind-body connection that hardship maintains — each voluntary hard thing you do is a rep in the gym of willpower, and the gains accumulate.",
            quiz: {
              id: "ice-l3-t2-q",
              question: "What does Hof say modern comfort has done to human capacity?",
              options: [
                "Made humans physically weaker but mentally stronger",
                "Severed the mind-body connection that regular exposure to hardship used to maintain",
                "Eliminated the need for physical training",
                "Improved immune function by reducing infection exposure",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "ice-l3-t3",
            title: "Starting Your Practice",
            content: "The entry point is simple: end every shower with 30 seconds of cold water. No full immersion required. No breathwork certification needed. Just 30 cold seconds at the end of your daily shower.\n\nThat's enough to start training the nervous system response, build the habit of choosing discomfort, and experience the mood elevation that follows. After a week, extend to 60 seconds. After a month, try 2-3 minutes.\n\nHof's message is that anyone can do this. The only requirement is the decision to start — and the discipline to make it daily. Everything else — the physical adaptations, the mental resilience, the health benefits — follows from consistency.",
            wisdom: "Start with 30 cold seconds at the end of every shower — the physiological and mental benefits begin immediately and compound with daily consistency.",
            quiz: {
              id: "ice-l3-t3-q",
              question: "What does Hof recommend as the starting point for cold exposure practice?",
              options: [
                "Full ice baths lasting 5-10 minutes",
                "30 seconds of cold water at the end of your daily shower",
                "Swimming in cold natural water bodies",
                "Cold exposure combined with fasting for maximum effect",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
    ],
  },
  {
    id: "cashvertising",
    title: "Cashvertising",
    author: "Drew Eric Whitman",
    cover: require("../assets/images/book_cash.png"),
    category: "Marketing",
    description: "The psychological tactics used by Madison Avenue to make you buy things you didn't know you wanted.",
    readTime: 9,
    xpReward: 90,
    tags: ["marketing", "psychology", "persuasion"],
    gradientFrom: "#065F46",
    gradientTo: "#F59E0B",
    lessons: [
      {
        id: "cash-l1",
        title: "The Psychology of Buying",
        topics: [
          {
            id: "cash-l1-t1",
            title: "The Life Force 8",
            content: "Whitman identifies eight desires hardwired into every human being since birth — no education, culture, or individual variation changes these. They are: survival and enjoyment of life, enjoyment of food and beverages, freedom from fear/pain/danger, sexual companionship, comfortable living conditions, being superior/winning/keeping up, care and protection of loved ones, and social approval.\n\nEvery great advertisement appeals to at least one of these desires. Not to wants, not to preferences — to biological imperatives.\n\nWhen your product or message taps a Life Force 8, you're aligning with evolution. When it doesn't, you're trying to create desire from scratch — an almost impossible task.",
            wisdom: "Every purchase decision is driven by one of eight hardwired biological desires — align your message to these and you're working with human nature, not against it.",
            quiz: {
              id: "cash-l1-t1-q",
              question: "What makes the 'Life Force 8' different from other consumer desires?",
              options: [
                "They are learned through cultural exposure",
                "They are hardwired biological imperatives present in every human since birth",
                "They are specific to high-income consumers",
                "They change based on age and life stage",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "cash-l1-t2",
            title: "Fear as a Motivator",
            content: "Fear is the most powerful motivator in human psychology — more powerful than desire. Loss aversion research confirms we feel the pain of losing twice as intensely as the pleasure of gaining the same amount.\n\nWhitman advises copywriters to identify what their audience fears losing, and show how their product prevents that loss. 'Protect your family from...' outperforms 'Give your family the best...' almost every time.\n\nThe most effective fear appeals are specific, credible, and paired with an immediate solution. Vague fear creates anxiety without action. Specific fear with a clear solution creates urgency.",
            wisdom: "Fear of loss is twice as motivating as prospect of gain — show specifically what someone risks losing, then immediately offer the solution.",
            quiz: {
              id: "cash-l1-t2-q",
              question: "Why is loss aversion more powerful than desire for gain in marketing?",
              options: [
                "Because people have more money to protect than they have extra to spend",
                "Because people feel the pain of losing twice as intensely as the pleasure of gaining the same amount",
                "Because fear is easier to trigger than excitement",
                "Because negative emotions last longer than positive ones",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "cash-l1-t3",
            title: "Social Proof and Herd Behavior",
            content: "Humans are fundamentally social animals who use the behavior of others to determine correct behavior in uncertain situations. This is not weakness — it's an efficient cognitive shortcut.\n\nIn advertising, social proof shows up as testimonials, case studies, reviews, user counts, and celebrity endorsements. The message: 'Other people like you are doing this — and it's working for them.'\n\nWhitman's key insight: social proof must be specific and credible to work. 'Thousands of satisfied customers' is less powerful than 'Sarah, 34, lost 22 pounds in 3 months.' Specificity creates believability.",
            wisdom: "Social proof works because humans default to following others in uncertainty — specificity (real names, real numbers, real results) makes it believable.",
            quiz: {
              id: "cash-l1-t3-q",
              question: "What makes social proof most effective in advertising?",
              options: [
                "Showing as many testimonials as possible",
                "Using celebrity endorsements from well-known figures",
                "Being specific with real names, real numbers, and real results",
                "Using emotionally powerful language in testimonials",
              ],
              correctIndex: 2,
            },
          },
        ],
      },
      {
        id: "cash-l2",
        title: "Copywriting That Converts",
        topics: [
          {
            id: "cash-l2-t1",
            title: "Headline Mastery",
            content: "The headline does 80% of the work in any advertisement. If the headline fails to grab attention and pull the reader forward, the rest of the copy is irrelevant — it won't be read.\n\nThe best headlines make a specific, relevant promise to the target audience. They speak directly to the reader's self-interest. They often contain a number, a 'how to,' or a surprising claim that creates curiosity.\n\nWhitman's rule: write at least 25 headline variations before selecting one. The first ideas are never the best. Most great headlines come somewhere around attempt 15-20, after the obvious ideas have been exhausted.",
            wisdom: "The headline does 80% of advertising work — write 25+ variations before choosing, because the best headlines never come first.",
            quiz: {
              id: "cash-l2-t1-q",
              question: "What does Whitman say headlines are responsible for in advertising?",
              options: [
                "50% of ad effectiveness",
                "80% of advertising work — if it fails to pull readers in, the rest is irrelevant",
                "Setting expectations for the product's quality",
                "Creating brand recognition over time",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "cash-l2-t2",
            title: "The AIDA Formula",
            content: "AIDA — Attention, Interest, Desire, Action — is the foundational framework for persuasive copy. Every piece of effective advertising moves the reader through all four stages.\n\nAttention: the headline stops the scroll. Interest: the opening copy speaks directly to a problem or desire. Desire: the body copy builds vivid wanting by showing transformation. Action: the call to action is clear, urgent, and easy.\n\nMost failed advertising breaks down at one of these stages. Usually either it fails to capture attention (weak headline) or fails to build desire (feature lists instead of benefits). Features describe what something is; benefits describe what it does for the person.",
            wisdom: "AIDA is the complete blueprint — move from attention to interest to desire to action, and never confuse features (what it is) with benefits (what it does for them).",
            quiz: {
              id: "cash-l2-t2-q",
              question: "What is the critical difference between features and benefits in copywriting?",
              options: [
                "Features are more credible; benefits are more emotional",
                "Features describe what something is; benefits describe what it does for the person",
                "Features are for technical audiences; benefits are for general consumers",
                "Features are facts; benefits are opinions",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "cash-l2-t3",
            title: "The Guarantee",
            content: "Offering a bold guarantee removes the primary barrier to purchase: risk. When someone is uncertain about a product, the fear of making a wrong decision prevents action. A guarantee eliminates that fear.\n\nCounterintuitively, the bolder the guarantee, the more it increases sales — and the less it costs in returns. A bold, specific guarantee signals confidence in the product. It also signals the company's integrity.\n\nWhitman's best guarantees are specific and unusual: '365-day no-questions-asked refund' or 'If you don't lose 10 pounds, we'll refund you and pay for your next diet program.' These stand out precisely because they make the seller more vulnerable.",
            wisdom: "Bold guarantees increase sales while paradoxically reducing returns — they signal confidence and integrity, eliminating the buyer's fear of making a wrong decision.",
            quiz: {
              id: "cash-l2-t3-q",
              question: "Why does offering a bold guarantee typically increase sales?",
              options: [
                "Because guarantees legally protect the consumer",
                "Because it eliminates the buyer's primary barrier: fear of making a wrong decision",
                "Because it makes the product appear more premium",
                "Because guarantees generate positive word of mouth",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
      {
        id: "cash-l3",
        title: "Advanced Persuasion",
        topics: [
          {
            id: "cash-l3-t1",
            title: "Urgency and Scarcity",
            content: "Urgency and scarcity are persuasion multipliers — they activate the loss aversion system and create pressure to decide now rather than later.\n\nTrue scarcity (limited quantities, closing deadlines) is enormously powerful because it's honest — and smart buyers respect it. Fake scarcity, when exposed, destroys trust permanently.\n\nThe psychology: when something may become unavailable, its desirability increases dramatically. This is not irrational — it's rational. Things that are rare often are more valuable. Evolution hardwired us to act quickly when resources become scarce.",
            wisdom: "Genuine urgency and scarcity are among the most powerful conversion tools — but fake scarcity, when detected, permanently destroys trust.",
            quiz: {
              id: "cash-l3-t1-q",
              question: "Why is fake scarcity dangerous in marketing?",
              options: [
                "Because it violates advertising regulations",
                "Because it permanently destroys trust when detected",
                "Because it attracts the wrong type of customer",
                "Because it reduces the perceived value of the product",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "cash-l3-t2",
            title: "The Power of Specificity",
            content: "Vague claims are ignored; specific claims are believed. '87% of dentists recommend' is more credible than 'most dentists recommend.' 'Lose up to 17 pounds in 30 days' is more compelling than 'lose weight fast.'\n\nSpecificity signals research, confidence, and honesty. Generalities are what liars use because they're unprovable and uncommittable. When you're specific, you're staking something — and audiences intuitively sense that.\n\nThis principle applies beyond advertising: in negotiations, proposals, presentations, and conversations. The specific detail that no one else included is always the one that makes the difference.",
            wisdom: "Specific claims are more believed than vague ones — specificity signals research and confidence, while generalities sound like what liars use.",
            quiz: {
              id: "cash-l3-t2-q",
              question: "Why are specific claims more persuasive than general ones?",
              options: [
                "Because specific claims are easier to remember",
                "Because specificity signals research and commitment — you're staking something with a specific claim",
                "Because people prefer numerical information",
                "Because specific claims are easier to verify",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "cash-l3-t3",
            title: "Ethical Persuasion",
            content: "Whitman closes with a critical distinction: understanding these techniques creates an ethical obligation to use them responsibly. Persuasion psychology is neither good nor bad — it's a tool.\n\nUsed ethically, these techniques help connect genuinely valuable products with the people who need them. Used unethically, they manipulate vulnerable people into decisions they'll regret.\n\nThe test Whitman proposes: would you be comfortable if your target audience could see exactly what you're doing and why? If yes — proceed. If not — reconsider. Great copywriters build trust, not tricks. Trust compounds; tricks expire.",
            wisdom: "Persuasion psychology is a tool — use it to connect real value with real need, and the test is simple: would you be comfortable if your audience saw exactly what you're doing?",
            quiz: {
              id: "cash-l3-t3-q",
              question: "What is Whitman's ethical test for advertising practices?",
              options: [
                "Would this be approved by a professional advertising association?",
                "Would you be comfortable if your target audience could see exactly what you're doing and why?",
                "Does it comply with all relevant laws and regulations?",
                "Would you be willing to use this technique on your own family members?",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
    ],
  },
  {
    id: "changing-world-order",
    title: "The Changing World Order",
    author: "Ray Dalio",
    cover: require("../assets/images/book_dalio.png"),
    category: "Finance",
    description: "Why nations succeed and fail — and what history's biggest cycles tell us about the future.",
    readTime: 9,
    xpReward: 90,
    tags: ["economics", "history", "investing"],
    gradientFrom: "#1E3A5F",
    gradientTo: "#D97706",
    lessons: [
      {
        id: "cwo-l1",
        title: "The Big Cycle",
        topics: [
          {
            id: "cwo-l1-t1",
            title: "The Rise and Fall of Empires",
            content: "Dalio studied the rise and fall of empires over 500 years and found a reliable pattern: the Big Cycle. Empires rise through superior productivity, trade, and innovation — then decline through debt, internal conflict, and external challenge.\n\nNo empire has avoided this cycle. The Dutch. The British. The Americans. Each rose on the same principles: strong education, productivity, rule of law, free markets, and reserve currency status.\n\nEach also declined through the same mechanism: excessive debt, wealth inequality, internal polarization, and a rising challenger. Understanding this cycle is Dalio's master key to understanding what's happening now.",
            wisdom: "Every major empire has risen and fallen through the same Big Cycle — education, productivity, and rule of law drive the rise; debt, inequality, and polarization drive the fall.",
            quiz: {
              id: "cwo-l1-t1-q",
              question: "What does Dalio identify as the common factors in the rise of dominant empires?",
              options: [
                "Military superiority and geographic advantages",
                "Strong education, productivity, rule of law, and free markets",
                "Natural resources and favorable climate",
                "Strong leadership and cultural homogeneity",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "cwo-l1-t2",
            title: "The Reserve Currency Cycle",
            content: "The world's reserve currency — the currency in which global trade is conducted and savings stored — follows its own cycle tied to empire cycles. The Dutch guilder gave way to the British pound, which gave way to the US dollar.\n\nHolding reserve currency status is enormously valuable: it allows a country to borrow at low rates, maintain global influence, and fund government spending by essentially printing money the world wants to hold.\n\nBut reserve currency status is not permanent. It erodes as the issuing nation over-borrows, inflates, and loses competitive advantage. The global shift from one reserve currency to another is always slow, then sudden.",
            wisdom: "Reserve currency status is enormously powerful but not permanent — over-borrowing and printing money erodes it, and the shift to a new reserve currency is always slow then sudden.",
            quiz: {
              id: "cwo-l1-t2-q",
              question: "What happens to reserve currency status when the issuing nation over-borrows?",
              options: [
                "Other nations stop trading with the country",
                "The currency strengthens as more people seek a safe haven",
                "It erodes as confidence in the currency declines, eventually shifting to a new reserve currency",
                "The International Monetary Fund intervenes to stabilize the currency",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "cwo-l1-t3",
            title: "The Long-Term Debt Cycle",
            content: "Dalio distinguishes between the short-term debt cycle (business cycles of 5-10 years) and the long-term debt cycle (50-75 years). Most people only think about the short-term cycle — the long-term one is where civilizations rise and fall.\n\nIn the long-term cycle: debt accumulates beyond what income can service, wealth inequality grows, money is printed to avoid default, and eventually the currency is devalued. This happened in Weimar Germany, in 1930s America, and in countless other nations throughout history.\n\nDalio's warning: the US is currently in the late stages of a long-term debt cycle. The resolution — historically — involves either defaults, inflation, or some combination of both.",
            wisdom: "The long-term debt cycle (50-75 years) is where civilizations collapse — debt beyond what income can service always resolves through default, inflation, or both.",
            quiz: {
              id: "cwo-l1-t3-q",
              question: "How does a long-term debt cycle typically resolve?",
              options: [
                "Through technological innovation that grows the economy out of debt",
                "Through austerity measures and spending cuts",
                "Through default, inflation, or some combination of both",
                "Through international debt forgiveness agreements",
              ],
              correctIndex: 2,
            },
          },
        ],
      },
      {
        id: "cwo-l2",
        title: "America vs China",
        topics: [
          {
            id: "cwo-l2-t1",
            title: "America's Current Position",
            content: "By Dalio's metrics, the United States is declining along classic empire decline indicators: high debt, political polarization, wealth inequality, and a rising external competitor.\n\nThis doesn't mean America is finished — it means America is in a transition period that could lead to renewal or to relative decline. Empires that have successfully navigated these transitions have done so through internal reform: reducing debt, rebuilding productivity, and addressing wealth inequality before it triggers revolution.\n\nDalio is not a doom-predictor. He presents this as a template for what to watch, and what policies would change the trajectory.",
            wisdom: "The US shows classic late-empire indicators, but decline is not inevitable — empires that navigated similar moments did so through internal reform before polarization became irreversible.",
            quiz: {
              id: "cwo-l2-t1-q",
              question: "What does Dalio say the US could do to navigate its current position successfully?",
              options: [
                "Increase military spending to deter challengers",
                "Expand trade agreements with new partners",
                "Internal reform: reducing debt, rebuilding productivity, addressing wealth inequality",
                "Form closer alliances with other Western democracies",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "cwo-l2-t2",
            title: "China's Rise",
            content: "China's rise follows the classic empire ascent pattern: from poverty in 1980 to the world's second-largest economy in 40 years, through education investment, export-driven productivity, and technology adoption.\n\nDalio spent decades doing business in China and has studied its history extensively. His observation: China is now at a point in its development comparable to the United States in the early 20th century — growing rapidly but not yet dominant.\n\nThe key question is not whether China will challenge American dominance — it already is — but whether the transition will be peaceful (as Britain-to-US was) or violent (as many historical transitions have been).",
            wisdom: "China follows the classic empire ascent — the question is not whether it challenges US dominance but whether the transition will be peaceful or conflictual.",
            quiz: {
              id: "cwo-l2-t2-q",
              question: "To what historical period does Dalio compare China's current stage of development?",
              options: [
                "Ancient Rome at its peak",
                "Britain during the Industrial Revolution",
                "The United States in the early 20th century",
                "Post-WWII Europe during reconstruction",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "cwo-l2-t3",
            title: "How to Position Yourself",
            content: "Dalio's practical advice for individuals navigating this transition: diversify across currencies, asset classes, and geographies. Don't hold all wealth in any single country's currency or in any single asset class.\n\nHistorically, the people who best survived empire transitions were those with international assets, hard assets (gold, real estate, commodities), and the flexibility to move capital when the local situation deteriorated.\n\nHis broader lesson: you cannot control geopolitical transitions, but you can make yourself more robust to them. Diversification is not just a financial strategy — it's a civilizational survival strategy.",
            wisdom: "Individual resilience through empire transitions comes from diversification — across currencies, asset classes, and geographies — because no single system is permanent.",
            quiz: {
              id: "cwo-l2-t3-q",
              question: "What is Dalio's primary advice for individuals during empire transitions?",
              options: [
                "Invest heavily in the rising empire's assets",
                "Hold cash during transition periods to minimize risk",
                "Diversify across currencies, asset classes, and geographies",
                "Focus on domestic real estate as a stable store of value",
              ],
              correctIndex: 2,
            },
          },
        ],
      },
      {
        id: "cwo-l3",
        title: "Lessons for Today",
        topics: [
          {
            id: "cwo-l3-t1",
            title: "Internal Order vs External Order",
            content: "Dalio distinguishes between internal order (stability within a nation — political, economic, social) and external order (the balance of power between nations). Both cycle independently but interact.\n\nInternal disorder — polarization, inequality, class conflict — weakens a nation's ability to compete externally. External challenges — a rising competitor, trade war, military conflict — intensify internal divisions.\n\nThis mutual reinforcement is why late-cycle empires decline rapidly once decline begins. The internal and external problems accelerate each other. Watch both dimensions simultaneously to understand where any nation is in its cycle.",
            wisdom: "Internal disorder and external challenges reinforce each other in late-cycle empires — watching both simultaneously reveals where a nation truly is in its cycle.",
            quiz: {
              id: "cwo-l3-t1-q",
              question: "How do internal disorder and external challenges interact in late-cycle empires?",
              options: [
                "They cancel each other out as the nation focuses on survival",
                "They accelerate each other, causing rapid decline once it begins",
                "External challenges trigger internal unity against common enemies",
                "Internal disorder prevents engagement with external challenges",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "cwo-l3-t2",
            title: "Wealth Inequality and Revolution",
            content: "In every historical cycle Dalio studied, extreme wealth inequality was a precursor to either reform or revolution. The two outcomes were not random — they depended on whether those with power chose to share it before being forced to.\n\nWhen wealth inequality reaches extreme levels, the middle class erodes, resentment grows, and demagogues with simple answers find receptive audiences. The historical record is clear: societies that reformed proactively avoided the worst outcomes; those that didn't typically suffered violent upheaval.\n\nThis is not an argument for any particular policy — it's a pattern recognition exercise. Wherever wealth inequality becomes extreme, the template suggests: watch carefully.",
            wisdom: "Extreme wealth inequality in every historical cycle preceded either proactive reform or violent revolution — the outcome depended on whether power-holders shared it before being forced to.",
            quiz: {
              id: "cwo-l3-t2-q",
              question: "What two outcomes does history show for societies with extreme wealth inequality?",
              options: [
                "Economic collapse or technological innovation",
                "Proactive reform (if acted on early) or violent revolution (if ignored)",
                "Peaceful redistribution or emigration of the wealthy",
                "Military dictatorship or democratic reform",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "cwo-l3-t3",
            title: "The Principles for Success",
            content: "Dalio concludes with a template for what makes individuals, organizations, and nations succeed across cycles: strong fundamentals (education, productivity, innovation), prudent debt management, strong rule of law, and the ability to learn and adapt.\n\nThose who study history and recognize the patterns can position themselves — financially and intellectually — better than those who assume current conditions are permanent.\n\nHis final message: be humble about what you know, diversify broadly, build strong fundamentals, and recognize that the biggest risk is always assuming the current order is the natural order. It never is.",
            wisdom: "Success across cycles requires strong fundamentals, prudent debt, rule of law, and — above all — the humility to recognize that the current order is never permanent.",
            quiz: {
              id: "cwo-l3-t3-q",
              question: "What does Dalio say is the biggest risk for individuals and nations?",
              options: [
                "Investing in volatile assets during uncertain times",
                "Assuming the current order is permanent when it never is",
                "Failing to innovate quickly enough to compete",
                "Losing reserve currency status too quickly",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
    ],
  },
  {
    id: "compound-effect",
    title: "The Compound Effect",
    author: "Darren Hardy",
    cover: require("../assets/images/book_compound.png"),
    category: "Habits",
    description: "Small, everyday decisions that compound into extraordinary results over time. No shortcuts, no luck.",
    readTime: 9,
    xpReward: 90,
    tags: ["habits", "success", "discipline"],
    gradientFrom: "#4A1D96",
    gradientTo: "#06B6D4",
    lessons: [
      {
        id: "ce-l1",
        title: "The Compound Principle",
        topics: [
          {
            id: "ce-l1-t1",
            title: "Small Choices, Massive Results",
            content: "Hardy opens with a thought experiment: three friends start life with identical circumstances. Friend A makes small positive changes — reads 10 minutes daily, exercises 3x a week, adds one vegetable to each meal. Friend B stays the same. Friend C makes small negative choices — one extra snack, one less hour of sleep, a little more TV.\n\nIn 6 months, no visible difference. In a year, slight differences. In 5 years: Friend A is unrecognizable — healthy, growing, successful. Friend B is the same. Friend C is visibly declining.\n\nThe compound effect doesn't lie — it just takes time to reveal itself. Most people quit before they can see it.",
            wisdom: "Small positive choices compounded over years create unrecognizable transformation — the problem is the delay between choices and visible results causes most people to quit first.",
            quiz: {
              id: "ce-l1-t1-q",
              question: "Why do most people fail to leverage the compound effect?",
              options: [
                "Because they lack the discipline to make large changes",
                "Because they quit before the delayed results of small choices become visible",
                "Because compound effects only work for certain types of habits",
                "Because the positive changes require too much time each day",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "ce-l1-t2",
            title: "Consistency Over Intensity",
            content: "The most common mistake people make is choosing intensity over consistency. The crash diet beats the sustainable one in week one. The all-night study session beats the 30 minutes daily for two weeks.\n\nBut compound effects require consistency — not heroism. The person who reads 10 pages every single day for a year reads 3,650 pages — roughly 15-20 books. The person who reads 100 pages on occasional motivated weekends reads fewer books and retains less.\n\nHardy's principle: make the daily discipline small enough that you can keep it on your worst day. That's the actual constraint. Not your best day — your worst.",
            wisdom: "Compound results require consistency over intensity — make daily disciplines small enough to maintain on your worst day, because that's the real constraint.",
            quiz: {
              id: "ce-l1-t2-q",
              question: "How does Hardy determine the right size for a daily discipline?",
              options: [
                "As large as you can manage on your best day",
                "Small enough that you can maintain it even on your worst day",
                "Whatever your highest-performing competitor is doing",
                "Large enough to feel challenging but not overwhelming",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "ce-l1-t3",
            title: "The Power of Momentum",
            content: "Once the compound effect has been running long enough, it generates momentum — a force that carries you forward almost automatically. Hardy describes this as 'The Big Mo.'\n\nMomentum is expensive to start and almost free to maintain. The hardest part of any worthwhile endeavor is the early phase, before compound results are visible and when every effort feels unrewarded.\n\nBut once momentum builds, forward motion becomes self-sustaining. You don't want to stop because stopping means losing the momentum that took so long to build. This is why consistency at the beginning is so critical — you're building the engine that will eventually run itself.",
            wisdom: "Momentum is expensive to start but almost free to maintain — the early phase before visible results is the hardest and most critical period to survive.",
            quiz: {
              id: "ce-l1-t3-q",
              question: "What does Hardy call the self-sustaining forward motion that compound effects eventually create?",
              options: [
                "The Flywheel Effect",
                "The Growth Spiral",
                "The Big Mo (Momentum)",
                "The Compound Force",
              ],
              correctIndex: 2,
            },
          },
        ],
      },
      {
        id: "ce-l2",
        title: "Building the Engine",
        topics: [
          {
            id: "ce-l2-t1",
            title: "Track Everything",
            content: "What gets measured gets managed. Hardy insists on tracking — not for motivation, but for data. Tracking creates awareness that prevents the unconscious drift away from good habits.\n\nMost people have no idea how they actually spend their time, money, or calories. They estimate, and estimates are always optimistic. Tracking reveals reality, and reality is always more actionable than comfortable fiction.\n\nThe compound effect requires accurate data on your inputs. Small miscalibrations in inputs — an extra 200 calories daily, 30 minutes less sleep, one fewer productive hour — compound just as reliably as positive inputs do. Track both.",
            wisdom: "Tracking your inputs reveals the reality of your habits versus your assumptions — and small negative miscalibrations compound just as reliably as positive ones.",
            quiz: {
              id: "ce-l2-t1-q",
              question: "Why does Hardy insist on tracking habits and behaviors?",
              options: [
                "To maintain motivation by seeing progress",
                "To compare yourself to others' performance",
                "To create awareness that prevents unconscious drift — estimates are always too optimistic",
                "To share progress on social media for accountability",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "ce-l2-t2",
            title: "Influences and Environment",
            content: "You are the average of the five people you spend the most time with. This is Hardy's most confronting claim — and the most empirically supported. Your income, health, habits, and values are all dramatically influenced by your closest relationships.\n\nIf your five closest people read, you'll read. If they exercise, you'll exercise. If they complain and watch TV, you'll drift that way too — regardless of your intentions.\n\nHardy's prescription: audit your relationships. Be honest about whether the people closest to you are compounding you upward or downward. Then make deliberate choices about who gets your time.",
            wisdom: "You are the average of your five closest relationships — audit them honestly, because they compound your habits, values, and outcomes regardless of your individual intentions.",
            quiz: {
              id: "ce-l2-t2-q",
              question: "What does Hardy recommend doing about relationships that compound you downward?",
              options: [
                "Try to influence them positively with your own habits",
                "Cut them off completely and immediately",
                "Audit your relationships honestly and make deliberate choices about who gets your time",
                "Limit contact while maintaining the friendship for social support",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "ce-l2-t3",
            title: "Acceleration: Doing More",
            content: "Once the compound effect is in motion, Hardy advises using acceleration techniques to get more output from the same inputs. This means: doing things faster, batching related tasks, eliminating interruptions, and removing low-value activities ruthlessly.\n\nThe 80/20 principle applies here: 20% of your inputs are creating 80% of your results. Find that 20%, double down on it, and systematically eliminate or delegate the rest.\n\nAcceleration doesn't mean working harder — it means working with greater precision on the inputs that compound most powerfully. One focused hour on the right activity outperforms four unfocused hours on less important work.",
            wisdom: "Once momentum builds, accelerate by identifying the 20% of inputs creating 80% of results — double those and eliminate the rest ruthlessly.",
            quiz: {
              id: "ce-l2-t3-q",
              question: "What does Hardy mean by 'acceleration' in the compound effect?",
              options: [
                "Working longer hours to produce more output",
                "Increasing the speed of physical activities for better fitness results",
                "Identifying the high-leverage 20% of inputs and doubling them while eliminating low-value activities",
                "Moving to faster-growing industries or markets",
              ],
              correctIndex: 2,
            },
          },
        ],
      },
      {
        id: "ce-l3",
        title: "Living the Compound Life",
        topics: [
          {
            id: "ce-l3-t1",
            title: "Your 'Why' Must Be Compelling",
            content: "The compound effect requires years of consistent action before major results appear. Motivation based on outcomes — 'I'll be happy when I reach the goal' — cannot survive that long without visible progress.\n\nHardy argues your 'why' must be so emotionally compelling that it sustains you through the Valley of No Visible Results. It must be personal, specific, and tied to things that matter deeply — not abstract ideals.\n\nThe clearest 'why' Hardy knows: write a detailed description of what your life looks like if you do nothing for 10 years. Then write one describing what it looks like if you execute the compound effect fully. The gap between those two descriptions is your 'why.'",
            wisdom: "Your 'why' must be emotionally compelling enough to survive years without visible results — find it by describing the gap between your best and worst 10-year future.",
            quiz: {
              id: "ce-l3-t1-q",
              question: "Why does Hardy say your 'why' must be so compelling?",
              options: [
                "Because compelling goals attract more resources and opportunities",
                "Because it must sustain consistent action through years of no visible results",
                "Because a strong why makes difficult tasks feel easy",
                "Because compelling goals generate accountability from others",
              ],
              correctIndex: 1,
            },
          },
          {
            id: "ce-l3-t2",
            title: "Habits as Assets",
            content: "Hardy reframes habits as assets — things that accrue compound value over time, or liabilities that drain it. A good morning routine is an asset that pays dividends every day. A bad sleep habit is a liability that costs you every day.\n\nViewing habits as financial assets changes how you make decisions about them. You wouldn't sell a high-performing asset. You wouldn't keep adding to a liability. The same logic applies.\n\nOnce you have strong positive habits compounding, they become one of your most valuable possessions. They generate results with less effort over time — the opposite of most things in life that require constant manual energy.",
            wisdom: "Strong positive habits are assets that compound — they generate results with decreasing effort over time, like a high-performing investment that grows on its own.",
            quiz: {
              id: "ce-l3-t2-q",
              question: "How does Hardy suggest thinking about your daily habits?",
              options: [
                "As moral obligations to yourself and others",
                "As necessary costs of achieving your goals",
                "As financial assets (compounding positively) or liabilities (draining value daily)",
                "As short-term tools to be modified as needed",
              ],
              correctIndex: 2,
            },
          },
          {
            id: "ce-l3-t3",
            title: "No Shortcuts, No Luck",
            content: "Hardy's closing argument is against magical thinking. There is no shortcut that produces compound results — shortcuts produce shortcut results. The lottery winner, the overnight success, the sudden windfall — these are statistical anomalies, not templates.\n\nThe compound effect is available to everyone, requires no special talent, and scales with nothing except consistency and time. It's the most democratic success formula in existence.\n\nHardy's final message: stop looking for shortcuts, start making small positive choices consistently, and trust the math. The compound effect always delivers — on both positive and negative inputs. Choose your inputs deliberately.",
            wisdom: "Shortcuts produce shortcut results — the compound effect is the most democratic success formula in existence and requires only consistency and time, available to everyone.",
            quiz: {
              id: "ce-l3-t3-q",
              question: "What does Hardy mean when he says the compound effect is 'democratic'?",
              options: [
                "It works best in democratic countries with free markets",
                "It requires no special talent or circumstances — only consistency and time, available to everyone",
                "It produces equal results for everyone who follows it",
                "It can be applied to political and civic life as well as personal development",
              ],
              correctIndex: 1,
            },
          },
        ],
      },
    ],
  },
];

export function getTopicCount(book: Book): number {
  return book.lessons.reduce((acc, l) => acc + l.topics.length, 0);
}

export function getTotalTopics(book: Book): number {
  return getTopicCount(book);
}

export function findTopic(book: Book, lessonId: string, topicId: string) {
  const lesson = book.lessons.find((l) => l.id === lessonId);
  if (!lesson) return null;
  const topic = lesson.topics.find((t) => t.id === topicId);
  return topic ? { lesson, topic } : null;
}

export function getNextTopic(
  book: Book,
  lessonId: string,
  topicId: string
): { lessonId: string; topicId: string } | null {
  for (let li = 0; li < book.lessons.length; li++) {
    const lesson = book.lessons[li];
    if (lesson.id !== lessonId) continue;
    for (let ti = 0; ti < lesson.topics.length; ti++) {
      if (lesson.topics[ti].id !== topicId) continue;
      if (ti + 1 < lesson.topics.length) {
        return { lessonId, topicId: lesson.topics[ti + 1].id };
      }
      if (li + 1 < book.lessons.length) {
        return {
          lessonId: book.lessons[li + 1].id,
          topicId: book.lessons[li + 1].topics[0].id,
        };
      }
      return null;
    }
  }
  return null;
}
