
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, TrendingUp, TrendingDown, Send, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Community = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [newPostText, setNewPostText] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Alex Johnson",
        avatar: "public/lovable-uploads/8d28f839-6a85-4e94-9b81-5b308b07e52a.png",
      },
      content: "Bitcoin breaking $50k again! What do you think the next resistance level will be? I'm thinking we might see $58k this month if momentum continues.",
      timestamp: "2 hours ago",
      likes: 24,
      dislikes: 3,
      comments: 8,
      hashtags: ["bitcoin", "BTC", "crypto"],
      userLiked: false,
      userDisliked: false,
    },
    {
      id: 2,
      author: {
        name: "Sophia Chen",
        avatar: "",
      },
      content: "Anyone following the Ethereum upgrades? The merge is getting closer and I think it will be a game-changer for the entire ecosystem. What are your thoughts on the impact on gas fees?",
      timestamp: "4 hours ago",
      likes: 32,
      dislikes: 1,
      comments: 14,
      hashtags: ["ethereum", "ETH", "merge"],
      userLiked: true,
      userDisliked: false,
    },
    {
      id: 3,
      author: {
        name: "Mark Wilson",
        avatar: "",
      },
      content: "Just published a new article analyzing the top DeFi protocols by TVL. Interesting to see how the landscape has changed over the last 6 months with some newcomers taking significant market share.",
      timestamp: "8 hours ago",
      likes: 18,
      dislikes: 0,
      comments: 5,
      hashtags: ["DeFi", "analysis", "TVL"],
      userLiked: false,
      userDisliked: false,
    },
    {
      id: 4,
      author: {
        name: "Ilona Smilquet",
        avatar: "public/lovable-uploads/8d28f839-6a85-4e94-9b81-5b308b07e52a.png",
      },
      content: "Just starting my crypto journey this month! Any recommendations for the best resources to learn more about blockchain fundamentals and technical analysis?",
      timestamp: "12 hours ago",
      likes: 15,
      dislikes: 0,
      comments: 22,
      hashtags: ["newbie", "learning", "blockchain"],
      userLiked: false,
      userDisliked: false,
    },
  ]);

  const trendingHashtags = [
    { tag: "bitcoin", posts: 1243 },
    { tag: "ethereum", posts: 876 },
    { tag: "defi", posts: 645 },
    { tag: "nft", posts: 532 },
    { tag: "solana", posts: 423 },
    { tag: "metaverse", posts: 389 },
    { tag: "web3", posts: 356 },
    { tag: "altcoins", posts: 301 },
  ];

  const popularUsers = [
    {
      name: "Crypto Daily",
      handle: "@cryptodaily",
      avatar: "",
      followers: 124500,
    },
    {
      name: "Blockchain Backer",
      handle: "@BCBacker",
      avatar: "",
      followers: 98700,
    },
    {
      name: "Altcoin Gordon",
      handle: "@altcoingordon",
      avatar: "",
      followers: 76300,
    },
  ];

  const { toast } = useToast();
  
  const handlePostSubmit = (e) => {
    e.preventDefault();
    
    if (!newPostText.trim()) {
      toast({
        title: "Error",
        description: "Post cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    // Extract hashtags from content
    const hashtagRegex = /#([a-zA-Z0-9]+)/g;
    const matches = newPostText.match(hashtagRegex) || [];
    const hashtags = matches.map(tag => tag.slice(1));
    
    const newPost = {
      id: posts.length + 1,
      author: {
        name: "Ilona Smilquet",
        avatar: "public/lovable-uploads/8d28f839-6a85-4e94-9b81-5b308b07e52a.png",
      },
      content: newPostText,
      timestamp: "Just now",
      likes: 0,
      dislikes: 0,
      comments: 0,
      hashtags,
      userLiked: false,
      userDisliked: false,
    };
    
    setPosts([newPost, ...posts]);
    setNewPostText("");
    
    toast({
      title: "Success",
      description: "Your post has been published",
    });
  };
  
  const handleLike = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          // If already liked, unlike
          if (post.userLiked) {
            return { 
              ...post, 
              likes: post.likes - 1, 
              userLiked: false 
            };
          }
          
          // If disliked, remove dislike and add like
          if (post.userDisliked) {
            return { 
              ...post, 
              likes: post.likes + 1,
              dislikes: post.dislikes - 1, 
              userLiked: true,
              userDisliked: false
            };
          }
          
          // Just like
          return { 
            ...post,
            likes: post.likes + 1, 
            userLiked: true 
          };
        }
        return post;
      })
    );
  };
  
  const handleDislike = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          // If already disliked, remove dislike
          if (post.userDisliked) {
            return { 
              ...post, 
              dislikes: post.dislikes - 1, 
              userDisliked: false 
            };
          }
          
          // If liked, remove like and add dislike
          if (post.userLiked) {
            return { 
              ...post, 
              dislikes: post.dislikes + 1,
              likes: post.likes - 1, 
              userDisliked: true,
              userLiked: false
            };
          }
          
          // Just dislike
          return { 
            ...post,
            dislikes: post.dislikes + 1, 
            userDisliked: true 
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 lg:ml-16">
        <Navbar onDateRangeChange={() => {}} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Community</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Connect with other crypto enthusiasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 lg:col-span-2 space-y-6">
              <Card className="bg-card border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Create Post</CardTitle>
                  <CardDescription>Share your thoughts with the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePostSubmit}>
                    <div className="space-y-4">
                      <Textarea 
                        placeholder="What's on your mind? Use #hashtags to categorize your post..."
                        className="min-h-[100px] bg-background border-gray-700"
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button type="submit" className="flex items-center">
                          <Send className="h-4 w-4 mr-2" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <div>
                <Tabs defaultValue="trending" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                    <TabsTrigger value="trending" className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Trending</span>
                    </TabsTrigger>
                    <TabsTrigger value="latest" className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>Latest</span>
                    </TabsTrigger>
                    <TabsTrigger value="following" className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Following</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="trending" className="space-y-4 mt-4">
                    {posts
                      .sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes))
                      .map((post) => (
                        <PostCard 
                          key={post.id} 
                          post={post} 
                          onLike={() => handleLike(post.id)}
                          onDislike={() => handleDislike(post.id)}
                        />
                      ))}
                  </TabsContent>
                  
                  <TabsContent value="latest" className="space-y-4 mt-4">
                    {posts.map((post) => (
                      <PostCard 
                        key={post.id} 
                        post={post} 
                        onLike={() => handleLike(post.id)}
                        onDislike={() => handleDislike(post.id)}
                      />
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="following" className="space-y-4 mt-4">
                    <div className="flex flex-col items-center justify-center py-8">
                      <Users className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                      <p className="text-muted-foreground">Follow more users to see their posts here</p>
                      <Button variant="outline" className="mt-4 border-gray-700">
                        Discover Users
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="col-span-1 space-y-6">
              <Card className="bg-card border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Trending Hashtags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {trendingHashtags.map((hashtag) => (
                      <div key={hashtag.tag} className="flex justify-between items-center">
                        <Badge variant="secondary" className="px-3 py-1 hover:bg-gray-700 cursor-pointer">
                          #{hashtag.tag}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {hashtag.posts} posts
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Popular Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularUsers.map((user) => (
                      <div key={user.handle} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            {user.avatar ? (
                              <AvatarImage src={user.avatar} />
                            ) : (
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.handle}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-gray-700">
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Be respectful to other community members</li>
                    <li>• No spam or promotional content</li>
                    <li>• Share factual information and cite sources</li>
                    <li>• No financial advice without disclaimers</li>
                    <li>• Report harmful content to moderators</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Post card component for individual posts
const PostCard = ({ post, onLike, onDislike }) => {
  return (
    <Card className="bg-card border-gray-800">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar>
            {post.author.avatar ? (
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
            ) : (
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
        
        <p className="mb-4">{post.content}</p>
        
        {post.hashtags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.hashtags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs border-gray-700">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLike}
              className={post.userLiked ? "text-primary" : "text-muted-foreground"}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {post.likes}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDislike}
              className={post.userDisliked ? "text-primary" : "text-muted-foreground"}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              {post.dislikes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              {post.comments}
            </Button>
          </div>
          
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Community;
