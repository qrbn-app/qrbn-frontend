import Hero from "@/components/landing/Hero";
import DonationOptions from "@/components/landing/DonationOptions";
import Features from "@/components/landing/Features";
import Image from "next/image";

export default function Home() {
  const testimonials = [
    {
      quote: "The transparency of the platform gave me confidence in where my Zakat was going. The NFT proof is a game-changer!",
      author: "Ahmad S.",
      role: "Donor since 2023"
    },
    {
      quote: "As someone who values Islamic finance principles, I appreciate how QRBN.app ensures Shariah compliance at every step.",
      author: "Fatima K.",
      role: "Community Member"
    },
    {
      quote: "The Qurban process was seamless, and receiving the NFT certificate made the experience even more special.",
      author: "Yusuf M.",
      role: "Donor"
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-73px)]">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/geometric-pattern.svg')] bg-repeat opacity-5"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-trust/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col items-center text-center gap-12">
          {/* Hero Section */}
          <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
            <Image
              src="/images/logo.png"
              alt="QRBN.app Logo"
              width={200}
              height={80}
              priority
              className="w-48 md:w-64"
            />
            <Hero />
            <DonationOptions />
            <Features />
          </div>
          
          {/* Testimonials Section */}
          <section className="w-full py-20 bg-primary/50 mt-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What Our <span className="text-trust">Community</span> Says
                </h2>
                <p className="text-text-secondary">
                  Join thousands of satisfied users who trust QRBN.app for their Zakat and Qurban needs.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="bg-primary/30 backdrop-blur-sm p-6 rounded-xl border border-accent/10 hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="text-trust text-4xl mb-4">"</div>
                    <p className="text-foreground mb-6 italic">{testimonial.quote}</p>
                    <div className="mt-auto">
                      <div className="font-medium text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-text-secondary">{testimonial.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="w-full py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-trust/5 -z-10"></div>
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center bg-primary/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-accent/10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Make a <span className="text-trust">Difference</span>?
                </h2>
                <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                  Join our community of donors and experience transparent, Shariah-compliant giving today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a 
                    href="/zakat" 
                    className="px-8 py-4 bg-accent text-primary-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    Pay Zakat
                  </a>
                  <a 
                    href="/qurban" 
                    className="px-8 py-4 border border-accent/30 text-foreground font-semibold rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    Donate Qurban
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
