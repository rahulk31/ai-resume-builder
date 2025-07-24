import { Header } from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Zap,
  Download,
  Palette,
  Star,
  Users,
  Award,
  Clock,
  Edit3,
  Eye,
  Share2,
  CheckCircle,
  ArrowRight,
  Play,
} from "lucide-react";

export const Home = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      title: "Enter Your Details",
      description: "Add your personal information, work experience, and skills",
      icon: Edit3,
      gradient: "from-primary to-primary/80",
    },
    {
      number: "02",
      title: "AI Enhancement",
      description:
        "Our AI analyzes and enhances your content for maximum impact",
      icon: Zap,
      gradient: "from-accent to-accent/80",
    },
    {
      number: "03",
      title: "Choose Template",
      description:
        "Select from professional templates designed for your industry",
      icon: Palette,
      gradient: "from-primary to-primary",
    },
    {
      number: "04",
      title: "Download & Share",
      description: "Export in multiple formats and land your dream job",
      icon: Download,
      gradient: "from-accent to-accent",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Content",
      description:
        "Generate professional resume content with advanced AI algorithms that understand industry standards",
    },
    {
      icon: Palette,
      title: "ATS-Friendly Templates",
      description:
        "Choose from dozens of professionally designed templates that pass applicant tracking systems",
    },
    {
      icon: Download,
      title: "Multiple Export Formats",
      description:
        "Download in PDF, DOCX, and other formats optimized for different platforms",
    },
    {
      icon: Eye,
      title: "Real-time Preview",
      description:
        "See your resume come to life with instant previews as you edit and make changes",
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description:
        "Share your resume instantly with employers or save multiple versions for different roles",
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description:
        "Built-in checks ensure your resume meets professional standards and best practices",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      content:
        "ResumeAI helped me land my dream job at a top tech company. The AI suggestions were incredibly accurate and professional!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      content:
        "The templates are stunning and the AI enhancement feature is game-changing. Got 3x more interview calls!",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emily Davis",
      role: "Data Scientist",
      content:
        "Intuitive interface, powerful AI features. Created a perfect resume in just 15 minutes. Highly recommended!",
      rating: 5,
      avatar: "ED",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Hero Section with Dashboard Preview */}
        <section className="bg-gradient-hero py-12 md:py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
          <div className="container mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Zap className="w-4 h-4" />
                  AI-Powered Resume Builder
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
                  Create Your
                  <span className="bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent block">
                    Perfect Resume
                  </span>
                  in Minutes
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed max-w-xl">
                  Transform your career with AI-enhanced resumes that get
                  noticed. Professional templates, smart suggestions, and
                  instant results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={() => navigate("/dashboard")}
                    className="text-lg px-8 py-6 shadow-glow"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Try Free Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/auth")}
                    className="text-lg px-8 py-6 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-accent"
                  >
                    View Examples
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Right Dashboard Preview */}
              <div className="relative">
                <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-2xl shadow-elegant p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ResumeAI Dashboard
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">
                          John Doe - Software Engineer
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Last updated 2 hours ago
                        </div>
                      </div>
                      <div className="text-sm text-primary font-medium">
                        95% Complete
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted/30 rounded-lg text-center">
                        <div className="text-2xl font-bold text-foreground">
                          4.9
                        </div>
                        <div className="text-xs text-muted-foreground">
                          AI Score
                        </div>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg text-center">
                        <div className="text-2xl font-bold text-foreground">
                          ATS
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Ready
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full shadow-glow text-sm font-medium z-10 animate animate-bounce">
                  AI Enhanced
                </div>
                <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium z-10 animate animate-bounce">
                  Export Ready
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Step by Step */}
        <section className="py-20 px-4 bg-gradient-card relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="container mx-auto relative">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <CheckCircle className="w-4 h-4" />
                Simple 4-Step Process
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transform your career story into a professional resume in
                minutes. Our AI-powered platform guides you through every step.
              </p>
            </div>

            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
                {steps.map((step, index) => (
                  <div key={index} className="relative group">
                    {/* Connection Line - Desktop Only */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-20 left-full w-full h-px z-0">
                        <div className="w-full h-px bg-gradient-to-r from-primary via-accent to-transparent opacity-30" />
                        <div className="absolute right-0 top-0 w-2 h-2 bg-accent rounded-full transform translate-x-1 -translate-y-1" />
                      </div>
                    )}

                    {/* Step Card */}
                    <div className="relative z-10">
                      {/* Step Number Badge */}
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110`}
                          >
                            <step.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full shadow-glow flex items-center justify-center text-sm font-bold shadow-lg">
                            {step.number}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {step.description}
                        </p>
                      </div>

                      {/* Mobile Connection Arrow */}
                      {index < steps.length - 1 && (
                        <div className="lg:hidden flex justify-center mt-8 mb-4">
                          <ArrowRight className="w-6 h-6 text-accent" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center mt-16">
                <div className="inline-flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={() => navigate("/dashboard")}
                    className="text-lg px-8 py-6 btn-bg-gradient-to-r from-primary to-accent text-white hover:shadow-glow transition-all duration-300"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Your Resume
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    See Examples
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 bg-gradient-card">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Powerful Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need to create professional resumes that stand
                out and get results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 bg-background group"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">
                  50,000+
                </div>
                <div className="text-muted-foreground text-lg">
                  Resumes Created
                </div>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">
                  95%
                </div>
                <div className="text-muted-foreground text-lg">
                  Success Rate
                </div>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">
                  5 min
                </div>
                <div className="text-muted-foreground text-lg">
                  Average Time
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Success Stories
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Join thousands of professionals who've advanced their careers
                with ResumeAI
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 group"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic text-lg leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
          <div className="container mx-auto text-center relative">
            <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Ready to Get Hired?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join over 50,000 professionals who've transformed their careers
              with AI-powered resumes. Start building yours today - it's free!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="text-lg px-10 py-6 shadow-glow"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Building Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/auth")}
                className="text-lg px-10 py-6 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-accent"
              >
                View Templates
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <p className="text-primary-foreground/60">
              No credit card required • Free forever • Export instantly
            </p>
          </div>
        </section>
      </div>
    </>
  );
};
