import type { Video, Channel, Comment } from "@/types";

// Generate a random number of views (formatted with K, M)
function generateViews(): string {
  const random = Math.random();
  if (random > 0.7) {
    // Millions
    return `${(Math.random() * 20 + 1).toFixed(1)}M`;
  } else if (random > 0.3) {
    // Hundreds of thousands
    return `${Math.floor(Math.random() * 900 + 100)}K`;
  } else {
    // Thousands
    return `${Math.floor(Math.random() * 90 + 10)}K`;
  }
}

// Generate a random number of likes (formatted with K, M)
function generateLikes(): string {
  const random = Math.random();
  if (random > 0.8) {
    // Millions
    return `${(Math.random() * 5 + 1).toFixed(1)}M`;
  } else if (random > 0.4) {
    // Hundreds of thousands
    return `${Math.floor(Math.random() * 900 + 100)}K`;
  } else {
    // Thousands
    return `${Math.floor(Math.random() * 90 + 10)}K`;
  }
}

// Generate a random upload date
function generateUploadDate(): string {
  const random = Math.random();
  if (random > 0.7) {
    // Hours ago
    return `${Math.floor(Math.random() * 23 + 1)} hours ago`;
  } else if (random > 0.5) {
    // Days ago
    return `${Math.floor(Math.random() * 6 + 1)} days ago`;
  } else if (random > 0.3) {
    // Weeks ago
    return `${Math.floor(Math.random() * 3 + 1)} weeks ago`;
  } else if (random > 0.1) {
    // Months ago
    return `${Math.floor(Math.random() * 11 + 1)} months ago`;
  } else {
    // Years ago
    return `${Math.floor(Math.random() * 5 + 1)} years ago`;
  }
}

// Generate a random duration
function generateDuration(): string {
  const minutes = Math.floor(Math.random() * 59 + 1);
  const seconds = Math.floor(Math.random() * 59 + 1);

  if (Math.random() > 0.9) {
    // Long videos (hours)
    const hours = Math.floor(Math.random() * 5 + 1);
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    // Regular videos (minutes)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

// Generate a random timestamp for comments
function generateTimestamp(): string {
  const random = Math.random();
  if (random > 0.7) {
    // Hours ago
    return `${Math.floor(Math.random() * 23 + 1)} hours ago`;
  } else if (random > 0.4) {
    // Days ago
    return `${Math.floor(Math.random() * 6 + 1)} days ago`;
  } else if (random > 0.2) {
    // Weeks ago
    return `${Math.floor(Math.random() * 3 + 1)} weeks ago`;
  } else {
    // Months ago
    return `${Math.floor(Math.random() * 11 + 1)} months ago`;
  }
}

// Dummy channels
export const dummyChannels: Channel[] = [
  {
    id: "channel1",
    name: "TechInsights",
    avatar: "/placeholder.svg?height=80&width=80",
    subscribers: "2.4M",
    verified: true,
  },
  {
    id: "channel2",
    name: "Gaming Universe",
    avatar: "/placeholder.svg?height=80&width=80",
    subscribers: "5.7M",
    verified: true,
  },
  {
    id: "channel3",
    name: "Cooking with Alex",
    avatar: "/placeholder.svg?height=80&width=80",
    subscribers: "987K",
    verified: false,
  },
  {
    id: "channel4",
    name: "Travel Diaries",
    avatar: "/placeholder.svg?height=80&width=80",
    subscribers: "1.2M",
    verified: true,
  },
  {
    id: "channel5",
    name: "Science Explained",
    avatar: "/placeholder.svg?height=80&width=80",
    subscribers: "3.1M",
    verified: true,
  },
  {
    id: "channel6",
    name: "Music Vibes",
    avatar: "/placeholder.svg?height=80&width=80",
    subscribers: "8.5M",
    verified: true,
  },
  {
    id: "channel7",
    name: "DIY Projects",
    avatar: "/placeholder.svg?height=80&width=80",
    subscribers: "645K",
    verified: false,
  },
  {
    id: "channel8",
    name: "Fitness Journey",
    avatar: "/placeholder.svg?height=80&width=80",
    subscribers: "1.8M",
    verified: true,
  },
  {
    id: "channel9",
    name: "Movie Reviews",
    avatar: "/placeholder.svg?height=80&width=80",
    subscribers: "2.2M",
    verified: true,
  },
  {
    id: "channel10",
    name: "News Network",
    avatar: "/placeholder.svg?height=80&width=80",
    subscribers: "4.7M",
    verified: true,
  },
];

// Video titles and descriptions
const videoContent = [
  {
    title: "10 Tech Gadgets You Need in 2023",
    description:
      "Discover the most innovative tech gadgets of 2023 that will revolutionize your daily life. From smart home devices to portable electronics, these gadgets are a must-have for any tech enthusiast. We review each product in detail and provide our honest opinions on their functionality, design, and value for money.",
  },
  {
    title: "How to Build a Gaming PC in 2023 | Step by Step Guide",
    description:
      "Complete step-by-step tutorial on building your own gaming PC in 2023. We cover everything from choosing components to assembly and first boot. This guide is perfect for beginners and experienced builders alike, with tips on optimizing performance and avoiding common mistakes.",
  },
  {
    title: "The Perfect Pasta Carbonara Recipe | Italian Cuisine",
    description:
      "Learn how to make authentic Italian pasta carbonara with this easy-to-follow recipe. We share the traditional techniques and ingredients that make this dish a classic. No cream needed - just eggs, cheese, pancetta, and pasta. Follow along for a delicious meal that will impress your family and friends.",
  },
  {
    title: "Exploring the Hidden Gems of Bali | Travel Vlog",
    description:
      "Join us as we explore the less-known destinations in Bali, Indonesia. Discover secret beaches, local restaurants, and cultural experiences away from the tourist crowds. This travel guide will help you plan an authentic Balinese adventure with insider tips on accommodation, transportation, and activities.",
  },
  {
    title: "Understanding Quantum Physics for Beginners",
    description:
      "A beginner-friendly explanation of quantum physics concepts. We break down complex theories into simple, understandable explanations with visual aids and examples. Learn about wave-particle duality, quantum entanglement, and Heisenberg's uncertainty principle in this educational video.",
  },
  {
    title: "Top 10 Songs of the Summer | Music Countdown",
    description:
      "Counting down the top 10 hit songs that defined this summer. We analyze each track's popularity, cultural impact, and what made it resonate with listeners worldwide. From chart-topping singles to viral TikTok hits, these songs dominated playlists and radio stations throughout the season.",
  },
  {
    title: "DIY Home Office Makeover Under $200",
    description:
      "Transform your home office on a budget with these affordable DIY ideas. We show you how to create a productive and stylish workspace without breaking the bank. This video includes furniture hacks, organization tips, and decor suggestions that can be implemented in a weekend.",
  },
  {
    title: "30-Minute Full Body Workout | No Equipment Needed",
    description:
      "An effective 30-minute workout routine that targets all major muscle groups without requiring any equipment. Perfect for home workouts or when traveling. This high-intensity interval training session includes warm-up and cool-down stretches, with modifications for different fitness levels.",
  },
  {
    title: "Movie Review: The Latest Blockbuster Analyzed",
    description:
      "In-depth analysis and review of the newest blockbuster film. We discuss the plot, character development, cinematography, and overall entertainment value without major spoilers. Whether you're deciding if it's worth watching in theaters or just want to hear our thoughts, this review has you covered.",
  },
  {
    title: "Breaking News: Global Economic Summit Results",
    description:
      "Comprehensive coverage of the recent global economic summit and its potential impact on markets worldwide. Our expert analysts break down the key decisions, agreements, and what they mean for international trade and financial stability. Stay informed with our balanced reporting on this important event.",
  },
  {
    title: "5 Programming Languages to Learn in 2023",
    description:
      "Guide to the most in-demand programming languages worth learning this year. We discuss job opportunities, learning curves, and practical applications for each language. Whether you're a beginner or looking to expand your coding skills, this video will help you choose which language to focus on next.",
  },
  {
    title: "Ultimate Guide to Smartphone Photography",
    description:
      "Master the art of taking professional-quality photos with just your smartphone. Learn about composition, lighting, editing apps, and advanced camera settings. These techniques will transform your Instagram feed and help you capture memorable moments with the device you already carry everywhere.",
  },
  {
    title: "Vegan Meal Prep for the Entire Week",
    description:
      "Complete meal prep guide for a week of delicious vegan meals. We show you how to prepare nutritionally balanced breakfasts, lunches, and dinners in just a few hours. This video includes a shopping list, storage tips, and recipes that are both healthy and flavorful.",
  },
  {
    title: "Ancient Egyptian Mysteries Finally Solved",
    description:
      "Recent archaeological discoveries that have solved long-standing mysteries about ancient Egyptian civilization. We explore new findings about pyramid construction, hieroglyphics, and daily life in this fascinating historical period. Experts share their insights on how these discoveries change our understanding of this advanced ancient culture.",
  },
  {
    title: "How to Start Investing with Just $100",
    description:
      "Beginner-friendly guide to investing small amounts of money wisely. We cover different investment options, platforms, and strategies for growing your wealth gradually. This video demystifies the investment process and shows how anyone can start building financial security regardless of their starting budget.",
  },
  {
    title: "Behind the Scenes: Making of a Blockbuster Movie",
    description:
      "Exclusive behind-the-scenes look at how major films are produced. We show the special effects, set design, and coordination required to create cinematic magic. This documentary-style video reveals the collaborative effort of hundreds of professionals working together to bring stories to life on the big screen.",
  },
  {
    title: "The Science of Perfect Sleep | Improve Your Rest",
    description:
      "Scientific approach to optimizing your sleep quality and duration. Learn about sleep cycles, ideal bedroom conditions, and habits that promote better rest. This evidence-based guide will help you wake up refreshed and improve your overall health through better sleep hygiene.",
  },
  {
    title: "Extreme Weather Phenomena Explained",
    description:
      "Educational breakdown of unusual weather events and why they occur. From tornadoes to polar vortexes, we explain the science behind extreme weather. Meteorologists provide insights into how climate change is affecting the frequency and intensity of these phenomena around the world.",
  },
  {
    title: "Learning Chess: From Beginner to Intermediate",
    description:
      "Comprehensive chess tutorial for improving your game beyond the basics. We cover opening strategies, middle game tactics, and endgame techniques. This instructional video includes practice positions and common scenarios to help you develop your strategic thinking and anticipate your opponent's moves.",
  },
  {
    title: "History of Video Games: The Golden Era",
    description:
      "Nostalgic journey through the most influential period in video game history. We explore iconic consoles, groundbreaking titles, and the developers who shaped the industry. This documentary celebrates the creativity and innovation that established gaming as a mainstream entertainment medium.",
  },
];

// Generate 200 dummy videos
export const dummyVideos: Video[] = Array.from({ length: 200 }, (_, i) => {
  const contentIndex = i % videoContent.length;
  const channelIndex = i % dummyChannels.length;

  return {
    id: `video${i + 1}`,
    title: videoContent[contentIndex].title,
    description: videoContent[contentIndex].description,
    thumbnail: `/placeholder.svg?height=720&width=1280&text=Video+${i + 1}`,
    channelId: dummyChannels[channelIndex].id,
    views: generateViews(),
    likes: generateLikes(),
    uploadDate: generateUploadDate(),
    duration: generateDuration(),
  };
});

// Comment texts
const commentTexts = [
  "This video was so helpful! Thanks for sharing your knowledge.",
  "I've been waiting for content like this. Great job!",
  "First time watching your channel and I'm already subscribed!",
  "The quality of your videos keeps getting better and better.",
  "Could you please make a follow-up video on this topic?",
  "I tried this method and it worked perfectly. Thank you!",
  "Your explanation made this complex topic so easy to understand.",
  "Been following your channel for years, never disappointed.",
  "This deserves way more views than it has.",
  "The editing in this video is top-notch!",
  "I disagree with some points, but overall great content.",
  "Watching this at 2AM instead of sleeping. No regrets!",
  "Can you recommend more resources on this subject?",
  "This changed my perspective completely. Mind blown.",
  "Sharing this with all my friends right now.",
  "The background music is perfect for this video.",
  "I've learned more from this video than I did in school.",
  "Please make more content like this!",
  "Your channel is severely underrated.",
  "This is exactly what I needed to see today.",
];

// User names for comments
const commentUsers = [
  "TechEnthusiast",
  "GamingPro",
  "FoodieForever",
  "TravelBug",
  "ScienceGeek",
  "MusicLover",
  "DIYCreator",
  "FitnessJunkie",
  "MovieBuff",
  "NewsReader",
  "CodeMaster",
  "PhotoPro",
  "VeganLife",
  "HistoryNerd",
  "InvestorMind",
  "FilmMaker",
  "SleepExpert",
  "WeatherWatcher",
  "ChessPlayer",
  "RetroGamer",
];

// Generate comments for videos
export const dummyComments: Comment[] = [];

// Generate 5-15 comments per video
dummyVideos.forEach((video) => {
  const commentCount = Math.floor(Math.random() * 11) + 5; // 5-15 comments

  for (let i = 0; i < commentCount; i++) {
    const userIndex = Math.floor(Math.random() * commentUsers.length);
    const textIndex = Math.floor(Math.random() * commentTexts.length);

    dummyComments.push({
      id: `comment_${video.id}_${i}`,
      videoId: video.id,
      userName: commentUsers[userIndex],
      userAvatar: `/placeholder.svg?height=40&width=40&text=${commentUsers[
        userIndex
      ].charAt(0)}`,
      text: commentTexts[textIndex],
      likes: Math.floor(Math.random() * 1000).toString(),
      timestamp: generateTimestamp(),
    });
  }
});
